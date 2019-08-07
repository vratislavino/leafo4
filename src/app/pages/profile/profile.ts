import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { QuoteProvider } from '../../providers/quote/quote';
import { AccountProvider } from '../../providers/account/account';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AccountProvider]
})
export class ProfilePage {

  username: string;
  quotes: QuoteModel[];
  photo:string = "assets/imgs/avatar.png";
  loading;

  depkaActive = false;

  constructor(
    private quoteProvider: QuoteProvider,
    public ac: AccountProvider,
    public loadingCtrl: LoadingController,
    public userService: UserProvider) {

    
    this.ac.getProfileImage().then((data)=> {
      this.photo = <string>data;
    });
    this.getUsername();
    this.getQuotes();
    this.getPhoto();
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
      
      
      this.loading.dismiss();
    }, (err) => {
      console.log("Nejsou žádné výsledky!");
      this.loading.dismiss();
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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent'
    });
    await this.loading.present();
  }

  ionViewDidEnter() {
    this.presentLoading();
  }

  getUsername() {
    this.username = AccountProvider.user.username;
  }
}