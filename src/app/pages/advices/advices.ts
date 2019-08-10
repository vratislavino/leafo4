import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { Router } from '@angular/router';

/**
 * Generated class for the AdvicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-advices',
  styleUrls: ['advices.scss'],
  templateUrl: 'advices.html',
  providers: [AccountProvider]
})
export class AdvicesPage {

  constructor(public ac:AccountProvider, private router:Router) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvicesPage');
  }

  adviceMother() {
    /*
    let popover = this.popoverCtrl.create('QuotePopupPage');
    popover.present({animate: true});
    popover.onDidDismiss((data) => { console.log("Shoud save somewhere: " + data.quote); });*/
  }

  adviceFriend() {/*
    let popover = this.popoverCtrl.create('QuotePopupPage', {author: 'friend'});
    popover.present({animate: true});
    popover.onDidDismiss((data) => { console.log("Shoud save somewhere: " + data.quote); });*/
  }
}
