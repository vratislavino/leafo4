import * as tslib_1 from "tslib";
import { CalendarComponentModule } from '../../components/calendar/calendar.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarPage } from './calendar';
let CalendarPageModule = class CalendarPageModule {
};
CalendarPageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            CalendarPage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            CalendarComponentModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: CalendarPage
                }
            ])
        ],
    })
], CalendarPageModule);
export { CalendarPageModule };
//# sourceMappingURL=calendar.module.js.map