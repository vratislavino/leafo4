import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { Router } from '@angular/router';
import { User } from 'src/app/model/UserModel';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  styleUrls: ['register.scss'],
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

  souhlas = false;
  constructor(
    private router: Router,
    public ac: AccountProvider, 
    public tC: ToastController,
    public apiUser: UserProvider,
    private leafoProv: LeafoInfoProvider,
    private viewContainerRef: ViewContainerRef
    ) {
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  testLeafo() {
    console.log("testing leafo");
    
    this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, "Služba zatím není k dispozici!", "Chyba", LeafoInfoType.Sad);
  }

  register() {
    
    if(!this.souhlas) {
      this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, "Musíte souhlasit se zpracováním údajů!", "Pozor!");
      return;
    }

    this.apiUser.register(this.email, this.password, this.passwordA, this.username, this.firstname, this.surname, this.addressing, this.sign, this.sex).
    subscribe(
      (message) => {
        if(message["Error"]) {
          this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, message["Error"], "Chyba!");
        } else {
          this.apiUser.auth(this.email, this.password).subscribe((data) => {
            let user = User.createUser(this.email);
            this.ac.login(user, data, false);
            
            this.router.navigate(["settings", 1]);
          });
        }
        //this.showToast(JSON.stringify(message));
        
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
