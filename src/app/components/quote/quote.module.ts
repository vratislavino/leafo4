import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { QuoteComponent } from './quote';

@NgModule({
  declarations: [
    QuoteComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    QuoteComponent
  ]
})
export class QuoteComponentModule {}