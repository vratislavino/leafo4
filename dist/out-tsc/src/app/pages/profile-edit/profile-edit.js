import * as tslib_1 from "tslib";
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { Router } from '@angular/router';
/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let ProfileEditPage = class ProfileEditPage {
    constructor(router, ac, userService) {
        this.router = router;
        this.ac = ac;
        this.userService = userService;
        this.photo = "./assets/imgs/avatar.png";
        this.currentUserData = ac.getCopyOfUser(); //AccountProvider.user.copy();
    }
    save() {
        this.userService.updateSettings(this.currentUserData, null).subscribe(val => {
            console.log("Updating settings message: " + val);
            //AccountProvider.user = this.currentUserData;
            this.ac.saveLocal(this.currentUserData);
            this.router.navigate(["/profile"]);
        }, error => {
            console.log("Updating settings message: " + error);
        });
    }
    onInput(type, value) {
        if (type == "addressing") {
            this.currentUserData.addressing = value;
        }
        else if (type == "firstname") {
            this.currentUserData.firstname = value;
        }
    }
};
ProfileEditPage = tslib_1.__decorate([
    Component({
        selector: 'page-profile-edit',
        templateUrl: 'profile-edit.html',
        styleUrls: ['profile-edit.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Router, AccountProvider, UserProvider])
], ProfileEditPage);
export { ProfileEditPage };
//# sourceMappingURL=profile-edit.js.map