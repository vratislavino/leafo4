import { CommonModule } from '@angular/common';
import { InfoLeafoComponent } from './info-leafo';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    InfoLeafoComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    InfoLeafoComponent
  ]
})
export class InfoLeafoComponentModule {}