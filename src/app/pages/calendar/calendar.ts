import { Component } from '@angular/core';
import { AlertController,/*, FabContainer */
Platform} from '@ionic/angular';
import { CalendarDate } from '../../model/CalendarDate.interface';
import * as moment from 'moment';
import { AccountProvider } from '../../providers/account/account';
import { RatingProvider } from '../../providers/rating/rating';
import { D } from '../../../D';
import { Router } from '@angular/router';
import 'hammerjs';
import {trigger, keyframes, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.scss'],
  providers: [AccountProvider],
  animations: [
    trigger('animator', [
      transition('* => pulse', animate(300, keyframes([
        style({transform: 'scale3d(1, 1, 1)', offset: 0}),
        style({transform: 'scale3d(1.2, 1.2, 1.2)', offset: .3}),
        style({transform: 'scale3d(1, 1, 1)', offset: 1}),
      ])))
    ])]
})
export class CalendarPage {

  currentDay : CalendarDate;
  currrentDayDownloaded = false;
  visibleRatings = false;
  reviewText = "Press!";
  isWoman = true;
  htmlMove;
  
  animationState:string;

  /*@ViewChild("enterPopUp") enterPopUp: FabContainer;*/
  
  constructor(public router: Router, private platform:Platform, private alertCtrl: AlertController, public ac: AccountProvider, private rp: RatingProvider) {
    this.platform.ready().then(() => {
      this.ionViewDidEnter();
      this.ionViewDidLoad();
    });
    
  }

