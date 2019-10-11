import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register';
let RegisterPageModule = class RegisterPageModule {
};
RegisterPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            RegisterPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: RegisterPage
                }
            ])
        ],
    })
], RegisterPageModule);
export { RegisterPageModule };
//# sourceMappingURL=register.module.js.map