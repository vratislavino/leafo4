import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountProvider } from './../account/account';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ENV, ENV_PROD, ENV_DEV, API_ENDPOINT_PROD, API_ENDPOINT_DEV } from '../../../config';
import { SystemInfoProvider } from '../system-info/system-info';
import { map } from 'rxjs/operators';
let RequestProvider = class RequestProvider {
    constructor(http, systemInfo, userService) {
        this.http = http;
        this.systemInfo = systemInfo;
        this.userService = userService;
        this.apiEndpoint = '';
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
    get(url, search) {
        let headers = new HttpHeaders();
        this.setHeaders(headers);
        // body: '' is a quick fix for a timeout issue
        return this.http.get(this.apiEndpoint + url, { headers: headers })
            //.timeout(API_TIMEOUT)
            .pipe(map(this.extractData));
        //.catch(this.handleError);
    }
    post(url, data) {
        let headers = new HttpHeaders();
        this.setHeaders(headers);
        let body = data ? JSON.stringify(data) : '';
        return this.http.post(this.apiEndpoint + url, body, { headers: headers })
            //.timeout(API_TIMEOUT)
            .pipe(map(this.extractData));
        //.catch(this.handleError);
    }
    put(url, data) {
        let headers = new HttpHeaders();
        this.setHeaders(headers);
        let body = data ? JSON.stringify(data) : '';
        return this.http.put(this.apiEndpoint + url, body, { headers: headers })
            //.timeout(API_TIMEOUT)
            .pipe(map(this.extractData));
        //.catch(this.handleError);
    }
    setHeaders(headers) {
        headers.append('Content-Type', 'application/json');
        headers.append('X-Platform-Version', this.systemInfo.getPlatformVersion());
        headers.append('X-App-Version', this.systemInfo.getAppVersion());
        let auth = this.userService.getAuthData();
        if (auth && auth.token) {
            //headers.append('Authorization', 'Basic ' + auth.token);
        }
    }
    extractData(res) {
        console.log(res);
        return res;
    }
    handleError(error) {
        // sometimes we need to act on Response code or Response body
        // so we return the whole object  
        return Observable.throw(error);
    }
};
RequestProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient, SystemInfoProvider, AccountProvider])
], RequestProvider);
export { RequestProvider };
//# sourceMappingURL=request.js.map