  startAnimation(state) {
    console.log(state);
    if(!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState() {
    this.animationState = '';
  }

  
  ionViewDidEnter() {
    var mensStart: Date = new Date(2019, 7, 18);
    var mensDate: Date = new Date();
    const period: number = 27;
    const activeDays: number = 4;
    mensDate.setDate(mensDate.getDate() + period);
    console.log("===========");
    console.log("Mens Start");
    console.log(mensStart);
    //console.log(mensStart.getTime());
    console.log("Date");
    console.log(mensDate);
    //console.log(mensDate.getTime());
    while(mensStart < mensDate) {
      mensStart.setDate(mensStart.getDate() + period);
    }
    console.log("Next menses");
    console.log(mensStart);
    //console.log(mensStart.getTime());
    console.log("===========");
    this.currrentDayDownloaded = false;
    if(this.currentDay != undefined)
      this.refreshCurrentDateData(this.currentDay.mDate);
    else
      this.refreshCurrentDateData();
    console.log("IM BACK HERE!");

  }

  ionViewDidLoad() {
    this.refreshCurrentDateData();
    
    console.log("added events");
  }

  onTouchStart(event) {
    this.chooseReview(101);
    console.log(event);
  }

  onTouchMove(event) {
    if(this.visibleRatings) {
      let nula: HTMLElement = <HTMLElement>document.getElementById('review-changer');
      nula.setAttribute("style", "display: none;");
      var current = this.getElementByTouch(event.changedTouches[0]);
      if(this.htmlMove != undefined && this.htmlMove != null && this.htmlMove != current) {
        this.htmlMove.classList.remove("active");
      }
      this.htmlMove = current;
      this.htmlMove.classList.add("active");
      //console.log(html);
      //this.startAnimation('pulse');
    }
  }

  getElementByPoint(x, y) : HTMLElement {
    return <HTMLElement>document.elementFromPoint(x, y);
  }

  getElementByTouch(touch) : HTMLElement {

      var x = touch.clientX;
      var y = touch.clientY;
      return this.getElementByPoint(x,y);
  }

  onTouchEnd(event) {
      var doc = this.getElementByTouch(event.changedTouches[0]);
      var html = doc.innerHTML;
      let nula: HTMLElement = <HTMLElement>document.getElementById('review-changer');
      nula.setAttribute("style", "display: flex;");
      if(this.htmlMove != undefined && this.htmlMove != null) {
        this.htmlMove.classList.remove("active");
      }
      
      if(html.indexOf("%") > -1) 
      {
        html = html.replace("%", "");
        this.chooseReview(parseInt(html));
      } else {
        console.log("NENÍ PROCENTO!");
      }

  }

  myListener(elm) {
    console.log(elm);
  }

  refreshCurrentDateData(mDate = moment()) {
    const keyDate = mDate.format("YYYY-MM-DD");
    this.rp.getDayData(keyDate, false).subscribe(data => {
      this.currentDay = new CalendarDate(mDate, keyDate, data[keyDate], true, true);
      this.currrentDayDownloaded = true;

      if(this.currentDay.details != null && this.currentDay.details != undefined)
        this.reviewText = this.currentDay.details["rating"] + "%";
    });
  }

  /*public setDayData(date) {
    this.rp.getDayData(AccountProvider.getId(), date, false).then(data => {
      this.currentDay = new CalendarDate(date, date, data[keyDate], true, true);
      this.currrentDayDownloaded = true;
    });
  }*/

  onDateSelected(date: CalendarDate) {
    if(moment().format("M") == date.mDate.format("M")) {
      this.currentDay = date;;
      if(this.currentDay.details != null && this.currentDay.details != undefined)
        if(this.currentDay.details["rating"] > -1)
          this.reviewText = this.currentDay.details["rating"] + "%";
        else
          this.reviewText = "Tap!"
      console.log("Yess");
    } else {
      console.log("Not rly");
    }
    console.log(date.mDate);
  } 

  getRatingClass() {
    return "r" + this.currentDay.details["rating"];
  }

  prevDef(ev) {
    ev.preventDefault();
  }

  openReviewButtons() {
    this.visibleRatings = true;
    this.reviewText = "0%";
  }

  closeReviewButtons() {
    this.visibleRatings = false;
  }

  chooseReview(review) {
    console.log(review + " _ " + this.visibleRatings);
    if(review==101 && !this.visibleRatings) {
      this.openReviewButtons();
    } else {
      if(review == 101)
        review = 0;
      if(new Date(this.currentDay.keyDate + " 0:0").getTime() <= new Date().getTime()) { 
        this.reviewText = "Tap!";
        this.rp.setDayReview(this.currentDay.keyDate, review).subscribe((data)=> { 
          console.log(data);
          if(this.currentDay)
            this.currentDay.details["rating"] = review;
            this.reviewText = review + "%";
        }, (err)=> {
          console.log("Error");
          console.log(err);
          this.visibleRatings = false;
        });
      }
      this.closeReviewButtons();
    }
  }


/*
  chooseReview(review, fab) {

    if(this.currentDay.details == null || this.currentDay.details == undefined)
      return;
      
    if(new Date(this.currentDay.keyDate + " 0:0").getTime() <= new Date().getTime()) { // pokud je starší než dnešek
      //let notes: HTMLElement = <HTMLElement>document.getElementsByClassName('notes')[0];
      if(this.visibleRatings) {
        this.visibleRatings = false;
        this.reviewText = "Tap!";
        notes.setAttribute("style", "visibility: visible;");
        this.rp.setDayReview(this.currentDay.keyDate, review).subscribe((data)=> {
          console.log(data);
          if(review == 101) {
            this.openReviewButtons();
            review = 0;
          }
          if(this.currentDay)
          this.currentDay.details["rating"] = review;
          this.reviewText = review + "%";
          this.visibleRatings = false;
          console.log("WTF");
        }, (err)=> {
          console.log("Error");
          console.log(err);
          this.visibleRatings = false;
        });
      } else {
        notes.setAttribute("style", "visibility: hidden;");
        this.reviewText = "0%";
        this.visibleRatings = true;
        console.log("Umm");
      }
    } else {
      console.log("Jeste brzo bracho..");
    }
  }*/

  openGraph() {
    this.router.navigate(["/graph"]);
  }

  openAddNote() {
    
    this.router.navigate(["/add-note", { date: this.currentDay.keyDate }]);
    //this.enterPopUp.close();
  }

  openPeriodSettings() {
    this.router.navigate(["/calendar/period"]);
  }

  openAddNotification() {
    this.router.navigate(["/add-notification", { date: this.currentDay.keyDate }]);
    //this.enterPopUp.close();
  }
}