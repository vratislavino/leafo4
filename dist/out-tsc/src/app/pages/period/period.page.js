import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserProvider } from 'src/app/providers/user/user';
import { Router } from '@angular/router';
let PeriodPage = class PeriodPage {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.customActionSheetOptions = {
            header: 'Dny',
            subHeader: 'Zvol délku svého ovulačního cyklu'
        };
    }
    ngOnInit() {
        this.userService.getOvulationData().subscribe((data) => {
            console.log(data["ovulation_date"]);
            if (data["ovulation_date"] == null) {
                this.period_length = "24";
                this.period_lasting = "4";
                this.myDate = new Date().toISOString();
            }
            else {
                this.period_length = data["ovulation_length"];
                this.period_lasting = data["ovulation_lasting"];
                this.myDate = new Date(data["ovulation_date"]).toISOString();
            }
        });
    }
    saveData() {
        this.userService.setOvulationData(this.myDate, this.period_length, this.period_lasting).subscribe((data) => {
            this.router.navigate(["/calendar"]);
        });
    }
};
PeriodPage = tslib_1.__decorate([
    Component({
        selector: 'app-period',
        templateUrl: './period.page.html',
        styleUrls: ['./period.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [UserProvider, Router])
], PeriodPage);
export { PeriodPage };
//# sourceMappingURL=period.page.js.map