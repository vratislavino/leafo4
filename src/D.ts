export class D {

    public static getMonday(d: Date, dayToFind = 1) {
        var today = d;
        var monday = d;
        var day = today.getDay();
        if (day !== dayToFind) {
            monday.setHours(-24 * (day - 1));
        }
        return monday;
    }

    public static addWeek(d: Date, forward = 1) {
        var monday = d;
        monday.setDate(d.getDate() + (7 * forward));
        return monday;
    }

    public static toKeyDate(d: Date) {
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate());
    }

    public static getDaysInMonth(d: Date) {
        var a = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        return a.getDate();
    }

    // Returns the ISO week of the date.

    public static getWeek(d:Date) {
        var date = new Date(d.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    // Returns the four-digit year corresponding to the ISO week of the date.
    public static getWeekYear(d:Date) {
        var date = new Date(d.getTime());
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        return date.getFullYear();
    }



}