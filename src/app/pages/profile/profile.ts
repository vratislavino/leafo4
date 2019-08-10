import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { QuoteProvider } from '../../providers/quote/quote';
import { AccountProvider } from '../../providers/account/account';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  styleUrls: ['profile.scss'],
  providers: [AccountProvider]
})
export class ProfilePage {

  username: string;
  quotes: QuoteModel[];
  photo:string = "assets/imgs/avatar.png";
  loading;
  level = 0;

  diffDates = 1000;
  depkaActive = false;

  constructor(
    private quoteProvider: QuoteProvider,
    public ac: AccountProvider,
    public loadingCtrl: LoadingController,
    public userService: UserProvider) {

      //this.presentLoading().then();

    this.getUsername();
    this.getQuotes();
    this.getPhoto();
    this.initDepka();
  }

  initDepka() {
    this.userService.getLastDepression().subscribe((data)=> {
      const date = data["date"];
      if(date != undefined) {
        let dat = new Date(date);
        let today = new Date();

        let timeDiff = today.getTime() - dat.getTime();
        this.diffDates = Math.ceil(timeDiff/(1000*3600*24));
        console.log(this.diffDates);
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
    this.quoteProvider.getHistoryQuotes(3).subscribe((data) => {
      this.quotes = [];
      var keys = Object.keys(data);

      keys.forEach((key) => {
        var quoteObj = data[key];
        var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["faved"]).complete(AccountProvider.user.addressing);
        this.quotes.push(qm);
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
    this.username = AccountProvider.user.username;
    this.level = AccountProvider.user.level;
  }
}