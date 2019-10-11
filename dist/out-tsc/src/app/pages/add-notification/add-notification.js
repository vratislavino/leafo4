import * as tslib_1 from "tslib";
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { RatingProvider } from '../../providers/rating/rating';
import { AccountProvider } from '../../providers/account/account';
/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let AddNotificationPage = class AddNotificationPage {
    constructor(route, router, ac, rp) {
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.rp = rp;
        let a = this.route.snapshot.paramMap.get('date');
        if (a != undefined) {
            this.myDate = new Date(a).toISOString();
            console.log(this.myDate);
        }
        else {
            console.log("Date not set");
        }
        var date = new Date();
        this.myTime = date.toISOString();
        console.log("Cas: " + this.myTime);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AddNotificationPage');
    }
    addNotification() {
        this.rp.addNotification(this.myDate, this.myTime, this.notification).subscribe(val => {
            console.log("val: " + val);
            this.router.navigate(['/calendar']);
        }, error => {
            console.log("val: " + error);
        });
    }
    onInput(type, value) {
        if (type == "note") {
            this.notification = value;
        }
    }
};
AddNotificationPage = tslib_1.__decorate([
    Component({
        selector: 'page-add-notification',
        templateUrl: 'add-notification.html',
        styleUrls: ['add-notification.scss'],
        providers: [AccountProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, AccountProvider, RatingProvider])
], AddNotificationPage);
export { AddNotificationPage };
//# sourceMappingURL=add-notification.js.map