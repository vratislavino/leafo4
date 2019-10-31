import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { Router } from '@angular/router';
import { UserProvider } from 'src/app/providers/user/user';
import { QuoteProvider } from 'src/app/providers/quote/quote';
import { RatingProvider } from 'src/app/providers/rating/rating';
import { NotificationProvider } from 'src/app/providers/notification/notification';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { timingSafeEqual } from 'crypto';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss'],
  providers: [AccountProvider]
})
export class HomePage implements OnInit {


  addressing = "";
  private subscription;

  private todayRated = false;
  private quoteObtained = false;
  private horoscopeObtained = false;

  constructor(private platform: Platform, 
    private router: Router, 
    public ac: AccountProvider, 
    public userService: UserProvider, 
    private qp: QuoteProvider, 
    private rp:RatingProvider,
    private np:NotificationProvider,
    private lip: LeafoInfoProvider,
    private vc: ViewContainerRef) {
  }

  ngOnInit(): void {

    this.ac.ready().then(() => {

      if (!this.ac.isLoggedIn()) {
        this.router.navigate(["/login"]);
      } else {
        this.addressing = this.ac.getAddressing();
        this.checkTime().then(this.initData, ()=>this.closeApp(this));
      }
    })

  }

  closeApp(hm) {
    console.log(hm);
    this.lip.createAndShowLeafoBubble(hm.vc, 
      "Testovací verze aplikace skončila! Zanechte, prosím, zpětnou vazbu. Ať vím, jak mám aplikaci zlepšit!", 
      "Konec!", 
      LeafoInfoType.EndOfApp, 
      () => {
        this.router.navigateByUrl('/review', {replaceUrl: true});
      },
      () => {
        navigator['app'].exitApp();
      });
  }

  checkTime() {
    return new Promise((resolve, reject)=> { 
      this.userService.getRegisterDate().subscribe(data => {

        console.log(data[0].date);
      
      var vals = data[0].date.split(" ");
        console.log(vals);
        
      var date = vals[0];
      var time = vals[1];
      var dates = date.split("-");
      var times = time.split(":");
  
      var dat = new Date(dates[0], dates[1], dates[2], times[0], times[1], times[2]);
  
      var diff = new Date().getTime() - dat.getTime();
      var days = diff / 1000 / 60 / 60 / 24;
      console.log(days);
        if(days > 28) {
          reject();
        } else {
          resolve();
        }
  
      }, err => {
        console.log(err);
        reject(err);
      })


    });
  }

  initData() {

    
    
    this.qp.getHistoryQuotes(1).subscribe(data => console.log(data));


    return;
    var strs = [];
    strs.push(this.initQuote());
    strs.push(this.initRating());
    strs.push(this.initMonday());
    console.log(strs);
    var str = ""
    for(var i = 0; i < strs.length; i++) {
      if(strs[i] != undefined) {
        	str += strs[i] + "<br>";
      }
    }
    /* 
    "SELECT q.id_q AS id_q, q.quote AS quote, q.author AS author, q.date AS qdate, uq.faved AS faved FROM users_quotes AS uq JOIN users AS u ON uq.id_u=u.id_u JOIN quotes AS q ON uq.id_q=q.id_q WHERE uq.id_u=1 AND q.date  > 1569181760 ORDER BY date DESC LIMIT 1; Time: 1571773760"
    */
    this.lip.createAndShowLeafoBubble(this.vc, str,"Novinky!", LeafoInfoType.Happy);

    /*this.setNotifsForRating();
    this.setNotifsForQuote();
    this.*/
  }

  initQuote() {
    this.getLastQuote().then(quote => {
      console.log(quote);
      if(quote["isNew"] == 1) { 
        return "Na stránce citátů máš nový citát!";
      } else {
        return "";
      }
    }).catch(err => {
      console.error(err);
    });
    
  }

  getLastQuote() {
    return new Promise((resolve, reject)=> {
      this.qp.getHistoryQuotes(1).subscribe(res => {
        console.log(res);
          if(res["length"] > 0)
            resolve(res[0]);
          else 
            reject("Nemá ještě žádný citát!");
      }, err => {
        reject(err);
      });
    });
  }  

  initRating() {
    this.rp.getDayData(new Date(),true).subscribe(data => {
      console.log(data);
    });
  }

  initMonday() {

  }

  setNotifsForRating() {
    if(this.todayRated) {
      this.np.planDayRating();
    }
  }
}