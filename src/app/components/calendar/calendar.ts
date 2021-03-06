import { AccountProvider } from './../../providers/account/account';
import { RatingProvider } from './../../providers/rating/rating';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarDate } from '../../model/CalendarDate.interface';
import * as moment from 'moment';
import * as _ from 'lodash';
import {DAYS_LIST} from '../../mocks/days.mocks';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {

  public static reference : CalendarComponent = undefined;

  currentDate = moment();
  dayNames = DAYS_LIST;
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  downloaded = false;

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private rp: RatingProvider) { 
    CalendarComponent.reference = this;
    moment.locale('cs');
    this.currentDate = moment();
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.downloaded=false;
    if (changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      
    }
    this.generateCalendar();
  }

  generateCalendar() : void {
    
    const firstOfMonth = moment(this.currentDate).startOf('month').day();
    const firstDayOfGrid = moment(this.currentDate).startOf('month').subtract(firstOfMonth-1, 'days');


    const start = moment(this.currentDate).startOf('month').format("YYYY-MM-DD");
    const end = moment(this.currentDate).endOf('month').format("YYYY-MM-DD");

    this.rp.getMonthDataByMoment(start, end, false).subscribe(data => {

      const dates = this.fillDates(this.currentDate, firstDayOfGrid, data);
      const weeks: CalendarDate[][] = [];
      var nums =[];
      dates.forEach(x => {
        nums.push(x.mDate.format('dddd') + x.mDate.format('DD'));
      });
      //console.log(nums);
      while(dates.length > 0) {
        weeks.push(dates.splice(0,7));
      }
      this.weeks = weeks;
      this.downloaded = true;

    });


  }

  testRating(keyDate, rating) {
    for(var i = 0; i < this.weeks.length; i++) {
      for(var j = 0; j < this.weeks[i].length; j++) {
        if(this.weeks[i][j] != null && this.weeks[i][j].keyDate == keyDate) {
          this.weeks[i][j].details["rating"] = rating;
          return;
        }
      }
    }
    
  }

  getIcon() {
    return 'tint';
  }

  fillDates(currentMoment: moment.Moment, firstDayOfGrid, data): CalendarDate[] {
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              const keyDate = d.format("YYYY-MM-DD");
              return new CalendarDate(d, keyDate, data[keyDate], this.isSelected(d), this.isToday(d));
            });
  }


  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    console.log("Date seleted!");
    console.log(date);

    this.currentDate = date.mDate;
    
    if(this.selectedDates.length > 0) {
      this.selectedDates = [];
    }
    
    this.selectedDates.push(date);

    this.onSelectDate.next(date);
    //this.onSelectDate.emit(date);
    this.generateCalendar();
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  getClassByRating(day) {
    if(day.details == undefined)
      return "r-1";
    if(day.mDate.month() != this.currentDate.month())
      return "r-1";

    return "r"+ day.details.rating;
  }

    getOvulation(ovulation) {
    if(ovulation == null || ovulation == "") return "";
    if(ovulation == "red" || ovulation == "red-start") return "tint";
    if(ovulation == "plodny_den") return "venus";
    if(ovulation == "ovulation") return "pills";
  }

  getApple(details, app) {

    if(details.apple == null)
      return false;
    
    if(details.apple[app] != undefined)
      return true;
    return false;
    }

    showNote(day) {
        //console.log(day);
        if (day.notes == undefined)
            return false;
        if (day.ovulation != undefined && day.ovulation != '') {
            return day.notes.length > 1;
        } else {
            return day.notes.length > 0;
        }
    }

    showNotification(day) {
        if (day.notifications == undefined)
            return false;
        return day.notifications.length > 0;
    }
}