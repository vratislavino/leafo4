import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AccountProvider]
})
export class RegisterPage {

	email;
	password;
	passwordA;
	username;
	firstname;
	surname;
  addressing;
	sign;
  sex;

  constructor(public ac: AccountProvider, public userService:UserProvider, public tC: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    
    this.userService.register(this.email, this.password, this.passwordA, this.username, this.firstname, this.surname, this.addressing, this.sign, this.sex).
    subscribe(
      (message: string) => {
        this.showToast(message);
        location.reload();
      },
       (err:string)=> {
         this.showToast(err);
       })
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
