import * as tslib_1 from "tslib";
import { MotStorageProvider } from './../mot-storage/mot-storage';
import { Injectable } from '@angular/core';
import { User } from '../../model/UserModel';
import { Events } from '@ionic/angular';
let AccountProvider = class AccountProvider {
    constructor(events, motStorage) {
        this.readyPromise = null;
        this.readyPromise = motStorage.ready();
        this.events = events;
        this.motStorage = motStorage;
    }
    ready() {
        return this.readyPromise;
    }
    login(user, data, nav) {
        user.extractUser(data);
        this.motStorage.set('auth', user);
        console.log("SAVED USER TO STORAGE AFTER LOGIN");
        console.log(this.getAuthData());
        this.events.publish('user:login', nav);
    }
    saveLocal(user) {
        this.motStorage.set('auth', user);
        console.log("SAVED USER TO STORAGE FROM saveLocal");
        console.log(this.getAuthData());
    }
    getProfileImage() {
        return new Promise((resolve, reject) => {
            if (this.motStorage.exists('avatar')) {
                resolve(this.motStorage.get('avatar'));
            }
            else {
                reject('assets/imgs/avatar.png');
            }
        });
    }
    setProfileImage(data) {
        return new Promise((resolve, reject) => {
            this.motStorage.set('avatar', data);
            resolve();
        });
    }
    logout() {
        this.motStorage.remove('auth');
        console.log("REMOVED USER FROM STORAGE FROM LOGOUT");
        console.log(this.getAuthData());
        this.events.publish('user:logout');
    }
    getAuthData() {
        return this.motStorage.get('auth');
    }
    test() {
        return this.motStorage.exists("auth");
    }
    isLoggedIn() {
        return this.getAuthData();
    }
    getCopyOfUser() {
        var usr = this.getAuthData();
        var copy = new User(usr.email);
        copy.extractUser(usr);
        return copy;
    }
    getUserId() {
        var auth = this.getAuthData();
        return auth.id;
    }
    getAddressing() {
        var auth = this.getAuthData();
        return auth.addressing;
    }
    getUserName() {
        let auth = this.getAuthData();
        if (auth) {
            return auth.username;
        }
        return '';
    }
    getUserUuid() {
        let auth = this.getAuthData();
        if (auth && auth.uuid) {
            return auth.uuid;
        }
        return null;
    }
    getUserRole() {
        let auth = this.getAuthData();
        if (auth && auth.uuid) {
            return auth.role;
        }
        return null;
    }
};
AccountProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Events, MotStorageProvider])
], AccountProvider);
export { AccountProvider };
//# sourceMappingURL=account.js.map