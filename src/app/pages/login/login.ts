import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef } from '@angular/core';
import { ToastController, Events } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';

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

  email = "";
  password = "";

  constructor(
    public ac: AccountProvider,
    public tC: ToastController,
    public apiUser: UserProvider,
    public events: Events,
    private leafoProv: LeafoInfoProvider,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  login() {

    this.apiUser.auth(this.email, this.password).subscribe(
      data => {
        if (data["Error"]) {
          this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, "Email nebo heslo je špatně!", "Chyba!")
        } else {
          const user = User.createUser(this.email);
          this.ac.login(user, data, true);
          this.apiUser.downloadImage().subscribe((img) => {
            console.log("setting profile image");
            this.ac.setProfileImage(img["data"]);
          });
        }
      }
    );
  }

  testLeafo() {
    console.log("testing leafo");

    this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, "Služba zatím není k dispozici!", "Chyba", LeafoInfoType.Sad);
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