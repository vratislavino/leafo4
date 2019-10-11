import * as tslib_1 from "tslib";
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { Router } from '@angular/router';
import { User } from 'src/app/model/UserModel';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let RegisterPage = class RegisterPage {
    constructor(ac, apiUser, router, userService, tC) {
        this.ac = ac;
        this.apiUser = apiUser;
        this.router = router;
        this.userService = userService;
        this.tC = tC;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }
    register() {
        this.userService.register(this.email, this.password, this.passwordA, this.username, this.firstname, this.surname, this.addressing, this.sign, this.sex).
            subscribe((message) => {
            //this.showToast(JSON.stringify(message));
            this.apiUser.auth(this.email, this.password).subscribe((data) => {
                let user = User.createUser(this.email);
                this.ac.login(user, data, false);
                this.router.navigate(["settings", 1]);
            });
        }, (err) => {
            this.showToast(err);
        });
    }
    showToast(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var alert = yield this.tC.create({
                message: message,
                duration: 3000,
                position: "bottom"
            });
            alert.present();
        });
    }
};
RegisterPage = tslib_1.__decorate([
    Component({
        selector: 'page-register',
        styleUrls: ['register.scss'],
        templateUrl: 'register.html',
        providers: [AccountProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [AccountProvider,
        UserProvider, Router, UserProvider, ToastController])
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=register.js.map