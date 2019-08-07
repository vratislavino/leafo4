import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef } from '@angular/core';
import { ToastController, Events } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AccountProvider]
})
export class LoginPage {
  
  email = "plechaty@occamy.cz";
  password = "qweasdyxcsdaf";
  
  constructor(
    public ac: AccountProvider, 
    public tC: ToastController,
    public apiUser: UserProvider,
    public events:Events,
    private leafoProv: LeafoInfoProvider,
    private viewContainerRef: ViewContainerRef
    ) {
  }

  ionViewDidLoad() {
    
  }

  ionViewDidLeave() {
    console.log("LEAVING LOGIN");
  }

  login() {

    this.apiUser.auth(this.email, this.password).subscribe(
      data => {
        AccountProvider.user = User.createUser(this.email);
        this.ac.login(data);
        this.apiUser.downloadImage().subscribe((img)=>{
          console.log("setting profile image");
          this.ac.setProfileImage(img["data"]);
        });
      }
    ); 


    /*
    this.ac.Login(this.email, this.password).then((message) => {
      this.showToast("Mess: " + message);
      this.navCtrl.pop();
      location.reload();
    }, (err) => {
      console.log("error");
      this.showToast("Err: " + err);
    });*/
  }
  
  testLeafo() {
    console.log("testing leafo");
    
    this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, "Test info bubble", "Test");
    //element.appendChild()
  }

  async showToast(message) {
    var alert = await this.tC.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    alert.present();
  }
}