import * as tslib_1 from "tslib";
import { QuotesPage } from './quotes';
import { QuoteComponentModule } from '../../components/quote/quote.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
let QuotesPageModule = class QuotesPageModule {
};
QuotesPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            QuotesPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            QuoteComponentModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: QuotesPage
                }
            ])
        ],
    })
], QuotesPageModule);
export { QuotesPageModule };
//# sourceMappingURL=quotes.module.js.map