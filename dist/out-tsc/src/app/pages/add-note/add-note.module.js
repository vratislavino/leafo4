import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddNotePage } from './add-note';
let AddNotePageModule = class AddNotePageModule {
};
AddNotePageModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AddNotePage,
        ],
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: AddNotePage
                }
            ])
        ],
    })
], AddNotePageModule);
export { AddNotePageModule };
//# sourceMappingURL=add-note.module.js.map