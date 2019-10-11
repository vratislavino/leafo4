import * as tslib_1 from "tslib";
import { InfoLeafoComponentModule } from './../../components/info-leafo/info-leafo.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsPage } from './settings';
let SettingsPageModule = class SettingsPageModule {
};
SettingsPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            SettingsPage
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            InfoLeafoComponentModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: SettingsPage
                }
            ])
        ],
    })
], SettingsPageModule);
export { SettingsPageModule };
//# sourceMappingURL=settings.module.js.map