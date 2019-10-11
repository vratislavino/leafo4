import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { Router } from '@angular/router';
import { UserProvider } from 'src/app/providers/user/user';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let HomePage = class HomePage {
    constructor(platform, router, ac, userService) {
        this.platform = platform;
        this.router = router;
        this.ac = ac;
        this.userService = userService;
        this.addressing = "";
    }
    ngOnInit() {
        this.ac.ready().then(() => {
            if (!this.ac.isLoggedIn()) {
                this.router.navigate(["/login"]);
            }
            else {
                this.addressing = this.ac.getAddressing();
            }
        });
    }
};
HomePage = tslib_1.__decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        styleUrls: ['home.scss'],
        providers: [AccountProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [Platform, Router, AccountProvider, UserProvider])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map