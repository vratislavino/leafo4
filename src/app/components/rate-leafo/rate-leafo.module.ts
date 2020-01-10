import { CommonModule } from '@angular/common';
import { RateLeafoComponent } from './rate-leafo';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    RateLeafoComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    RateLeafoComponent
  ]
})
export class RateLeafoComponentModule {}