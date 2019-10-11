import * as tslib_1 from "tslib";
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { QuoteProvider } from '../../providers/quote/quote';
import { AccountProvider } from '../../providers/account/account';
let ProfilePage = class ProfilePage {
    constructor(quoteProvider, ac, loadingCtrl, userService) {
        //this.presentLoading().then();
        this.quoteProvider = quoteProvider;
        this.ac = ac;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.horoscope = {};
        this.photo = "assets/imgs/avatar.png";
        this.level = 0;
        this.diffDates = 1000;
        this.depkaActive = false;
        this.getUsername();
        this.getQuotes();
        this.getPhoto();
        this.initDepka();
    }
    initDepka() {
        this.userService.getLastDepression().subscribe((data) => {
            const date = data["date"];
            if (date != undefined) {
                let dat = new Date(date);
                let today = new Date();
                let timeDiff = today.getTime() - dat.getTime();
                this.diffDates = Math.ceil(timeDiff / (1000 * 3600 * 24));
                console.log(this.diffDates);
            }
            else {
                console.error("date is undefined!");
            }
        }, (err) => {
            console.error(err);
        });
    }
    getDepkaText() {
        if (this.diffDates > 30) {
            return 'DEPKA';
        }
        else {
            return `DEPKA za ${30 - this.diffDates} dní`;
        }
    }
    depkaClick() {
        console.log("clicked");
    }
    getQuotes() {
        this.quoteProvider.getProfileQuotes(2).subscribe((data) => {
            this.quotes = [];
            var keys = Object.keys(data);
            keys.forEach((key) => {
                var quoteObj = data[key];
                if (quoteObj["id_q"] == undefined) {
                    this.horoscope = quoteObj;
                }
                else {
                    var qm = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["author"], quoteObj["faved"]).complete(this.ac.getAddressing());
                    this.quotes.push(qm);
                }
            });
            this.dismissLoading();
        }, (err) => {
            console.log("Nejsou žádné výsledky!");
            this.dismissLoading();
        });
    }
    getPhoto() {
        this.ac.getProfileImage().then((data) => {
            this.photo = data;
        }).catch((defPath) => {
            this.userService.downloadImage().subscribe(data => {
                this.ac.setProfileImage(data);
                this.photo = data;
            }, error => {
                this.photo = defPath;
                console.log("Nastala chyba při vybírání profilové fotky. Error: ");
                console.log(error);
            });
        });
    }
    dismissLoading() {
        if (this.loading != undefined)
            this.loading.dismiss();
    }
    presentLoading() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.loading = yield this.loadingCtrl.create({
                spinner: 'crescent'
            });
            yield this.loading.present();
        });
    }
    ionViewDidEnter() {
        //this.presentLoading();
    }
    getUsername() {
        var data = this.ac.getAuthData();
        this.username = data.username;
        this.level = parseInt(data.level + 1);
    }
};
ProfilePage = tslib_1.__decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html',
        styleUrls: ['profile.scss'],
        providers: [AccountProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [QuoteProvider,
        AccountProvider,
        LoadingController,
        UserProvider])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map