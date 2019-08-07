import { AppVersion } from '@ionic-native/app-version/ngx';

import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';

/*
  Generated class for the SystemInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SystemInfoProvider {
  private platformVersion = '';
  private appVersion = '';

  constructor(platform: Platform, private appv:AppVersion) {
    platform.ready().then(() => {
      this.platformVersion = "5";
      //this.platformVersion = platform.version().str;
      /*appv.getVersionNumber().then((version) => {
        this.appVersion = version;
      });*/
    });
  }

  getPlatformVersion(): string {
    return this.platformVersion;
  }

  getAppVersion(): string {
    return this.appVersion;
  }

}
