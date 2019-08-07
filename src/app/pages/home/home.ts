import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';

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
export class HomePage {

  user:User = null;
  private subscription;

  constructor(public modalCtrl: ModalController, 
    public ac: AccountProvider) {

    this.user = AccountProvider.user;
  }

  ionViewDidEnter() {
    this.user = AccountProvider.user;
  }

  getAddressing() {
    if(this.user == null)
      return "kamaráde";
    return this.user.addressing;
  }

  logout() {
    this.ac.logout();
  }
}