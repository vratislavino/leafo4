import * as tslib_1 from "tslib";
var MotStorageProvider_1;
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
let MotStorageProvider = MotStorageProvider_1 = class MotStorageProvider {
    constructor(http, storage) {
        this.http = http;
        this.storage = storage;
        this.readyPromise = null;
        this.readyPromise = this.setDataFromStorage();
    }
    ready() {
        return this.readyPromise;
    }
    set(key, value) {
        MotStorageProvider_1.data[key] = {
            data: value
        };
        this.storage.set('data', JSON.stringify(MotStorageProvider_1.data));
    }
    setByUser(key, value, userUuid) {
        if (userUuid) {
            if (MotStorageProvider_1.userData[userUuid] === undefined) {
                MotStorageProvider_1.userData[userUuid] = {};
            }
            MotStorageProvider_1.userData[userUuid][key] = {
                data: value
            };
            this.storage.set('userData', JSON.stringify(MotStorageProvider_1.userData));
        }
    }
    exists(key) {
        return MotStorageProvider_1.data[key] !== undefined;
    }
    existsByUser(key, userUuid) {
        if (userUuid) {
            if (MotStorageProvider_1.userData[userUuid] !== undefined && MotStorageProvider_1.userData[userUuid][key] !== undefined) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return Data or undefined if key is not present.
     */
    get(key) {
        return this.exists(key) ? MotStorageProvider_1.data[key].data : undefined;
    }
    /**
     * @return Data or undefined if key is not present.
     */
    getByUser(key, userUuid) {
        return this.existsByUser(key, userUuid) ? MotStorageProvider_1.userData[userUuid][key].data : undefined;
    }
    /**
     * @return Timestamp number in seconds or undefined.
     */
    getCreatedAt(key) {
        return this.exists(key) ? MotStorageProvider_1.data[key].createdAt : undefined;
    }
    /**
     * @return Timestamp number in seconds or undefined.
     */
    getCreatedAtByUser(key, userUuid) {
        return this.existsByUser(key, userUuid) ? MotStorageProvider_1.userData[userUuid][key].createdAt : undefined;
    }
    remove(key) {
        delete MotStorageProvider_1.data[key];
        this.storage.set('data', JSON.stringify(MotStorageProvider_1.data));
    }
    removeByUser(key, userUuid) {
        if (this.existsByUser(key, userUuid)) {
            delete MotStorageProvider_1.userData[userUuid][key];
            this.storage.set('userData', JSON.stringify(MotStorageProvider_1.userData));
        }
    }
    setDataFromStorage() {
        return new Promise((resolve, reject) => {
            let dataPromise = this.storage.get('data');
            let userDataPromise = this.storage.get('userData');
            dataPromise.then((value) => {
                if (value) {
                    MotStorageProvider_1.data = JSON.parse(value);
                }
                else {
                    MotStorageProvider_1.data = {};
                }
            });
            userDataPromise.then((value) => {
                if (value) {
                    MotStorageProvider_1.userData = JSON.parse(value);
                }
                else {
                    MotStorageProvider_1.userData = {};
                }
            });
            Promise.all([dataPromise, userDataPromise]).then(() => {
                resolve();
            }, () => {
                reject();
            });
        });
    }
};
MotStorageProvider.data = {};
MotStorageProvider.userData = {};
MotStorageProvider = MotStorageProvider_1 = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Storage])
], MotStorageProvider);
export { MotStorageProvider };
//# sourceMappingURL=mot-storage.js.map