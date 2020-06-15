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
import { Network } from '@ionic-native/network/ngx';
import { HomePageModule } from './home.module';

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

  errors = "";

  registrationDate : Date;
  daysNeededForDepka = 30;
  daysRegistrationDiff = 0;

  ratedDaysNeededForAdvices = 5;
  ratedDaysInTotal = 0;

  testingDays = 30;

  private inited: boolean;

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
    private gp: GuideProvider,
    private network: Network) {
  }

  ngOnInit(): void {
    this.ionViewDidEnter();
  }

  isDepkaEnabled() {
    return this.daysRegistrationDiff > this.daysNeededForDepka;
  }

  isAdviceEnabled() {
    return this.ratedDaysInTotal > this.ratedDaysNeededForAdvices;
  }

  ionViewDidEnter() {

    this.ac.ready().then(() => {

        /*
        console.log(this.network.type);
        if(this.network.type == "none") {
          this.errors += "not connected!";
        }
        let qwe = this;
        console.log(this.network);
        let connectSubscription = this.network.onConnect().subscribe(() => {
          console.log('network connected!');
          // We just got a connection but we need to wait briefly
           // before we determine the connection type. Might need to wait.
          // prior to doing any api requests as well.
          setTimeout(() => {
              qwe.errors += this.network.type;
          }, 3000);
        });
        */
      if (!this.ac.isLoggedIn()) {
        this.router.navigate(["/login"]);
      } else {
        this.addressing = this.ac.getAddressing();
        var home = this;
        //if(false)
          this.checkTime().then(() => this.initData(home), ()=>this.closeApp(this)); 
        //else
        //  this.initData();
      }
    });
  }

  advicesClicked() {
    if(this.isAdviceEnabled()) {
      this.router.navigate(["/advices"]);
    } else {
      this.lip.createAndShowLeafoBubble(this.vc, "Pro odemknutí této funkce musíš mít ohodnocených " + this.ratedDaysNeededForAdvices + " dnů! Ještě ti zbývá ohodnotit " +(this.ratedDaysNeededForAdvices - this.ratedDaysInTotal) + " dní", "Pozor!");
    }
  }

  depressionClicked() {
    if(this.isDepkaEnabled()) {
      this.router.navigate(["/depression"]);
    } else {
      if(this.daysRegistrationDiff < this.daysNeededForDepka) {
        this.lip.createAndShowLeafoBubble(this.vc, "Funkce depka se ti otevře po 30 dnech používání aplikace!");
      } else {
        // if deprese byla využita v posledních 30 dnech....
      }
    }
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
  
      var dat = new Date(dates[0], dates[1]-1, dates[2], times[0], times[1], times[2]);
  
      console.log(dat);
      console.log(new Date());

      var diff = new Date().getTime() - dat.getTime();

      var days = diff / 1000 / 60 / 60 / 24;
      console.log("DNŮ TESTOVÁNÍ: ");
      console.log(days);
        if(days > this.testingDays) {
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

  initData(home) {
    console.log(this);
    home.news = [];
    //home.gp.deleteAllViewed();
    home.gp.init();
    home.tryToShowGuide(this.gp);
    
    forkJoin([
      home.rp.getYearNotifications(),
      home.qp.getHistoryQuotes(1),
      home.rp.getDayData(new Date(),true),
      home.userService.getIgnoringRatedDays(),
      home.qp.getLastAdviceDate(),
      home.userService.getRegisterDate()
    ]).subscribe(res => {
      console.log(res);
      /*
      console.log("Notification for next year: ");
      console.log(res[0]);
      console.log("Last Quote: ");
      console.log(res[1]);
      console.log("Today Data: ");
      console.log(res[2]);*/  
      console.log("Rated Days Count");
      console.log(res[3]);
      console.log("LastAdviceDate");
      console.log(res[4]);

      var rating = Object.values(res[2])[0]["rating"];
      var isNew = res[1][0]["seen"] == 0;
      var s = "";
      home.ratedDaysInTotal = res[3]["count"];
      var lastDateOfAdvice = res[4]['date'];
      var dd:Date;
      var diff:number = 1000;

      var registerDate = res[5][0]['date'];
      home.registrationDate = home.dp.toDate(registerDate);
      home.daysRegistrationDiff = home.dp.getDaysDiff(home.registrationDate, new Date());
      if(lastDateOfAdvice != "none") {
        diff = home.dp.getDaysDiff(home.dp.toDate(lastDateOfAdvice), new Date());
      }

      console.log("ROZDÍL VE DNECH");
      console.log(diff);
      console.log("IS ENABLED");
      console.log(home.isAdviceEnabled());
      home.news = [];
  
      if(home.isAdviceEnabled() && (diff > 3 || lastDateOfAdvice == "none")) {
        home.news.push({title: "Můžeš si vzít radu!", text: "Na stránce s radami si nyní můžeš nechat poradit!", page: "advices", color: "yellow"});
      }
        if(isNew)
        home.news.push({title: "Nový citát!", text: "Na stránce citátů máš nový citát!", page: "quotes", color: "green"});
      if(rating < 0) {
        home.news.push({title: "Hodnocení dne!", text: "Nemáš hodnocený den!", page: "tree//1", color: "red"});
      }

      /*
      
      if(s) 
      this.lip.createAndShowLeafoBubble(this.vc, s, "Novinky");
      */

      if(home.platform.is("cordova")) {
        home.np.replanUserNotifications(res[0]);
        home.np.replanRatingNotifications();
      } else {
        console.log("should plan on android!");
      }
    });
  }

  navigate(page) {
    if(page.indexOf("//") > -1) {
      let pole = page.split("//");
      this.router.navigate(["/"+pole[0], pole[1]]);
    } else {
      this.router.navigate(["/"+page]);
    }
  }

  tryToCallDepka() {
    console.log("depka");
  }
}