import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdvicesPage } from './advices';

@NgModule({
  declarations: [
    AdvicesPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdvicesPage
      }
    ])
  ],
})
export class AdvicesPageModule {}
