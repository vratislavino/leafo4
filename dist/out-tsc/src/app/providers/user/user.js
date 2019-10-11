import * as tslib_1 from "tslib";
import { AccountProvider } from './../account/account';
import { Injectable } from '@angular/core';
import { RequestProvider } from '../request/request';
let UserProvider = class UserProvider {
    constructor(apiRequest, ac) {
        this.ac = ac;
        this.apiRequest = apiRequest;
    }
    auth(username, password) {
        return this.apiRequest.post('/userApi.php', {
            'email': username,
            'pass': password
        });
    }
    downloadImage() {
        return this.apiRequest.post('/downloadImage.php', {
            id_u: this.ac.getUserId()
        });
    }
    test() {
        return this.apiRequest.post('/testfunc.php', {
            id_u: this.ac.getUserId()
        });
    }
    register(email, pass, passA, username, fName, sName, addressing, sign, sex) {
        return this.apiRequest.post('/registerApi.php', {
            email: email,
            pass: pass,
            passA: passA,
            username: username,
            firstname: fName,
            surname: sName,
            addressing: addressing,
            sign: sign,
            sex: sex
        });
    }
    updateSettings(data, characteristics) {
        //public updateSettings(firstname: string, email: string, addressing: string, sign: number, sex: number)
        return this.apiRequest.post('/updateSettingsApi.php', {
            id_u: this.ac.getUserId(),
            firstname: data.firstname,
            email: data.email,
            addressing: data.addressing,
            sign: data.sign,
            sex: data.sex,
            characteristics: characteristics
        });
    }
    setProfileImage(base64Image) {
        return this.apiRequest.post('/uploadImage.php', {
            id_u: this.ac.getUserId(),
            data: base64Image
        });
    }
    setWatering(watering) {
        return this.apiRequest.post('/setCustomWatering.php', {
            'id_u': this.ac.getUserId(),
            'num': watering
        });
    }
    getTreeState() {
        return this.apiRequest.post('/getTreeState.php', {
            id_u: this.ac.getUserId()
        });
    }
    setTreeState() {
        return this.apiRequest.post('/setStates.php', {
            id_u: this.ac.getUserId()
        });
    }
    getCharacteristics() {
        return this.apiRequest.post('/getCharacteristics.php', {
            'user_id': this.ac.getUserId()
        });
    }
    getAllCharacteristics() {
        return this.apiRequest.post('/getAllCharacteristics.php', {});
    }
    getDepressionData() {
        return this.apiRequest.post('/getDepression.php', {
            id_u: this.ac.getUserId()
        });
    }
    getLastDepression() {
        return this.apiRequest.post('/getLastDepression.php', {
            id_u: this.ac.getUserId()
        });
    }
    getOvulationData() {
        console.log(this.ac.getUserId());
        return this.apiRequest.post('/getOvulationData.php', {
            id_u: this.ac.getUserId()
        });
    }
    setOvulationData(date, length, lasting) {
        return this.apiRequest.post('/setOvulationData.php', {
            id_u: this.ac.getUserId(),
            date: date,
            length: length,
            lasting: lasting
        });
    }
};
UserProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [RequestProvider, AccountProvider])
], UserProvider);
export { UserProvider };
//# sourceMappingURL=user.js.map