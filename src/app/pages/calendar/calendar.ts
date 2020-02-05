import { Component, ViewContainerRef } from '@angular/core';
import {
  AlertController,/*, FabContainer */
  Platform
} from '@ionic/angular';
import { CalendarDate } from '../../model/CalendarDate.interface';
import * as moment from 'moment';
import { AccountProvider } from '../../providers/account/account';
import { RatingProvider } from '../../providers/rating/rating';
import { D } from '../../../D';
import { Router } from '@angular/router';
import 'hammerjs';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { GuideProvider } from 'src/app/providers/guide/guide';
import { CalendarComponent } from 'src/app/components/calendar/calendar';
import { notEqual } from 'assert';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.scss'],
  providers: [AccountProvider],
  animations: [
    trigger('animator', [
      transition('* => pulse', animate(300, keyframes([
        style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
        style({ transform: 'scale3d(1.2, 1.2, 1.2)', offset: .3 }),
        style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
      ])))
    ])]
})
export class CalendarPage {

  currentDay: CalendarDate;
  currrentDayDownloaded = false;
  visibleRatings = false;
  reviewText = "Tap!";
  isWoman = true;
  htmlMove;

  animationState: string;

  constructor(
    public router: Router,
    private platform: Platform,
    public ac: AccountProvider,
    private rp: RatingProvider,
    private vc: ViewContainerRef,
    private lip: LeafoInfoProvider,
    private gp: GuideProvider
  ) {
    this.platform.ready().then(() => {
      this.ionViewDidEnter();
      this.ionViewDidLoad();
    });

  }

  tryToShowGuide(gp) {
    let guide = gp.getAvailableGuideToSee("calendar");
    console.log(guide);
    if (guide)
      this.lip.createAndShowLeafoBubble(this.vc, guide.text, guide.headline, LeafoInfoType.Normal, () => {
        this.gp.addSeen(guide);
        //this.gp.showEm();
        setTimeout(() => this.tryToShowGuide(gp), 250);

      });
  }

