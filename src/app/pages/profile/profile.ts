import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { QuoteProvider } from '../../providers/quote/quote';
import { AccountProvider } from '../../providers/account/account';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { GuideProvider } from 'src/app/providers/guide/guide';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  styleUrls: ['profile.scss'],
  providers: [AccountProvider]
})
export class ProfilePage {

  username: string;
  quotes: QuoteModel[];
  horoscope= {};
  photo:string = "assets/imgs/avatar.png";
  loading;
  level = 0;

  diffDates = 1000;
  depkaActive = false;

  constructor(
    private platform: Platform,
    private quoteProvider: QuoteProvider,
    public ac: AccountProvider,
    public loadingCtrl: LoadingController,
    public userService: UserProvider,
    private lip: LeafoInfoProvider,
    private vc: ViewContainerRef,
    private gp: GuideProvider) {

      //this.presentLoading().then();

      this.platform.ready().then(() => {
        this.tryToShowGuide(this.gp);
        this.getUsername();
        this.getQuotes();
        this.getPhoto();
        this.initDepka();
      });
  }

  tryToShowGuide(gp) {
    let guide = gp.getAvailableGuideToSee("profile");
    console.log(guide);
    if(guide)
      this.lip.createAndShowLeafoBubble(this.vc, guide.text, guide.headline, LeafoInfoType.Normal, ()=>{
        this.gp.addSeen(guide);
        //this.gp.showEm();
        setTimeout(()=>this.tryToShowGuide(gp), 250);
        
      });
  }

  initDepka() {
    this.userService.getLastDepression().subscribe((data)=> {
      
      const date = data["date"];
      if(date != undefined) {
        let dat = new Date(date);
        let today = new Date();

        let timeDiff = today.getTime() - dat.getTime();
        this.diffDates = Math.ceil(timeDiff/(1000*3600*24));
        console.log("Rozdíl dnů: " + this.diffDates);
      } else {
        console.error("date is undefined!");
      }
    }, (err)=> {
      console.error(err);
    });
  }

  getDepkaText() {
    if(this.diffDates > 30) {
      return 'DEPKA';
    } else {
      return `DEPKA za ${30-this.diffDates} dní`;
    }
  }

  depkaClick() {
    console.log("clicked");
  }

  getQuotes() {
    this.quoteProvider.getProfileQuotes(2).subscribe((data) => {
      this.quotes = [];
      var keys = Object.keys(data);

      keys.forEach((key) => {
        var quoteObj = data[key];
        if(quoteObj["id_q"] == undefined) {
          this.horoscope = quoteObj;
        } else {
          var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["author"], quoteObj["faved"]).complete(this.ac.getAddressing());
          this.quotes.push(qm);
        }
      });
      
      
      this.dismissLoading();
    }, (err) => {
      console.log("Nejsou žádné výsledky!");
      this.dismissLoading();
    });
  }

  getPhoto() {

    this.ac.getProfileImage().then((data)=> {
      this.photo = <string>data;
    }).catch((defPath)=> {

      this.userService.downloadImage().subscribe(data => {
          this.ac.setProfileImage(data);
          this.photo = <string>data;

      }, error => {
        this.photo = defPath;
        console.log("Nastala chyba při vybírání profilové fotky. Error: ");
        console.log(error);
      });

    });
    
  }

  dismissLoading() {
    if(this.loading != undefined)
      this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent'
    });
    await this.loading.present();
  }

  ionViewDidEnter() {
    //this.presentLoading();
  }

  getUsername() {
    var data = this.ac.getAuthData();
    this.username = data.username;
    this.level = parseInt(data.level + 1);
  }
}