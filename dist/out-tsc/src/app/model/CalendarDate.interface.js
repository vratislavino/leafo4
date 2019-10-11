import { DAYS_LIST } from '../mocks/days.mocks';
export class CalendarDate {
    constructor(mDate, keyDate, details, selected, today) {
        this.dayNumberToShow = 5;
        this.dayNameToShow = "a";
        this.mDate = mDate;
        this.keyDate = keyDate;
        this.details = details;
        this.selected = selected;
        this.today = today;
        if (this.details != null) {
            this.ovulation = this.details["ovulation"];
            switch (this.ovulation) {
                case "red": {
                    this.details["notes"].push({
                        text: "Menstruace",
                        id_n: -1,
                        icon: "woman"
                    });
                    break;
                }
                case "red-start": {
                    this.details["notes"].push({
                        text: "Začátek menstruace",
                        id_n: -1,
                        icon: "woman"
                    });
                    break;
                }
                case "plodny_den": {
                    this.details["notes"].push({
                        text: "Plodný den",
                        id_n: -1,
                        icon: "woman"
                    });
                    break;
                }
                case "ovulation": {
                    this.details["notes"].push({
                        text: "Ovulace",
                        id_n: -1,
                        icon: "woman"
                    });
                    break;
                }
                case "red-start": {
                    this.details["notes"].push({
                        text: "Začátek menstruace",
                        id_n: -1,
                        icon: "woman"
                    });
                    break;
                }
            }
        }
        this.dayNumberToShow = this.mDate.format("D");
        var q = this.dayInWeek(this.mDate.day());
        this.dayNameToShow = DAYS_LIST[q];
    }
    dayInWeek(dayIndex) {
        return (dayIndex - 1 + 7) % 7;
    }
}
//# sourceMappingURL=CalendarDate.interface.js.map