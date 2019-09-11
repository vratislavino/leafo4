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
  styleUrls: ['login.scss'],
  templateUrl: 'login.html'
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
  
  login() {

    this.apiUser.auth(this.email, this.password).subscribe(
      data => {
        const user = User.createUser(this.email);
        this.ac.login(user, data,true);
        this.apiUser.downloadImage().subscribe((img)=>{
          console.log("setting profile image");
          this.ac.setProfileImage(img["data"]);
        });
      }
    ); 
  }
  
  testLeafo() {
    console.log("testing leafo");
    
    this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, "Test info bubble", "Test");
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