import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TreePage } from './tree';
let TreePageModule = class TreePageModule {
};
TreePageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            TreePage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: TreePage
                }
            ])
        ],
    })
], TreePageModule);
export { TreePageModule };
//# sourceMappingURL=tree.module.js.map