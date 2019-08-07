import { Component, ViewChild } from '@angular/core';
import { AlertController/*, FabContainer */} from '@ionic/angular';
import { CalendarDate } from '../../model/CalendarDate.interface';
import * as moment from 'moment';
import { AccountProvider } from '../../providers/account/account';
import { RatingProvider } from '../../providers/rating/rating';
import { D } from '../../../D';
import { Router } from '@angular/router';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [AccountProvider]
})
export class CalendarPage {

  currentDay : CalendarDate;
  currrentDayDownloaded = false;
  visibleRatings = false;
  reviewText = "Tap!";
  /*@ViewChild("enterPopUp") enterPopUp: FabContainer;*/

  constructor(public router: Router, private alertCtrl: AlertController, public ac: AccountProvider, private rp: RatingProvider) {
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
    console.log('ionViewDidLoad CalendarPage');
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

  chooseReview(review, fab) {
    console.log(new Date(this.currentDay.keyDate + " 0:0").getTime());
    console.log(new Date().getTime());
    if(this.currentDay.details == null || this.currentDay.details == undefined)
      return;
      
    if(new Date(this.currentDay.keyDate + " 0:0").getTime() <= new Date().getTime()) {
      let notes: HTMLElement = <HTMLElement>document.getElementsByClassName('notes')[0];
      if(this.visibleRatings) {
        this.visibleRatings = false;
        this.reviewText = "Tap!";
        fab.close();
        notes.setAttribute("style", "visibility: visible;");
        this.rp.setDayReview(this.currentDay.keyDate, review).subscribe((data)=> {
          console.log(data);
          if(review == 101) {
            review = 0;
            fab.close();
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
      fab.close();
    }
  }

  openGraph() {
    this.router.navigate(["/graph"]);
  }

  openAddNote() {
    
    this.router.navigate(["/add-note", { date: this.currentDay }]);
    //this.enterPopUp.close();
  }

  openAddNotification() {
    this.router.navigate(["/add-notification", { date: this.currentDay }]);
    //this.enterPopUp.close();
  }
}