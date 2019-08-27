import { Component, ViewChild, ɵisListLikeIterable } from '@angular/core';
import { AlertController/*, FabContainer */} from '@ionic/angular';
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
  visibleRatings = true;
  reviewText = "Press!";
  
  animationState:string;

  /*@ViewChild("enterPopUp") enterPopUp: FabContainer;*/
  
  constructor(public router: Router, private alertCtrl: AlertController, public ac: AccountProvider, private rp: RatingProvider) {
    this.ionViewDidEnter();
    this.ionViewDidLoad();
    
  }

  startAnimation(state) {
    console.log(state);
    //if(!this.animationState) {
      this.animationState = state;
    //}
  }

  resetAnimationState() {
    this.animationState = '';
  }

  
  ionViewDidEnter() {
    this.currrentDayDownloaded = false;
    if(this.currentDay != undefined)
      this.refreshCurrentDateData(this.currentDay.mDate);
    else
      this.refreshCurrentDateData();
    console.log("IM BACK HERE!");

  }

  ionViewDidLoad() {
    this.refreshCurrentDateData();
    var btns = document.getElementsByClassName("review-button");
    console.log(btns);
    for(var i = 0; i <btns.length; i++) {
      btns[i].addEventListener('mouseup', this.myListener);
    }

    console.log("added events");
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

  openAddNotification() {
    this.router.navigate(["/add-notification", { date: this.currentDay.keyDate }]);
    //this.enterPopUp.close();
  }
}