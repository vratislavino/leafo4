import * as tslib_1 from "tslib";
import { RequestProvider } from './../request/request';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AccountProvider } from '../account/account';
let QuoteProvider = class QuoteProvider {
    constructor(tC, reqProvider, ac) {
        this.tC = tC;
        this.ac = ac;
        this.reqProvider = null;
        this.reqProvider = reqProvider;
    }
    getFavoriteQuotes() {
        return this.reqProvider.post('/quotesApi.php', {
            faved: true,
            id_u: this.ac.getUserId(),
        });
    }
    getHistoryQuotes(num) {
        return this.reqProvider.post('/quotesApi.php', num == null ? {
            faved: false,
            id_u: this.ac.getUserId(),
        } : {
            faved: false,
            count: num,
            id_u: this.ac.getUserId(),
        });
    }
    getProfileQuotes(num) {
        return this.reqProvider.post('/quotesApi.php', num == null ? {
            faved: false,
            horoscope: true,
            id_u: this.ac.getUserId(),
        } : {
            faved: false,
            count: num,
            horoscope: true,
            id_u: this.ac.getUserId(),
        });
    }
    getAdvice() {
        return this.reqProvider.post('/getLastAdvice.php', {
            id_u: this.ac.getUserId()
        });
    }
    getNewAdvice(advisor) {
        return this.reqProvider.post('/getAdvice.php', {
            id_u: this.ac.getUserId(),
            advisor: advisor
        });
    }
    /*
        return new Promise((resolve, reject) => {
          var qmp = [];
          var data: Object = this.getData("quotes", true).then((val) => {
            
            var keys = Object.keys(val);
            if(keys.indexOf("Error") >= 0)
              reject(val[keys[0]]);
            else {
              keys.forEach(function (key) {
                var quoteObj = val[key];
                var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["faved"]);
                qmp.push(qm);
              });
              resolve(qmp);
            }
          }, (err) => {
            reject(err);
          });
        });
      }*/
    /*
      getHistoryQuotes(num?:number) {
        return new Promise((resolve, reject) => {
          var qmp = [];
          var data: Object = this.getData("quotes", false).then((val) => {
            var keys = Object.keys(val);
            if(keys.indexOf("Error") >= 0)
              reject(val[keys[0]]);
            else {
              console.log("Num: " + num);
              if(num == null) {
                console.log("1tf");
                keys.forEach(function (key) {
                  var quoteObj = val[key];
                  var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["faved"]);
                  qmp.push(qm);
                });
              } else {
                console.log("2tf");
                for(var i = 0; i < num; i++) {
                  var quoteObj = val[i];
                  var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["faved"]);
                  qmp.push(qm);
                };
              }
              resolve(qmp);
            }
          }, (err) => {
            reject(err);
          });
        });
      }
    */
    setFaved(qid, faved) {
        return this.reqProvider.post('/faveQuoteApi.php', {
            id_q: qid,
            id_u: this.ac.getUserId(),
            faved: faved
        });
        /*
          const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              "Content-Type": "application/json"
            })
          }
          let postData = {};
    
          postData = {
            id_q: qid,
            id_u: AccountProvider.user.id,
            faved: faved
          };
          var url: string = "https://api.occamy.cz/faveQuoteApi.php";
          console.log("trying to set faved to " + faved + " for id_q " + qid);
          this.http.post(url, JSON.stringify(postData), httpOptions)
            .subscribe(data => {
              console.log(JSON.stringify(data));
              resolve(data);
            }, error => {
              console.log(error);
              reject("Error while attemping to set faved!. " + error);
            });
        });*/
    }
    /*
      getAdvice(author: string): Observable<QuoteModel> {
        return Observable.of(QUOTE_LIST.filter((quote: QuoteModel) => quote.tags.indexOf(author) > -1)[0]);
      }
    
      mockFavoriteQuotes(): Observable<QuoteModel[]> {
        return Observable.of(QUOTE_LIST.filter((quote: QuoteModel) => quote.faved));
      }
    
      mockHistoryQuotes(): Observable<QuoteModel[]> {
        return Observable.of(QUOTE_LIST.slice(0, 3));
      }
    
      mockProfileQuotes(): Observable<QuoteModel[]> {
        return Observable.of(QUOTE_LIST.filter((quote: QuoteModel) => quote.tags.indexOf('me') > -1));
      }
    
      mockAdvice(author: string): Observable<QuoteModel> {
        return Observable.of(QUOTE_LIST.filter((quote: QuoteModel) => quote.tags.indexOf(author) > -1)[0]);
      }*/
    /*
      private getData(api: string, faved: boolean): any {
    
    
        return new Promise((resolve, reject) => {
          const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              "Content-Type": "application/json"
            })
          }
          let postData = {};
    
          postData = {
            id_u: AccountProvider.user.id,
            faved: faved
          }
          var url: string = "https://api.occamy.cz/" + api + "Api.php";
          this.http.post(url, JSON.stringify(postData), httpOptions)
            .subscribe(data => {
              console.log(JSON.stringify(data));
              resolve(data);
            }, error => {
              reject("Error while attemping to get " + api + ". " + error);
            });
        });
      }*/
    showToast(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var alert = yield this.tC.create({
                message: message,
                duration: 3000,
                position: "bottom"
            });
            yield alert.present();
        });
    }
};
QuoteProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ToastController, RequestProvider, AccountProvider])
], QuoteProvider);
export { QuoteProvider };
//# sourceMappingURL=quote.js.map