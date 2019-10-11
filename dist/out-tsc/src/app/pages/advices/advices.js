import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { Router } from '@angular/router';
import { QuoteProvider } from 'src/app/providers/quote/quote';
/**
 * Generated class for the AdvicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let AdvicesPage = class AdvicesPage {
    constructor(ac, router, qp) {
        this.ac = ac;
        this.router = router;
        this.qp = qp;
        this.currentAdvice = "";
        this.currentAdvisor = "";
    }
    ngOnInit() {
        this.qp.getAdvice().subscribe((data) => {
            if (data == "") {
                this.currentAdvice = "";
                this.currentAdvisor = "";
            }
            else {
                this.currentAdvice = data["text"];
                this.currentAdvisor = data["advisor"];
            }
        });
    }
    getNewAdvice(advisor) {
        this.qp.getNewAdvice(advisor).subscribe((data) => {
            if (data === true) {
                this.ngOnInit();
            }
        });
    }
    getAdvisor() {
        return this.currentAdvisor == "1" ? "Mamka" : "Přítel";
    }
    getAdvisorImage() {
        return this.currentAdvisor == "1" ? "./assets/imgs/avatar2.png" : "./assets/imgs/avatar3.png";
    }
    adviceMother() {
        /*
        let popover = this.popoverCtrl.create('QuotePopupPage');
        popover.present({animate: true});
        popover.onDidDismiss((data) => { console.log("Shoud save somewhere: " + data.quote); });*/
    }
    adviceFriend() {
    }
};
AdvicesPage = tslib_1.__decorate([
    Component({
        selector: 'page-advices',
        styleUrls: ['advices.scss'],
        templateUrl: 'advices.html',
        providers: [AccountProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [AccountProvider, Router, QuoteProvider])
], AdvicesPage);
export { AdvicesPage };
//# sourceMappingURL=advices.js.map