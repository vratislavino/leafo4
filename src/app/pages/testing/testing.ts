import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { RatingProvider } from './../../providers/rating/rating';
import { Component, ViewContainerRef } from '@angular/core';
import { LeafoInfoType } from '../../components/info-leafo/info-leafo';

/**
 * Generated class for the TestingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html',
})
export class TestingPage {

  pattern = 'This is some *** for trying *** it works';
  comp: HTMLElement;
  constructor(private rp : RatingProvider,
    private leafoInfo:LeafoInfoProvider,
    private vc: ViewContainerRef) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingPage');
    this.comp = document.getElementById("complete");


    let t = this.pattern.split("***");
    for(var i = 0; i < t.length-1; i++) {
      this.createPart(t[i]);
      this.createInput();
    }
    this.createPart(t[t.length-1]);
     
  }

  createPart(text) {
    this.comp.insertAdjacentHTML('beforeend', '<span class="odst">'+text+'</span>')
  }

  createInput() {
    this.comp.insertAdjacentHTML('beforeend', '<input type="text" class="part">');
  }
    
}
