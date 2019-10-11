import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { QuoteModel } from '../../model/QuoteModel.interface';
/**
 * Generated class for the QuoteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
let QuoteComponent = class QuoteComponent {
    constructor() {
        this.favedClicked = new EventEmitter();
        this.quote = this.quoteObj;
    }
    onFavedClicked() {
        this.favedClicked.emit(this.quoteObj);
    }
    ngAfterViewInit() {
    }
};
tslib_1.__decorate([
    Input('quoteObj'),
    tslib_1.__metadata("design:type", QuoteModel)
], QuoteComponent.prototype, "quoteObj", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], QuoteComponent.prototype, "favedClicked", void 0);
QuoteComponent = tslib_1.__decorate([
    Component({
        selector: 'quote',
        templateUrl: 'quote.html',
        styleUrls: ['quote.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], QuoteComponent);
export { QuoteComponent };
//# sourceMappingURL=quote.js.map