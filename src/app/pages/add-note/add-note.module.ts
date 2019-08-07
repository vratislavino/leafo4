import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AddNotePage } from './add-note';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AddNotePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddNotePage
      }
    ])
  ],
})
export class AddNotePageModule {}