import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { Router } from '@angular/router';
import { QuoteProvider } from 'src/app/providers/quote/quote';

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
export class AdvicesPage implements OnInit {

  currentAdvice: string = "";
  currentAdvisor: string = "";

  constructor(public ac:AccountProvider, private router:Router, private qp: QuoteProvider) {
  }

  ngOnInit(): void {
    this.qp.getAdvice().subscribe((data) => {
      if(data == "") {
        this.currentAdvice = "";
        this.currentAdvisor = "";
      } else {
        this.currentAdvice = data["text"];
        this.currentAdvisor = data["advisor"];
      }
    });
  }
  
  getNewAdvice(advisor) {
    this.qp.getNewAdvice(advisor).subscribe((data) => {
      if(data === true) {
        this.ngOnInit();
      }
    });
  }

  getAdvisor() {
    return this.currentAdvisor == "1" ? "Mamka" : "Přítel"; 
  }

  getAdvisorImage() {
    return this.currentAdvisor == "1" ? "./assets/imgs/avatar2.png" : "./assets/imgs/avatar3.png"; 
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
