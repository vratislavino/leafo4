import { ProfilePage } from './profile';
import { QuoteComponentModule } from '../../components/quote/quote.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HoroscopeComponentModule } from '../../components/horoscope/horoscope.component.module';


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteComponentModule,
    HoroscopeComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfilePage
      }
    ])
  ],
})
export class ProfilePageModule {}
