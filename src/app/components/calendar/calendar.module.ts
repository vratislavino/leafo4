import { CalendarComponent } from './calendar';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    IonicModule,
    FontAwesomeModule,
    CommonModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarComponentModule {}