import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class MotStorageProvider {
  private static data = {};
  private static userData = {};


  private readyPromise: Promise<void> = null;

  constructor(public http: HttpClient, private storage: Storage) {
    this.readyPromise = this.setDataFromStorage();
  }

  ready() {
    return this.readyPromise;
  }

  set(key: string, value: any) {
    MotStorageProvider.data[key] = {
      data: value
    };
    this.storage.set('data', JSON.stringify(MotStorageProvider.data));
  }

  setByUser(key: string, value: any, userUuid: string) {
    if (userUuid) {
      if (MotStorageProvider.userData[userUuid] === undefined) {
        MotStorageProvider.userData[userUuid] = {};
      }
      MotStorageProvider.userData[userUuid][key] = {
        data: value
      };
      this.storage.set('userData', JSON.stringify(MotStorageProvider.userData));
    }
  }
  
  exists(key: string): boolean {
    return MotStorageProvider.data[key] !== undefined;
  }

  
  existsByUser(key: string, userUuid: string): boolean {
    if (userUuid) {
      if (MotStorageProvider.userData[userUuid] !== undefined && MotStorageProvider.userData[userUuid][key] !== undefined) {
        return true;
      }
    }
    return false;
  }

  /**
   * @return Data or undefined if key is not present.
   */
  get(key: string): any {
    return this.exists(key) ? MotStorageProvider.data[key].data : undefined;
  }

  /**
   * @return Data or undefined if key is not present.
   */
  getByUser(key: string, userUuid: string): any {
    return this.existsByUser(key, userUuid) ? MotStorageProvider.userData[userUuid][key].data : undefined;
  }

  /**
   * @return Timestamp number in seconds or undefined.
   */
  getCreatedAt(key: string): number {
    return this.exists(key) ? MotStorageProvider.data[key].createdAt : undefined;
  }

  /**
   * @return Timestamp number in seconds or undefined.
   */
  getCreatedAtByUser(key: string, userUuid: string): number {
    return this.existsByUser(key, userUuid) ? MotStorageProvider.userData[userUuid][key].createdAt : undefined;
  }

  remove(key: string) {
    delete MotStorageProvider.data[key];
    this.storage.set('data', JSON.stringify(MotStorageProvider.data));
  }

  removeByUser(key: string, userUuid: string) {
    if (this.existsByUser(key, userUuid)) {
      delete MotStorageProvider.userData[userUuid][key];
      this.storage.set('userData', JSON.stringify(MotStorageProvider.userData));
    }
  }

  private setDataFromStorage(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let dataPromise = this.storage.get('data');
      let userDataPromise = this.storage.get('userData');
      dataPromise.then((value) => {
        if (value) {
          MotStorageProvider.data = JSON.parse(value);
        } else {
          MotStorageProvider.data = {};
        }
      });
      userDataPromise.then((value) => {
        if (value) {
          MotStorageProvider.userData = JSON.parse(value);
        } else {
          MotStorageProvider.userData = {};
        }
      });
      Promise.all([dataPromise, userDataPromise]).then(() => {
        resolve();
      }, () => {
        reject();
      });
    });
  }
}
