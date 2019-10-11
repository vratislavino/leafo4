import * as tslib_1 from "tslib";
import { ProfilePage } from './profile';
import { QuoteComponentModule } from '../../components/quote/quote.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HoroscopeComponentModule } from '../../components/horoscope/horoscope.component.module';
let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ProfilePage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            QuoteComponentModule,
            HoroscopeComponentModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: ProfilePage
                }
            ])
        ],
    })
], ProfilePageModule);
export { ProfilePageModule };
//# sourceMappingURL=profile.module.js.map