  startAnimation(state) {
    console.log(state);
    if (!this.animationState) {
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
    //console.log("===========");
    //console.log("Mens Start");
    //console.log(mensStart);
    //console.log(mensStart.getTime());
    //console.log("Date");
    //console.log(mensDate);
    //console.log(mensDate.getTime());
    while (mensStart < mensDate) {
      mensStart.setDate(mensStart.getDate() + period);
    }
    //console.log("Next menses");
    // console.log(mensStart);
    //console.log(mensStart.getTime());
    //console.log("===========");
    this.currrentDayDownloaded = false;
    if (this.currentDay != undefined)
      this.refreshCurrentDateData(this.currentDay.mDate);
    else
      this.refreshCurrentDateData();
    //console.log("IM BACK HERE!");

    this.tryToShowGuide(this.gp);

  }

  ionViewDidLoad() {
    this.refreshCurrentDateData();
    this.isWoman = this.ac.getAuthData().sex == 2;
    console.log(this.isWoman);
    //console.log("added events");
  }

  onTouchStart(event) {
    this.chooseReview(101);
    //console.log(event);
  }

  onTouchMove(event) {
    if (this.visibleRatings) {
      let nula: HTMLElement = <HTMLElement>document.getElementById('review-changer');
      nula.setAttribute("style", "display: none;");
      var current = this.getElementByTouch(event.changedTouches[0]);
      if (this.htmlMove != undefined && this.htmlMove != null && this.htmlMove != current) {
        this.htmlMove.classList.remove("active");
      }
      this.htmlMove = current;
      this.htmlMove.classList.add("active");
      //console.log(html);
      //this.startAnimation('pulse');
    }
  }

  getElementByPoint(x, y): HTMLElement {
    return <HTMLElement>document.elementFromPoint(x, y);
  }

  getElementByTouch(touch): HTMLElement {

    var x = touch.clientX;
    var y = touch.clientY;
    return this.getElementByPoint(x, y);
  }

  onTouchEnd(event) {
    var doc = this.getElementByTouch(event.changedTouches[0]);
    var html = doc.innerHTML;
    let nula: HTMLElement = <HTMLElement>document.getElementById('review-changer');
    nula.setAttribute("style", "display: flex;");
    if (this.htmlMove != undefined && this.htmlMove != null) {
      this.htmlMove.classList.remove("active");
    }

    if (html.indexOf("%") > -1) {
      html = html.replace("%", "");
      this.chooseReview(parseInt(html));
    } else {
      console.log("NENÍ PROCENTO!");
    }

  }

  refreshCurrentDateData(mDate = moment()) {
    const keyDate = mDate.format("YYYY-MM-DD");
    this.rp.getDayData(keyDate, false).subscribe(data => {
      this.currentDay = new CalendarDate(mDate, keyDate, data[keyDate], true, true);
      this.currrentDayDownloaded = true;

      if (this.currentDay.details != null && this.currentDay.details != undefined)
        if (this.currentDay.details["rating"] != -1)
          this.reviewText = this.currentDay.details["rating"] + "%";
        else
          this.reviewText = "Tap!";
    });
  }

  /*public setDayData(date) {
    this.rp.getDayData(AccountProvider.getId(), date, false).then(data => {
      this.currentDay = new CalendarDate(date, date, data[keyDate], true, true);
      this.currrentDayDownloaded = true;
    });
  }*/

  onDateSelected(date: CalendarDate) {
    //if(moment().format("M") == date.mDate.format("M")) {
    this.currentDay = date;
    if (this.currentDay.details != null && this.currentDay.details != undefined)
      if (this.currentDay.details["rating"] > -1)
        this.reviewText = this.currentDay.details["rating"] + "%";
      else
        this.reviewText = "Tap!"
    console.log("Yess");
    //} else {
    //  console.log("Not rly");
    //}
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

  getReviewText() {

  }

  chooseReview(review) {
    //console.log(review + " _ " + this.visibleRatings);
    if (review == 101 && !this.visibleRatings) {
      this.openReviewButtons();
    } else {
      if (review == 101)
        review = 0;
      if (new Date(this.currentDay.keyDate + " 0:0").getTime() <= new Date().getTime()) {
        this.reviewText = "Tap!";
        this.rp.setDayReview(this.currentDay.keyDate, review).subscribe((data) => {
          console.log(data);
          if (this.currentDay)
            this.currentDay.details["rating"] = review;
          if (review != -1)
            this.reviewText = review + "%";
          else
            this.reviewText = "Tap!";

          CalendarComponent.reference.testRating(this.currentDay.keyDate, review);
          /*
          var day = document.getElementById("day" + this.currentDay.keyDate);
          if(day) {
           var circ =day.nextSibling;
           (<HTMLElement>circ).classList.remove("r100", "r-1", "r0", "r25", "r50", "r75");
           circ
          }*/
        }, (err) => {
          console.log("Error");
          console.log(err);
          this.visibleRatings = false;
        });
      } else {
        this.lip.createAndShowLeafoBubble(this.vc, "Tento den ještě nemůžeš hodnotit!", "Chyba!", LeafoInfoType.Warning);
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
  
  openEditNote(id_n, text) {
    console.log(this.currentDay.details["notes"]);
    console.log("Note ID: " + id_n);
    this.router.navigate(["/add-note", { date: this.currentDay.keyDate, id_n: id_n, text: text }]);
    //this.enterPopUp.close();
  }

  openPeriodSettings() {
    this.router.navigate(["/calendar/period"]);
  }

  openAddNotification() {
    this.router.navigate(["/add-notification", { date: this.currentDay.keyDate }]);
    //this.enterPopUp.close();
  }

  deleteNotification(id_n) {
    console.log("==== Deleting notif: " + id_n + " ====");
  }

  deleteNote(id_n) {
    console.log("==== Deleting notif: " + id_n + " ====");
  }

  openEditNotification(id_n, text, time) {
    console.log("==== Notifications ====");
    console.log(this.currentDay.details["notifications"]);
    this.router.navigate(["/add-notification", { date: this.currentDay.keyDate, time: time, id_n: id_n, text: text }]);
    //this.enterPopUp.close();
  }
}