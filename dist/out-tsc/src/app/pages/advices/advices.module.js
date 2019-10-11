import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdvicesPage } from './advices';
let AdvicesPageModule = class AdvicesPageModule {
};
AdvicesPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AdvicesPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: AdvicesPage
                }
            ])
        ],
    })
], AdvicesPageModule);
export { AdvicesPageModule };
//# sourceMappingURL=advices.module.js.map