import * as tslib_1 from "tslib";
import { ProfileEditPage } from './profile-edit';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
let ProfileEditPageModule = class ProfileEditPageModule {
};
ProfileEditPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ProfileEditPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: ProfileEditPage
                }
            ])
        ],
    })
], ProfileEditPageModule);
export { ProfileEditPageModule };
//# sourceMappingURL=profile-edit.module.js.map