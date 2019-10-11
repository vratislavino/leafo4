import * as tslib_1 from "tslib";
import { AccountProvider } from './../../providers/account/account';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
let DepressionPage = class DepressionPage {
    constructor(userProvider, ac) {
        this.userProvider = userProvider;
        this.ac = ac;
        this.horoscope = "horoskop";
        this.characteristics = "Jsi ";
        this.addressing = "";
        this.userProvider.getDepressionData().subscribe((data) => {
            this.addressing = this.ac.getAddressing();
            this.horoscope = this.ac.getAddressing() + ', ' + data['horoscope']['text'];
            const chars = data['characteristics'];
            if (chars != undefined) {
                this.characteristics += chars[0];
                for (let i = 1; i < chars.length; i++) {
                    this.characteristics += ', ' + chars[i];
                }
            }
        });
    }
    ngOnInit() {
    }
};
DepressionPage = tslib_1.__decorate([
    Component({
        selector: 'app-depression',
        templateUrl: './depression.page.html',
        styleUrls: ['./depression.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [UserProvider,
        AccountProvider])
], DepressionPage);
export { DepressionPage };
//# sourceMappingURL=depression.page.js.map