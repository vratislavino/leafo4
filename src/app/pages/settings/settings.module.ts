import { InfoLeafoComponentModule } from './../../components/info-leafo/info-leafo.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoLeafoComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsPage
      }
    ])
  ],
})
export class SettingsPageModule {}
