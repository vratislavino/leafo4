import * as tslib_1 from "tslib";
import { CalendarComponent } from './calendar';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
let CalendarComponentModule = class CalendarComponentModule {
};
CalendarComponentModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            CalendarComponent,
        ],
        imports: [
            IonicModule,
            CommonModule
        ],
        exports: [
            CalendarComponent
        ]
    })
], CalendarComponentModule);
export { CalendarComponentModule };
//# sourceMappingURL=calendar.module.js.map