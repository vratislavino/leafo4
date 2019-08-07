import { CalendarComponent } from './calendar';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
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
export class CalendarComponentModule {}