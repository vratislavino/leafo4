import * as tslib_1 from "tslib";
import { QuoteComponentModule } from '../../components/quote/quote.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuotePopupPage } from './quote-popup';
let QuotePopupPageModule = class QuotePopupPageModule {
};
QuotePopupPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            QuotePopupPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            QuoteComponentModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: QuotePopupPage
                }
            ])
        ],
    })
], QuotePopupPageModule);
export { QuotePopupPageModule };
//# sourceMappingURL=quote-popup.module.js.map