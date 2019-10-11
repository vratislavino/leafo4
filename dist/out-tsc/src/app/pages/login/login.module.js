import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login';
let LoginPageModule = class LoginPageModule {
};
LoginPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LoginPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: LoginPage
                }
            ])
        ],
    })
], LoginPageModule);
export { LoginPageModule };
//# sourceMappingURL=login.module.js.map