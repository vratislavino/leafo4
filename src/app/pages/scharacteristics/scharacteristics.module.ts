import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScharacteristicsPage } from './scharacteristics.page';

const routes: Routes = [
  {
    path: '',
    component: ScharacteristicsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScharacteristicsPage]
})
export class ScharacteristicsPageModule {}
