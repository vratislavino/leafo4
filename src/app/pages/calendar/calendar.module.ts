import { CalendarComponentModule } from '../../components/calendar/calendar.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CalendarPage } from './calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
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
export class CalendarPageModule {}
