import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { QuoteProvider } from '../../providers/quote/quote';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { Router, ActivatedRoute } from '@angular/router';
/**
 * Generated class for the QuotePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let QuotePopupPage = class QuotePopupPage {
    constructor(router, route, quoteProvider) {
        this.router = router;
        this.route = route;
        this.quoteProvider = quoteProvider;
        this.author = "";
        this.quote = new QuoteModel(8, 'Kup si něco hezkého na sebe!', "Já", false, '', 'Vráťo', ['friend']);
    }
    ionViewWillLoad() {
        this.author = this.route.snapshot.paramMap.get("author");
        //this.quoteProvider.mockAdvice(this.author).subscribe((quote: QuoteModel) => { this.quote = quote;});
    }
    close() {
        this.router.navigate(["/advices"]);
        //this.viewCtrl.dismiss({quote: this.quote.text});
    }
};
QuotePopupPage = tslib_1.__decorate([
    Component({
        selector: 'page-quote-popup',
        templateUrl: 'quote-popup.html',
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, QuoteProvider])
], QuotePopupPage);
export { QuotePopupPage };
//# sourceMappingURL=quote-popup.js.map