import * as tslib_1 from "tslib";
import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { RatingProvider } from './../../providers/rating/rating';
import { Component, ViewContainerRef } from '@angular/core';
/**
 * Generated class for the TestingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let TestingPage = class TestingPage {
    constructor(rp, leafoInfo, vc) {
        this.rp = rp;
        this.leafoInfo = leafoInfo;
        this.vc = vc;
        this.pattern = 'This is some *** for trying *** it works';
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TestingPage');
        this.comp = document.getElementById("complete");
        let t = this.pattern.split("***");
        for (var i = 0; i < t.length - 1; i++) {
            this.createPart(t[i]);
            this.createInput();
        }
        this.createPart(t[t.length - 1]);
    }
    createPart(text) {
        this.comp.insertAdjacentHTML('beforeend', '<span class="odst">' + text + '</span>');
    }
    createInput() {
        this.comp.insertAdjacentHTML('beforeend', '<input type="text" class="part">');
    }
};
TestingPage = tslib_1.__decorate([
    Component({
        selector: 'page-testing',
        templateUrl: 'testing.html',
        styleUrls: ['testing.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [RatingProvider,
        LeafoInfoProvider,
        ViewContainerRef])
], TestingPage);
export { TestingPage };
//# sourceMappingURL=testing.js.map