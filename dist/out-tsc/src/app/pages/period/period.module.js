import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PeriodPage } from './period.page';
const routes = [
    {
        path: '',
        component: PeriodPage
    }
];
let PeriodPageModule = class PeriodPageModule {
};
PeriodPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [PeriodPage]
    })
], PeriodPageModule);
export { PeriodPageModule };
//# sourceMappingURL=period.module.js.map