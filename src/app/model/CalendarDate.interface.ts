import * as moment from 'moment';
import { DAYS_LIST } from '../mocks/days.mocks';

export class CalendarDate {

    constructor(mDate:moment.Moment, keyDate?:string, details?:object, selected?:boolean, today?:boolean) {
        
        this.mDate = mDate;
        this.keyDate = keyDate;
        this.details = details;
        this.selected = selected;
        this.today = today;

        this.dayNumberToShow = this.mDate.format("D");

        var q = this.dayInWeek(this.mDate.day());
        this.dayNameToShow = DAYS_LIST[q];
    }

    mDate: moment.Moment;
    keyDate?: string;
    details?: object;
    selected?: boolean;
    today?: boolean;

    dayNumberToShow: any = 5;

    dayNameToShow: any = "a";

    private dayInWeek(dayIndex:number):number{
        return (dayIndex - 1 + 7)%7
      }
}
