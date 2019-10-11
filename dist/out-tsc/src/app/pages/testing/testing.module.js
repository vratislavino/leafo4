import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestingPage } from './testing';
let TestingPageModule = class TestingPageModule {
};
TestingPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            TestingPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: TestingPage
                }
            ])
        ],
    })
], TestingPageModule);
export { TestingPageModule };
//# sourceMappingURL=testing.module.js.map