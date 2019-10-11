import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReviewPage } from './review.page';
const routes = [
    {
        path: '',
        component: ReviewPage
    }
];
let ReviewPageModule = class ReviewPageModule {
};
ReviewPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ReviewPage]
    })
], ReviewPageModule);
export { ReviewPageModule };
//# sourceMappingURL=review.module.js.map