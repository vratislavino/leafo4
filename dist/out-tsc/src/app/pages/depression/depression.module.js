import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DepressionPage } from './depression.page';
let DepressionPageModule = class DepressionPageModule {
};
DepressionPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            DepressionPage
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: DepressionPage
                }
            ])
        ]
    })
], DepressionPageModule);
export { DepressionPageModule };
//# sourceMappingURL=depression.module.js.map