import * as tslib_1 from "tslib";
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
/*
  Generated class for the SystemInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let SystemInfoProvider = class SystemInfoProvider {
    constructor(platform, appv) {
        this.appv = appv;
        this.platformVersion = '';
        this.appVersion = '';
        platform.ready().then(() => {
            this.platformVersion = "5";
            //this.platformVersion = platform.version().str;
            /*appv.getVersionNumber().then((version) => {
              this.appVersion = version;
            });*/
        });
    }
    getPlatformVersion() {
        return this.platformVersion;
    }
    getAppVersion() {
        return this.appVersion;
    }
};
SystemInfoProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Platform, AppVersion])
], SystemInfoProvider);
export { SystemInfoProvider };
//# sourceMappingURL=system-info.js.map