import * as tslib_1 from "tslib";
import { AccountProvider } from './../account/account';
import { Injectable } from '@angular/core';
import { D } from '../../../D';
import { RequestProvider } from '../request/request';
let RatingProvider = class RatingProvider {
    constructor(apiRequest, ac) {
        this.ac = ac;
        this.apiRequest = apiRequest;
    }
    getApplesForCurrentTree() {
        return this.apiRequest.post('/getApples.php', {
            id_u: this.ac.getUserId()
        });
    }
    collectApple(appleId, answers) {
        return this.apiRequest.post('/collectApple.php', {
            id_u: this.ac.getUserId(),
            id_da: appleId,
            answers: answers
        });
    }
    getDayData(date, ratingOnly) {
        return this.apiRequest.post('/getRatings.php', {
            id_u: this.ac.getUserId(),
            startDate: date,
            endDate: date,
            ratingOnly: ratingOnly
        });
    }
    getWeekData(date, ratingOnly) {
        let startDate = new Date(date);
        let endDate = new Date(date);
        startDate = D.addWeek(startDate, -1);
        return this.apiRequest.post('/getRatings.php', {
            id_u: this.ac.getUserId(),
            startDate: D.toKeyDate(startDate),
            endDate: D.toKeyDate(endDate),
            ratingOnly: ratingOnly
        });
    }
    getMonthDataByMoment(start, end, ratingOnly) {
        return this.apiRequest.post('/getRatings.php', {
            id_u: this.ac.getUserId(),
            startDate: start,
            endDate: end,
            ratingOnly: ratingOnly
        });
    }
    getMonthData(date, ratingOnly) {
        let startDate = new Date(date);
        let endDate = new Date(date);
        startDate.setDate(1);
        endDate.setDate(D.getDaysInMonth(endDate));
        return this.apiRequest.post('/getRatings.php', {
            id_u: this.ac.getUserId(),
            startDate: D.toKeyDate(startDate),
            endDate: D.toKeyDate(endDate),
            ratingOnly: ratingOnly
        });
    }
    addNotification(date, time, text) {
        return this.apiRequest.post('/addNotification.php', {
            id_u: this.ac.getUserId(),
            date: date,
            time: time,
            text: text
        });
    }
    addNote(date, text, icon = "star") {
        return this.apiRequest.post('/addNote.php', {
            id_u: this.ac.getUserId(),
            date: date,
            text: text,
            icon: icon
        });
    }
    sendReview(text) {
        return this.apiRequest.post('/setReview.php', {
            id_u: this.ac.getUserId(),
            text: text
        });
    }
    setDayReview(date, rating) {
        /*
        Přidat podmínku k volání!
        if(new Date(date + " 0:0") <= new Date()) {
            callThisFunc()
        */
        console.log(date + " : " + rating);
        return this.apiRequest.post('/setRatings.php', {
            id_u: this.ac.getUserId(),
            date: date,
            rating: rating
        });
    }
};
RatingProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [RequestProvider, AccountProvider])
], RatingProvider);
export { RatingProvider };
//# sourceMappingURL=rating.js.map