import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphPage } from './graph';
let GraphPageModule = class GraphPageModule {
};
GraphPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            GraphPage
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: GraphPage
                }
            ])
        ],
    })
], GraphPageModule);
export { GraphPageModule };
//# sourceMappingURL=graph.module.js.map