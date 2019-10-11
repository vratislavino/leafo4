import * as tslib_1 from "tslib";
import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef } from '@angular/core';
import { ToastController, Events } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let LoginPage = class LoginPage {
    constructor(ac, tC, apiUser, events, leafoProv, viewContainerRef) {
        this.ac = ac;
        this.tC = tC;
        this.apiUser = apiUser;
        this.events = events;
        this.leafoProv = leafoProv;
        this.viewContainerRef = viewContainerRef;
        this.email = "plechaty@occamy.cz";
        this.password = "qweasdyxcsdaf";
    }
    login() {
        this.apiUser.auth(this.email, this.password).subscribe(data => {
            const user = User.createUser(this.email);
            this.ac.login(user, data, true);
            this.apiUser.downloadImage().subscribe((img) => {
                console.log("setting profile image");
                this.ac.setProfileImage(img["data"]);
            });
        });
    }
    testLeafo() {
        console.log("testing leafo");
        this.leafoProv.createAndShowLeafoBubble(this.viewContainerRef, "Test info bubble", "Test");
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
LoginPage = tslib_1.__decorate([
    Component({
        selector: 'page-login',
        styleUrls: ['login.scss'],
        templateUrl: 'login.html'
    }),
    tslib_1.__metadata("design:paramtypes", [AccountProvider,
        ToastController,
        UserProvider,
        Events,
        LeafoInfoProvider,
        ViewContainerRef])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map