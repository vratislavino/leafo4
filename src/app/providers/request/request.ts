import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountProvider } from './../account/account';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {ENV, ENV_PROD, ENV_DEV, API_ENDPOINT_PROD, API_ENDPOINT_DEV, API_TIMEOUT} from '../../../config';
import { UserProvider } from '../user/user';
import { SystemInfoProvider } from '../system-info/system-info';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestProvider {

  private apiEndpoint = '';

  constructor(private http: HttpClient, private systemInfo: SystemInfoProvider, private userService: AccountProvider) {
    switch (ENV) {
      case ENV_PROD:
        this.apiEndpoint = API_ENDPOINT_PROD;
        break;
      case ENV_DEV:
      default:
        this.apiEndpoint = API_ENDPOINT_DEV;
        break;
    }
  }

  
  get(url: string, search?: URLSearchParams) {
    let headers = new HttpHeaders();
    this.setHeaders(headers);
    // body: '' is a quick fix for a timeout issue
    return this.http.get(this.apiEndpoint + url, { headers: headers})
      //.timeout(API_TIMEOUT)
      .pipe(map(this.extractData))
      //.catch(this.handleError);
  }

  post(url: string, data: any) {
    let headers = new HttpHeaders();
    this.setHeaders(headers);
    let body = data ? JSON.stringify(data) : '';
    return this.http.post(this.apiEndpoint + url, body, {headers: headers})
      //.timeout(API_TIMEOUT)
      .pipe(map(this.extractData))
      //.catch(this.handleError);
  }

  put(url: string, data: any) {
    let headers = new HttpHeaders();
    this.setHeaders(headers);
    let body = data ? JSON.stringify(data) : '';
    return this.http.put(this.apiEndpoint + url, body, {headers: headers})
      //.timeout(API_TIMEOUT)
      .pipe(map(this.extractData))
      //.catch(this.handleError);
  }

  private setHeaders(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
    headers.append('X-Platform-Version', this.systemInfo.getPlatformVersion());
    headers.append('X-App-Version', this.systemInfo.getAppVersion());
    let auth = this.userService.getAuthData();
    if (auth && auth.token) {
      //headers.append('Authorization', 'Basic ' + auth.token);
    }
  }

  private extractData(res: any) {
    console.log(res);
    return res;
  }

  private handleError (error: any) {
    // sometimes we need to act on Response code or Response body
    // so we return the whole object  
    return Observable.throw(error);
  }

}
