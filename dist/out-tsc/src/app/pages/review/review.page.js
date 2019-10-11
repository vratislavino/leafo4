import * as tslib_1 from "tslib";
import { Component, ViewContainerRef } from '@angular/core';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';
import { RatingProvider } from 'src/app/providers/rating/rating';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { Router } from '@angular/router';
let ReviewPage = class ReviewPage {
    constructor(router, leafoInfo, ratingProv, vc) {
        this.router = router;
        this.leafoInfo = leafoInfo;
        this.ratingProv = ratingProv;
        this.vc = vc;
        this.text = "";
    }
    ngOnInit() {
    }
    sendNewReview() {
        console.log(this.text);
        this.ratingProv.sendReview(this.text).subscribe(data => {
            if (data["Error"] == undefined) {
                this.leafoInfo.createAndShowLeafoBubble(this.vc, "Děkuji za zpětnou vazbu.", "Děkuji", LeafoInfoType.Happy, () => {
                    this.router.navigate(["/home"]);
                });
            }
            else {
                this.leafoInfo.createAndShowLeafoBubble(this.vc, "Něco se pokazilo při ukládání! " + data["Error"], "Omlouvám se", LeafoInfoType.Sad, () => {
                    this.router.navigate(["/home"]);
                });
            }
        });
    }
};
ReviewPage = tslib_1.__decorate([
    Component({
        selector: 'app-review',
        templateUrl: './review.page.html',
        styleUrls: ['./review.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router, LeafoInfoProvider, RatingProvider, ViewContainerRef])
], ReviewPage);
export { ReviewPage };
//# sourceMappingURL=review.page.js.map