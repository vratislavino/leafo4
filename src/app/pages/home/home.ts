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
import { GuideProvider } from 'src/app/providers/guide/guide';
import { forkJoin } from 'rxjs';
import { DateService } from 'src/app/providers/date/date.service';

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

  ratedDaysNeededForAdvices = 5;
  ratedDaysInTotal = 0;

  private news=[
    {
      title: "Test headline",
      text: "Test message",
      page: "home",
      color: "red"
    }
  ];

  constructor(private platform: Platform, 
    private router: Router, 
    public ac: AccountProvider, 
    public userService: UserProvider, 
    public dp:DateService,
    private qp: QuoteProvider, 
    private rp:RatingProvider,
    private np:NotificationProvider,
    private lip: LeafoInfoProvider,
    private vc: ViewContainerRef,
    private gp: GuideProvider) {
  }

  ngOnInit(): void {

  }

  isAdviceEnabled() {
    return this.ratedDaysInTotal > this.ratedDaysNeededForAdvices;
  }

  ionViewDidEnter() {
    this.ac.ready().then(() => {

      if (!this.ac.isLoggedIn()) {
        this.router.navigate(["/login"]);
      } else {
        this.addressing = this.ac.getAddressing();
        if(false)
          this.checkTime().then(this.initData, ()=>this.closeApp(this)); 
        else
          this.initData();
      }
    });
  }


  testleafo() {
    this.lip.createAndShowRatingBubble(this.vc, -1,"", new Date());
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

  tryToShowGuide(gp) {
    let guide = gp.getAvailableGuideToSee("home");
    console.log(guide);
    if(guide)
      this.lip.createAndShowLeafoBubble(this.vc, guide.text, guide.headline, LeafoInfoType.Normal, ()=>{
        this.gp.addSeen(guide);
        //this.gp.showEm();
        setTimeout(()=>this.tryToShowGuide(gp), 250);
        
      });
  }

  initData() {
    this.news = [];
    this.gp.init();
    this.tryToShowGuide(this.gp);
    
    forkJoin([
      this.rp.getYearNotifications(),
      this.qp.getHistoryQuotes(1),
      this.rp.getDayData(new Date(),true),
      this.userService.getRatedDays(),
      this.qp.getLastAdviceDate()
    ]).subscribe(res => {
      console.log(res);
      /*
      console.log("Notification for next year: ");
      console.log(res[0]);
      console.log("Last Quote: ");
      console.log(res[1]);
      console.log("Today Data: ");
      console.log(res[2]);
      console.log("Rated Days Count");
      console.log(res[3]);
      console.log("LastAdviceDate");
      console.log(res[4]);
*/
      var rating = Object.values(res[2])[0]["rating"];
      var isNew = res[1][0]["isNew"] = 1;
      var s = "";
      this.ratedDaysInTotal = res[3]["count"];
      var lastDateOfAdvice = res[4]['date'];
      var dd:Date;
      var diff:number = 1000;

      if(lastDateOfAdvice != "none") {
        dd = this.dp.toDate(lastDateOfAdvice);
        diff = (new Date()).getTime() - dd.getTime();
        diff = diff / 1000/60/60/24;
        console.log(diff);
    }

      if(this.isAdviceEnabled && (diff < 3 || lastDateOfAdvice == "none"))
        this.news.push({title: "Můžeš si vzít radu!", text: "Na stránce s radami si nyní můžeš nechat poradit!", page: "advices", color: "yellow"});
      if(isNew)
        this.news.push({title: "Nový citát!", text: "Na stránce citátů máš nový citát!", page: "quotes", color: "green"});
      if(rating < 0) {
        this.news.push({title: "Hodnocení dne!", text: "Nemáš hodnocený den!", page: "tree", color: "red"});
      }

      /*
      
      if(s) 
      this.lip.createAndShowLeafoBubble(this.vc, s, "Novinky");
      */

      if(this.platform.is("cordova")) {
        this.np.replanUserNotifications(res[0]);
        this.np.replanRatingNotifications();
      } else {
        console.log("should plan on android!");
      }
    });
  }

  navigate(page) {
    this.router.navigate(["/"+page]);
  }

  tryToCallDepka() {
    console.log("depka");
  }
}