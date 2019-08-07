import { AccountProvider } from './../../providers/account/account';
import { RatingProvider } from './../../providers/rating/rating';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarDate } from '../../model/CalendarDate.interface';
import * as moment from 'moment';
import * as _ from 'lodash';
import {DAYS_LIST} from '../../mocks/days.mocks';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit, OnChanges {

  currentDate = moment();
  dayNames = DAYS_LIST;
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  downloaded = false;

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private rp: RatingProvider) { 
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
      this.generateCalendar();
    }
  }

  generateCalendar() : void {
    
    const firstOfMonth = moment(this.currentDate).startOf('month').day();
    const firstDayOfGrid = moment(this.currentDate).startOf('month').subtract(firstOfMonth-1, 'days');


    const start = moment(this.currentDate).startOf('month').format("YYYY-MM-DD");
    const end = moment(this.currentDate).endOf('month').format("YYYY-MM-DD");

    

    var userId = 1;
    if(AccountProvider.user != undefined)
      userId = AccountProvider.user.id;


    this.rp.getMonthDataByMoment(userId, start, end, false).subscribe(data => {

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
    this.currentDate = date.mDate;
    
    if(this.selectedDates.length > 0) {
      this.selectedDates = [];
    }
    
    this.selectedDates.push(date);

    this.onSelectDate.next(date);
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

  getApple(details, app) {
    if(details.apple == null)
      return false;

    if(details.apple[app] != undefined)
      return true;
    return false;
  }
}