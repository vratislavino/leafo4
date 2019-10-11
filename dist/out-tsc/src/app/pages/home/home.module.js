import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePage } from './home';
let HomePageModule = class HomePageModule {
};
HomePageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            HomePage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: HomePage
                }
            ])
        ],
    })
], HomePageModule);
export { HomePageModule };
//# sourceMappingURL=home.module.js.map