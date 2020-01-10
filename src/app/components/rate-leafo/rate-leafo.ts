import { Component } from '@angular/core';

/**
 * Generated class for the InfoLeafoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
  selector: 'rate-leafo',
  templateUrl: 'rate-leafo.html',
  styleUrls: ["rate-leafo.scss"]
})
 export class RateLeafoComponent {

  original: number;
  day: Date;
  faceUrl="assets/imgs/leafo.png"; 

  callback;
  comp: HTMLElement;
  answers = [];


  constructor() {
    console.log('Hello InfoLeafoComponent Component');
  }

  public initRating(original:number, day:Date) {
    this.original = original;
    this.day = day;
    this.testMe();
  }

  getHeadline() : string {
  
    let y = this.day.getFullYear();
    let m = this.day.getMonth();
    let d = this.day.getDate();

    let y2 = new Date().getFullYear();
    let m2 = new Date().getMonth();
    let d2 = new Date().getDate();



    if(y==y2 && m==m2 && d==d2)
      return `Hodnocení dnešního dne! (${d}.${m+1}.${y})`; 
    else 
      return `Hodnocení dne ${d}.${m+1}.${y}`; 
  }

  public setLeafoFace(face:LeafoInfoType) {
    this.faceUrl = "assets/imgs/leafo_smile.png";
  }

  setReview(rev) {
    this.original = rev;
    this.callFunc();
    this.close();
  }

  public isUndefined():boolean{
    return <HTMLElement>document.getElementById('leafo-rate') == undefined;
  }

  testMe() {
    console.log(this.day + " - " + this.original);
  }

  callFunc() {
    if(this.callback != null)
      this.callback(this);
  }

  public open() {
    let info: HTMLElement = <HTMLElement>document.getElementById('leafo-rate');
    if(info == undefined)
      return;
    info.setAttribute("style", "display: block; opacity: 1;");
    //console.log(info);
    //console.log("opening LIP!");

    setTimeout(()=> {

      var hl = document.getElementById("day");

      if(hl)
        hl.innerHTML = this.getHeadline();
    },10);
  }

  public setCallback(call) {
    this.callback = call;
  }

  close() {
    let info: HTMLElement = <HTMLElement>document.getElementById('leafo-rate');
    if(info == undefined) 
      return;
    //console.log(info);
    
    //info.setAttribute("style", "display: block; opacity: 0;");
    setTimeout(()=> {
      info.setAttribute("style", "dislay:none");
    }, 250);
    
    //console.log("closing!");
  }
}

export enum LeafoInfoType {
  Sad,
  Happy,
  Normal,
  RedApple,
  GoldenApple,
  Warning,
  EndOfApp
}
