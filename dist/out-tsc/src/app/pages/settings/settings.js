import * as tslib_1 from "tslib";
import { LeafoInfoType } from './../../components/info-leafo/info-leafo';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { Camera } from '@ionic-native/camera/ngx';
import { LeafoInfoProvider } from '../../providers/leafo-info/leafo-info';
import { Router, ActivatedRoute } from '@angular/router';
import { MotStorageProvider } from 'src/app/providers/mot-storage/mot-storage';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let SettingsPage = class SettingsPage {
    constructor(router, route, ac, tC, camera, loadingCtrl, platform, userService, vc, infoLeafo, storage, mediaCapture, media, file) {
        /*
            const fromReg = this.route.snapshot.paramMap.get("fromRegistration");
            if(!(fromReg == undefined || fromReg == "false")) {
                
            }    */
        this.router = router;
        this.route = route;
        this.ac = ac;
        this.tC = tC;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.userService = userService;
        this.vc = vc;
        this.infoLeafo = infoLeafo;
        this.storage = storage;
        this.mediaCapture = mediaCapture;
        this.media = media;
        this.file = file;
        this.characteristic = [];
        this.minActive = 7;
        this.userImage = "assets/imgs/avatar.png";
        this.textforbutton = "Další";
        this.vysledek = [];
        this.temp = [];
        this.cols = [];
        this.userCols = [];
        this.currentCols = [];
        //this.loading.present();
        this.currentUserData = this.ac.getCopyOfUser();
        this.ac.getProfileImage().then((data) => {
            this.userImage = data;
        });
        //console.log(this.currentUserData);
        this.fillArray();
        //this.loading.dismiss();
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            const fromReg = parseInt(params["fromRegister"]);
            console.log(fromReg);
            if (fromReg === 1) {
                console.log("slideRight called twice");
                this.slideToIndex(3);
            }
        });
        if (this.storage.exists("video")) {
            this.storage.get("video").then(res => {
                this.mediaFile = JSON.parse(res) || {};
            });
        }
        else {
            this.mediaFile = [];
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }
    isWorthUpdating(characteristics) {
        var user = this.ac.getCopyOfUser();
        return this.currentUserData.firstname != user.getFirstName() ||
            this.currentUserData.email != user.getEmail() ||
            this.currentUserData.addressing != user.getAddressing() ||
            this.currentUserData.sex != user.getSex() ||
            this.currentUserData.sign != user.getSign() ||
            characteristics != null;
    }
    filterCols() {
        return this.cols.filter((col) => col.active);
    }
    slideToIndex(slide) {
        this.slider.slideTo(slide);
    }
    slideToRight() {
        this.slider.getActiveIndex().then((index) => {
            this.slider.isEnd().then((isend) => {
                //console.log(index + " is end? " + isend);
                if (isend) {
                    let array = this.filterCols(); //this.userCols == this.currentCols ? null : this.currentCols;
                    //this.userCols = this.userCols == this.currentCols ? this.userCols : this.currentCols;
                    if (this.isWorthUpdating(array) || true) {
                        console.log("SENDING");
                        console.log(array);
                        this.userService.updateSettings(this.currentUserData, array).subscribe(val => {
                            console.log("Updating settings message: " + val);
                            this.ac.saveLocal(this.currentUserData);
                        }, error => {
                            console.log("Updating settings message: " + error);
                        });
                    }
                    index = 0;
                    this.router.navigate(["/home"]);
                }
                else {
                    index++;
                    this.slider.slideTo(index);
                }
                //console.log(this.slider.slideTo(index));
            });
        });
    }
    useDefaultVideo() {
    }
    playVideo() {
        let path = this.file.dataDirectory + this.mediaFile.name;
        let url = path.replace(/^file:\/\//, '');
        let video = this.ownVideo.nativeElement;
        video.src = url;
        video.play();
    }
    captureVideo() {
        let options = {
            limit: 1,
            duration: 120
        };
        this.mediaCapture.captureVideo(options).then((res) => {
            let capturedFile = res[0];
            console.log("myfile: ", capturedFile);
            let filename = capturedFile.name;
            let dir = capturedFile["localURL"].split('/');
            dir.pop();
            let fromDirectory = dir.join('/');
            let toDirectory = this.file.dataDirectory;
            this.file.copyFile(fromDirectory, filename, toDirectory, filename).then((res) => {
                //let url = res.nativeURL.replace(/^file:\/\//, '');
                this.saveFile({ name: filename, size: capturedFile.size });
            });
        });
    }
    onSlideChanged() {
        this.slider.getActiveIndex().then((index) => {
            this.textforbutton = index < 5 ? "Další" : "Uložit";
        });
    }
    saveFile(file) {
        this.storage.set("video", JSON.stringify(file));
    }
    hasVideo() {
        return this.storage.exists("video");
    }
    fillArray() {
        this.userService.getAllCharacteristics().subscribe((val) => {
            var keys = Object.keys(val);
            this.cols = [];
            for (var i = 0; i < keys.length; i++) {
                var obj = {
                    id_ch: val[keys[i]]["id_ch"],
                    name: val[keys[i]]["name"],
                    active: false
                };
                this.cols.push(obj);
            }
            //console.log("Creattiong buttons!");
            for (var i = 0; i < this.cols.length; i++) {
                if (i % 3 == 0 && i !== 0) {
                    this.vysledek.push(this.temp);
                    this.temp = [];
                }
                this.temp.push(this.cols[i]);
            }
            //console.log(this.vysledek);
            this.userService.getCharacteristics().subscribe((valU) => {
                if (valU == undefined || valU == null) {
                    return;
                }
                var keysU = Object.keys(valU);
                if (keysU.length > 0) {
                    for (var j = 0; j < keysU.length; j++) {
                        var obj = {
                            name: valU[keysU[j]]["name"],
                            active: false
                        };
                        this.userCols.push(obj);
                        for (var x = 0; x < this.cols.length; x++) {
                            if (this.cols[x].name == this.userCols[j].name) {
                                this.updateBckg(this.cols[x], true);
                            }
                        }
                    }
                    //console.log(this.userCols);
                }
            }, (err) => {
                console.log("ErrorUserArray: " + err);
                console.log(err);
            });
        }, (err) => {
            console.log("ErrorArray: " + err);
            console.log(err);
        });
    }
    onInput(type, value) {
        if (type == "email") {
            this.currentUserData.email = value;
        }
        else if (type == "firstname") {
            this.currentUserData.firstname = value;
        }
        else if (type == "addressing") {
            this.currentUserData.addressing = value;
        }
    }
    getCountOfActive() {
        var count = 0;
        this.cols.forEach(btn => {
            if (btn.active)
                count++;
        });
        return count;
    }
    updateBckg(checkbox, isStart = false) {
        //console.log("Is Checkbox acive: " + checkbox.active);
        if (checkbox.active) {
            checkbox.active = !checkbox.active;
            return;
        }
        if (!checkbox.active) {
            if (this.getCountOfActive() >= this.minActive)
                this.infoLeafo.createAndShowLeafoBubble(this.vc, "Vlastníte již maximum charakteristik", "Chyba", LeafoInfoType.Normal);
            else
                checkbox.active = !checkbox.active;
        }
    }
    upload() {
        let options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            this.loading.present();
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.userService.setProfileImage(base64Image).subscribe(mess => {
                this.ac.setProfileImage(base64Image).then(() => {
                    this.userImage = base64Image;
                    //console.log(this.userImage);
                    this.loading.dismiss();
                    this.showToast("Profilový obrázek uložen");
                });
                this.showToast(mess);
            }, err => {
                this.showToast(err.message);
            });
        }).catch(err => {
            console.log(err.message);
            this.showToast(err.message);
        });
    }
    showToast(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var alert = yield this.tC.create({
                message: message,
                duration: 3000,
                position: "bottom"
            });
            yield alert.present();
        });
    }
};
tslib_1.__decorate([
    ViewChild('slider', null),
    tslib_1.__metadata("design:type", Object)
], SettingsPage.prototype, "slider", void 0);
tslib_1.__decorate([
    ViewChild('ownvideo', null),
    tslib_1.__metadata("design:type", Object)
], SettingsPage.prototype, "ownVideo", void 0);
SettingsPage = tslib_1.__decorate([
    Component({
        selector: 'page-settings',
        templateUrl: 'settings.html',
        styleUrls: ['settings.scss'],
        providers: [AccountProvider]
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        ActivatedRoute,
        AccountProvider,
        ToastController,
        Camera,
        LoadingController,
        Platform,
        UserProvider,
        ViewContainerRef,
        LeafoInfoProvider,
        MotStorageProvider,
        MediaCapture,
        Media,
        File])
], SettingsPage);
export { SettingsPage };
//# sourceMappingURL=settings.js.map