import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RatingProvider } from '../../providers/rating/rating';
import { AccountProvider } from '../../providers/account/account';
/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let AddNotePage = class AddNotePage {
    constructor(router, route, ac, rp) {
        this.router = router;
        this.route = route;
        this.ac = ac;
        this.rp = rp;
        let date = this.route.snapshot.paramMap.get("date");
        console.log(date);
        if (date != undefined) {
            this.myDate = new Date(date).toISOString(); // date.keyDate
            console.log(this.myDate);
        }
        else {
            console.log("Date not set");
        }
        //TODO--- get date from that
        /*
      if(navParams.get("date") != undefined) {
          this.myDate = navParams.get("date").keyDate;
          console.log(this.myDate);
      } else {
          console.log("Date not set");
      }*/
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AddNotePage');
    }
    addNote() {
        console.log("Adding note.");
        this.rp.addNote(this.myDate, this.note, "star").subscribe(val => {
            console.log(val);
            this.router.navigate(['/calendar']);
        }, error => {
            console.log("val: " + error);
        });
        console.log("idk");
    }
    onInput(type, value) {
        if (type == "note") {
            this.note = value;
        }
    }
};
AddNotePage = tslib_1.__decorate([
    Component({
        selector: 'page-add-note',
        templateUrl: 'add-note.html',
        styleUrls: ['add-note.scss'],
        providers: [AccountProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, AccountProvider, RatingProvider])
], AddNotePage);
export { AddNotePage };
//# sourceMappingURL=add-note.js.map