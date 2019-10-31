import { Component } from '@angular/core';

/**
 * Generated class for the InfoLeafoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
  selector: 'info-leafo',
  templateUrl: 'info-leafo.html',
  styleUrls: ["info-leafo.scss"]
})
 export class InfoLeafoComponent {

  text: string;
  headline: string="";
  faceUrl="assets/imgs/leafo.png"; 

  leafoInfoType:LeafoInfoType = LeafoInfoType.Normal;
  callback1;
  callback2;
  comp: HTMLElement;
  answers = [];



  faces= [
  "assets/imgs/leafo.png",
  "assets/imgs/leafo.png",
  "assets/imgs/leafo.png",
  "assets/imgs/aNormal.png",
  "assets/imgs/aGolden.png",
  "assets/imgs/leafo.png",
  "assets/imgs/leafo.png",
  ];

  constructor() {
    console.log('Hello InfoLeafoComponent Component');
  }

  public setInfo(info:string, headline?:string) {
    this.text = info;
    if(headline != null)
      this.headline = headline;
  }

  public setLeafoFace(face:LeafoInfoType) {
    this.leafoInfoType = face;
    this.faceUrl = this.faces[<number>face];

    console.log(this.leafoInfoType);

    if(this.leafoInfoType == LeafoInfoType.GoldenApple) {
      this.initText();      
    }
  }

  initText() {

    this.initCompAgain();
    while (this.comp.firstChild) {
      this.comp.removeChild(this.comp.firstChild);
    }

      let t = this.text.split("***");
      for(var i = 0; i < t.length-1; i++) {
        this.tryToCreateABreak(i, t);
        this.createPart(t[i]);
        this.createInput();
      }

      this.tryToCreateABreak(t.length-1, t);
      this.createPart(t[t.length-1]);
  }

  private tryToCreateABreak(index, arr) {
    if(arr[index].startsWith("/n")) {
      arr[index] = arr[index].substr(2);
      this.createBreak();
    }
  }

  public isUndefined():boolean{
    return <HTMLElement>document.getElementById('leafo-info') == undefined;
  }

  callFunc(func) {
    if(func != null)
      func();

    this.close();
  }

  public open() {
    let info: HTMLElement = <HTMLElement>document.getElementById('leafo-info');
    if(info == undefined)
      return;
    info.setAttribute("style", "display: block; opacity: 1;");
    console.log(info);
    console.log("opening!");
  }

  public setCallbacks(call1, call2) {
    this.callback1 = call1;
    this.callback2 = call2;
  }

  close() {
    let info: HTMLElement = <HTMLElement>document.getElementById('leafo-info');
    if(info == undefined) 
      return;
    console.log(info);
    info.setAttribute("style", "dislay:none");
    console.log("closing!");
  }

  public getAnswers() {
    if(this.leafoInfoType == LeafoInfoType.RedApple)
      return null;

    let inputs = document.getElementsByClassName('part');
    console.log(inputs);
    let ans = [];
    for(var i = 0; i < inputs.length; i++) {
      ans.push((<HTMLInputElement>inputs[i]).value);
    }

    console.log(ans);
    return ans;
  }

  initCompAgain() {
    if(this.comp == null) {
      console.log("comp was null!");
      this.comp = document.getElementById("complete");
    }
  }

  createPart(text) {
    this.initCompAgain();
    this.comp.insertAdjacentHTML('beforeend', '<span class="odst">'+text+'</span>');
    console.log("Adding " + text);
  }

  createInput() {
    this.initCompAgain();
    this.comp.insertAdjacentHTML('beforeend', '<input type="text" class="part">');
    console.log("Adding input!");
  }

  createBreak() {
    this.initCompAgain();
    this.comp.insertAdjacentHTML('beforeend', '<br>');
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
