import * as tslib_1 from "tslib";
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { InfoLeafoComponent, LeafoInfoType } from '../../components/info-leafo/info-leafo';
/*
  Generated class for the LeafoInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let LeafoInfoProvider = class LeafoInfoProvider {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.leafo = null;
    }
    createAndShowLeafoBubble(vc, text, headline = "", face = LeafoInfoType.Happy, callback1 = null, callback2 = null) {
        const b = this.getLeafoBubble(vc);
        b.setInfo(text, headline);
        b.setCallbacks(callback1, callback2);
        b.setLeafoFace(face);
        b.open();
        return b;
    }
    getLeafoBubble(vc) {
        if (this.leafo != null && !this.leafo.isUndefined())
            return this.leafo;
        const compFactory = this.componentFactoryResolver.resolveComponentFactory(InfoLeafoComponent);
        const compRef = vc.createComponent(compFactory);
        this.leafo = compRef.instance;
        return this.leafo;
    }
    getAnswers() {
        if (this.leafo == undefined || this.leafo == null)
            return null;
        return this.leafo.getAnswers();
    }
};
LeafoInfoProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ComponentFactoryResolver])
], LeafoInfoProvider);
export { LeafoInfoProvider };
//# sourceMappingURL=leafo-info.js.map