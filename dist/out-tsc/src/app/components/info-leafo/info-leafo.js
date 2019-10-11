import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * Generated class for the InfoLeafoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
let InfoLeafoComponent = class InfoLeafoComponent {
    constructor() {
        this.headline = "";
        this.faceUrl = "assets/imgs/leafo.png";
        this.leafoInfoType = LeafoInfoType.Normal;
        this.answers = [];
        this.faces = [
            "assets/imgs/leafo.png",
            "assets/imgs/leafo.png",
            "assets/imgs/leafo.png",
            "assets/imgs/aNormal.png",
            "assets/imgs/aGolden.png",
        ];
        console.log('Hello InfoLeafoComponent Component');
    }
    setInfo(info, headline) {
        this.text = info;
        if (headline != null)
            this.headline = headline;
    }
    setLeafoFace(face) {
        this.leafoInfoType = face;
        this.faceUrl = this.faces[face];
        if (this.leafoInfoType == LeafoInfoType.GoldenApple) {
            this.initText();
        }
    }
    initText() {
        this.initCompAgain();
        while (this.comp.firstChild) {
            this.comp.removeChild(this.comp.firstChild);
        }
        let t = this.text.split("***");
        for (var i = 0; i < t.length - 1; i++) {
            this.tryToCreateABreak(i, t);
            this.createPart(t[i]);
            this.createInput();
        }
        this.tryToCreateABreak(t.length - 1, t);
        this.createPart(t[t.length - 1]);
    }
    tryToCreateABreak(index, arr) {
        if (arr[index].startsWith("/n")) {
            arr[index] = arr[index].substr(2);
            this.createBreak();
        }
    }
    isUndefined() {
        return document.getElementById('leafo-info') == undefined;
    }
    callFunc(func) {
        if (func != null)
            func();
        this.close();
    }
    open() {
        let info = document.getElementById('leafo-info');
        if (info == undefined)
            return;
        info.setAttribute("style", "display: block; opacity: 1;");
        console.log(info);
        console.log("opening!");
    }
    setCallbacks(call1, call2) {
        this.callback1 = call1;
        this.callback2 = call2;
    }
    close() {
        let info = document.getElementById('leafo-info');
        if (info == undefined)
            return;
        console.log(info);
        info.setAttribute("style", "dislay:none");
        console.log("closing!");
    }
    getAnswers() {
        if (this.leafoInfoType == LeafoInfoType.RedApple)
            return null;
        let inputs = document.getElementsByClassName('part');
        console.log(inputs);
        let ans = [];
        for (var i = 0; i < inputs.length; i++) {
            ans.push(inputs[i].value);
        }
        console.log(ans);
        return ans;
    }
    initCompAgain() {
        if (this.comp == null) {
            console.log("comp was null!");
            this.comp = document.getElementById("complete");
        }
    }
    createPart(text) {
        this.initCompAgain();
        this.comp.insertAdjacentHTML('beforeend', '<span class="odst">' + text + '</span>');
        console.log("Adding " + text);
    }
    createInput() {
        this.initCompAgain();
        this.comp.insertAdjacentHTML('beforeend', '<input type="text" class="part">');
        console.log("Adding input!");
    }
    createBreak() {
        this.initCompAgain();
        this.comp.insertAdjacentHTML('beforeend', '<br>');
    }
};
InfoLeafoComponent = tslib_1.__decorate([
    Component({
        selector: 'info-leafo',
        templateUrl: 'info-leafo.html',
        styleUrls: ["info-leafo.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], InfoLeafoComponent);
export { InfoLeafoComponent };
export var LeafoInfoType;
(function (LeafoInfoType) {
    LeafoInfoType[LeafoInfoType["Sad"] = 0] = "Sad";
    LeafoInfoType[LeafoInfoType["Happy"] = 1] = "Happy";
    LeafoInfoType[LeafoInfoType["Normal"] = 2] = "Normal";
    LeafoInfoType[LeafoInfoType["RedApple"] = 3] = "RedApple";
    LeafoInfoType[LeafoInfoType["GoldenApple"] = 4] = "GoldenApple";
})(LeafoInfoType || (LeafoInfoType = {}));
//# sourceMappingURL=info-leafo.js.map