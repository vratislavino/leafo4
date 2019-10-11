import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddNotificationPage } from './add-notification';
let AddNotificationPageModule = class AddNotificationPageModule {
};
AddNotificationPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AddNotificationPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: AddNotificationPage
                }
            ])
        ],
    })
], AddNotificationPageModule);
export { AddNotificationPageModule };
//# sourceMappingURL=add-notification.module.js.map