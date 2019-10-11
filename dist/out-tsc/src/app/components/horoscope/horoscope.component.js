import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let HoroscopeComponent = class HoroscopeComponent {
    constructor() {
        this.horoscope = this.horoscopeObj;
    }
    ngOnInit() { }
};
tslib_1.__decorate([
    Input('horoscopeObj'),
    tslib_1.__metadata("design:type", Object)
], HoroscopeComponent.prototype, "horoscopeObj", void 0);
HoroscopeComponent = tslib_1.__decorate([
    Component({
        selector: 'horoscope',
        templateUrl: './horoscope.component.html',
        styleUrls: ['./horoscope.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], HoroscopeComponent);
export { HoroscopeComponent };
//# sourceMappingURL=horoscope.component.js.map