import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AddNotificationPage } from './add-notification';

@NgModule({
  declarations: [
    AddNotificationPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddNotificationPage
      }
    ])
  ],
})
export class AddNotificationPageModule {}
