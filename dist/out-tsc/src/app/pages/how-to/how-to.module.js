import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HowToPage } from './how-to.page';
const routes = [
    {
        path: '',
        component: HowToPage
    }
];
let HowToPageModule = class HowToPageModule {
};
HowToPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [HowToPage]
    })
], HowToPageModule);
export { HowToPageModule };
//# sourceMappingURL=how-to.module.js.map