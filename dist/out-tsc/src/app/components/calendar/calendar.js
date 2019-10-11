import * as tslib_1 from "tslib";
import { RatingProvider } from './../../providers/rating/rating';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarDate } from '../../model/CalendarDate.interface';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DAYS_LIST } from '../../mocks/days.mocks';
let CalendarComponent = class CalendarComponent {
    constructor(rp) {
        this.rp = rp;
        this.currentDate = moment();
        this.dayNames = DAYS_LIST;
        this.weeks = [];
        this.sortedDates = [];
        this.downloaded = false;
        this.selectedDates = [];
        this.onSelectDate = new EventEmitter();
        moment.locale('cs');
        this.currentDate = moment();
    }
    ngOnInit() {
        this.generateCalendar();
    }
    ngOnChanges(changes) {
        this.downloaded = false;
        if (changes.selectedDates &&
            changes.selectedDates.currentValue &&
            changes.selectedDates.currentValue.length > 1) {
            // sort on date changes for better performance when range checking
            this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m) => m.mDate.valueOf());
            this.generateCalendar();
        }
    }
    generateCalendar() {
        const firstOfMonth = moment(this.currentDate).startOf('month').day();
        const firstDayOfGrid = moment(this.currentDate).startOf('month').subtract(firstOfMonth - 1, 'days');
        const start = moment(this.currentDate).startOf('month').format("YYYY-MM-DD");
        const end = moment(this.currentDate).endOf('month').format("YYYY-MM-DD");
        this.rp.getMonthDataByMoment(start, end, false).subscribe(data => {
            const dates = this.fillDates(this.currentDate, firstDayOfGrid, data);
            const weeks = [];
            var nums = [];
            dates.forEach(x => {
                nums.push(x.mDate.format('dddd') + x.mDate.format('DD'));
            });
            //console.log(nums);
            while (dates.length > 0) {
                weeks.push(dates.splice(0, 7));
            }
            this.weeks = weeks;
            this.downloaded = true;
        });
    }
    fillDates(currentMoment, firstDayOfGrid, data) {
        const start = firstDayOfGrid.date();
        return _.range(start, start + 42)
            .map((date) => {
            const d = moment(firstDayOfGrid).date(date);
            const keyDate = d.format("YYYY-MM-DD");
            return new CalendarDate(d, keyDate, data[keyDate], this.isSelected(d), this.isToday(d));
        });
    }
    isToday(date) {
        return moment().isSame(moment(date), 'day');
    }
    isSelected(date) {
        return _.findIndex(this.selectedDates, (selectedDate) => {
            return moment(date).isSame(selectedDate.mDate, 'day');
        }) > -1;
    }
    isSelectedMonth(date) {
        return moment(date).isSame(this.currentDate, 'month');
    }
    selectDate(date) {
        this.currentDate = date.mDate;
        if (this.selectedDates.length > 0) {
            this.selectedDates = [];
        }
        this.selectedDates.push(date);
        this.onSelectDate.next(date);
        this.generateCalendar();
    }
    // actions from calendar
    prevMonth() {
        this.currentDate = moment(this.currentDate).subtract(1, 'months');
        this.generateCalendar();
    }
    nextMonth() {
        this.currentDate = moment(this.currentDate).add(1, 'months');
        this.generateCalendar();
    }
    firstMonth() {
        this.currentDate = moment(this.currentDate).startOf('year');
        this.generateCalendar();
    }
    lastMonth() {
        this.currentDate = moment(this.currentDate).endOf('year');
        this.generateCalendar();
    }
    getClassByRating(day) {
        if (day.details == undefined)
            return "r-1";
        if (day.mDate.month() != this.currentDate.month())
            return "r-1";
        return "r" + day.details.rating;
    }
    getOvulation(ovulation) {
        if (ovulation == null || ovulation == "")
            return "";
        if (ovulation == "red" || ovulation == "red-start")
            return "warning";
        if (ovulation == "plodny_den")
            return "partly-sunny";
        if (ovulation == "ovulation")
            return "sunny";
    }
    getApple(details, app) {
        if (details.apple == null)
            return false;
        if (details.apple[app] != undefined)
            return true;
        return false;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarComponent.prototype, "selectedDates", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarComponent.prototype, "onSelectDate", void 0);
CalendarComponent = tslib_1.__decorate([
    Component({
        selector: 'calendar',
        templateUrl: 'calendar.html',
        styleUrls: ['calendar.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [RatingProvider])
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.js.map