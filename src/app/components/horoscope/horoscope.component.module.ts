import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HoroscopeComponent } from './horoscope.component';

@NgModule({
  declarations: [
    HoroscopeComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    HoroscopeComponent
  ]
})
export class HoroscopeComponentModule {}