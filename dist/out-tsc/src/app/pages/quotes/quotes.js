import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { QuoteProvider } from '../../providers/quote/quote';
/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let QuotesPage = class QuotesPage {
    constructor(quoteProvider, ac, tC, loadingCtrl) {
        this.quoteProvider = quoteProvider;
        this.ac = ac;
        this.tC = tC;
        this.loadingCtrl = loadingCtrl;
        this.quoteType = "history";
        this.subCategory = ""; //quotes/me
        this.historyQuotes = [];
        this.favoriteQuotes = [];
        this.getQuotes();
        this.showLoading().then(() => this.loading.dismiss());
    }
    getQuotes() {
        this.favoriteQuotes = [];
        this.historyQuotes = [];
        this.downloadHistory();
        this.downloadFaved();
        //this.quoteProvider.mockFavoriteQuotes().subscribe((data: QuoteModel[]) => this.favoriteQuotes = data);
        //this.quoteProvider.mockHistoryQuotes().subscribe((data: QuoteModel[]) => this.historyQuotes = data);
    }
    onFavedClicked(quote) {
        this.quoteProvider.setFaved(quote.getId(), quote.faved == 0 ? true : false).subscribe((data) => {
            if (data.result) {
                if (data.result == 1) {
                    quote.setFaved(!quote.faved);
                    this.getQuotes();
                }
                else if (data.result == 2) {
                    this.showToast("Dosáhl(a) jste maximálního počtu oblíbených citátů.");
                }
                else {
                    this.showToast("Chyba při zpracování příkazu.");
                }
            }
        }, (err) => {
            console.log(err);
        });
    }
    downloadFaved() {
        this.quoteProvider.getFavoriteQuotes().subscribe((data) => {
            this.favoriteQuotes = [];
            var keys = Object.keys(data);
            keys.forEach((key) => {
                var quoteObj = data[key];
                var qm = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["author"], quoteObj["faved"]).complete(this.ac.getAddressing());
                this.favoriteQuotes.push(qm);
            });
        }, (err) => {
            console.log(err);
        });
    }
    downloadHistory() {
        this.quoteProvider.getHistoryQuotes().subscribe((data) => {
            this.historyQuotes = [];
            var keys = Object.keys(data);
            keys.forEach((key) => {
                var quoteObj = data[key];
                console.log(data[key]);
                var qm = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["author"], quoteObj["faved"]).complete(this.ac.getAddressing());
                this.historyQuotes.push(qm);
            });
        }, (err) => {
            console.log(err);
        });
    }
    fetchQuotes() {
    }
    ionViewWillLoad() {
    }
    showLoading() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.loading = yield this.loadingCtrl.create();
            yield this.loading.present();
        });
    }
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
QuotesPage = tslib_1.__decorate([
    Component({
        selector: 'page-quotes',
        templateUrl: 'quotes.html',
        styleUrls: ['quotes.scss'],
        providers: [AccountProvider, QuoteProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [QuoteProvider, AccountProvider, ToastController, LoadingController])
], QuotesPage);
export { QuotesPage };
//# sourceMappingURL=quotes.js.map