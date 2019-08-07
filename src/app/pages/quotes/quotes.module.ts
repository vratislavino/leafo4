
import { QuotesPage } from './quotes';
import { QuoteComponentModule } from '../../components/quote/quote.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    QuotesPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuotesPage
      }
    ])
  ],
})
export class QuotesPageModule {}
