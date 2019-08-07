import { LeafoInfoType } from './../../components/info-leafo/info-leafo';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { LeafoInfoProvider } from '../../providers/leafo-info/leafo-info';
import { Router } from '@angular/router';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
    providers: [AccountProvider]
})
export class SettingsPage {

    currentUserData: User;
    characteristic: string[] = [];
    minActive: Number = 7;
    nextText: string = "Další";
    userImage: string = "assets/imgs/avatar.png";
    user: string;

    loading;

    @ViewChild('slider', null) slider;

    constructor(private router: Router,
        public ac: AccountProvider,
        public tC: ToastController,
        public camera: Camera,
        public loadingCtrl: LoadingController,
        public platform: Platform,
        public userService: UserProvider,
        public vc: ViewContainerRef,
        public infoLeafo: LeafoInfoProvider
        ) {

        this.loading = this.loadingCtrl.create({
            spinner: 'crescent'
        });
        this.loading.present();
        this.currentUserData = AccountProvider.user.copy();
        this.ac.getProfileImage().then((data: string) => {
            this.userImage = data;
        });
        console.log(this.currentUserData);
        this.fillArray();
        this.loading.dismiss();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }

    private isWorthUpdating(characteristics) : boolean {
        return this.currentUserData.firstname != AccountProvider.user.getFirstName() ||
        this.currentUserData.email != AccountProvider.user.getEmail() ||
        this.currentUserData.addressing != AccountProvider.user.getAddressing() ||
        this.currentUserData.sex != AccountProvider.user.getSex() ||
        this.currentUserData.sign != AccountProvider.user.getSign() ||
			characteristics != null
    }

    private filterCols(): Array<any> {
        return this.cols.filter((col)=>col.active);
    }

    public slideRight() {
        let index: number = this.slider.getActiveIndex();
        if (this.slider.isEnd()) {
            let array = this.filterCols();//this.userCols == this.currentCols ? null : this.currentCols;
            //this.userCols = this.userCols == this.currentCols ? this.userCols : this.currentCols;

            if(this.isWorthUpdating(array) || true) {
                console.log("SENDING");
                console.log(array);
                this.userService.updateSettings(this.currentUserData, array).subscribe(val => {
                    console.log("Updating settings message: " + val);
                    AccountProvider.user = this.currentUserData;
                    this.ac.saveLocal();
                }, error => {
                    console.log("Updating settings message: " + error);
                });
            }
            index = 0;
            this.nextText = "Další";


            this.router.navigate(["/home"]);

        } else {
            index++;
        }
        this.slider.slideTo(index);
    }

    justChanged() {
        if (this.slider.isEnd()) {
            this.nextText = "Uložit";
        } else {
            this.nextText = "Další";
        }
    }

    vysledek = [];
    temp = [];
    cols = [];
    userCols = [];
    currentCols = [];

    fillArray() {
        this.userService.getAllCharacteristics().subscribe((val) => {
            var keys = Object.keys(val);
            this.cols = [];
            for (var i = 0; i < keys.length; i++) {
                var obj = {
                    name: val[keys[i]]["name"],
                    active: false
                };
                this.cols.push(obj);
            }
            console.log("HERE!");
            console.log(this.cols);
            this.userService.getCharacteristics().subscribe((valU) => {
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
                    console.log(this.userCols);
                    for (var i = 0; i < this.cols.length; i++) {
                        if (i % 3 == 0 && i !== 0) {
                            this.vysledek.push(this.temp);
                            this.temp = [];
                        }
                        this.temp.push(this.cols[i]);
                    }
                }
            }, (err) => {
                console.log("ErrorUserArray: " + err);
                console.log(JSON.stringify(err));
            });
        }, (err) => {
            console.log("ErrorArray: " + err);
            console.log(JSON.stringify(err));
        });
    }

    onInput(type, value) {
        if (type == "email") {
            this.currentUserData.email = value;
        } else if (type == "firstname") {
            this.currentUserData.firstname = value;
        } else if (type == "addressing") {
            this.currentUserData.addressing = value;
        }
    }

    getCountOfActive() {
        var count = 0;
        this.cols.forEach(btn => {
            if(btn.active)
            count++;
        });
        return count;
    }

    updateBckg(checkbox, isStart = false) {

        if(checkbox.active) {
            checkbox.active = !checkbox.active;
            return;
        }
        
        if(!checkbox.active){
            if(this.getCountOfActive() >= this.minActive)
                this.infoLeafo.createAndShowLeafoBubble(this.vc, "Vlastníte již maximum charakteristik", "Chyba", LeafoInfoType.Normal);
            else
                checkbox.active = !checkbox.active;
        }

        /*
        if (!checkbox.active) {
            if (this.currentCols.length < min) {
                this.currentCols.push(checkbox);
                checkbox.active = !checkbox.active;
                for (var i = 0; i < this.userCols.length; i++) {
                    console.log(this.userCols[i]);
                }
                if (!isStart) {
                    this.userCols.push(checkbox);
                }
            } else {
                this.showToast("Vlastníte již maximum charakteristických typů.");
            }
            console.log(this.currentCols.length);
        } else {
            this.currentCols.splice(this.currentCols.findIndex(v => v.name === checkbox.name), 1);
            checkbox.active = !checkbox.active;
        }*/
    }

    uploadForMobile() {
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
                    this.userImage = base64Image
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
/*
    uploadForDesktop() {
        let imageData = this.img;
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.userService.setProfileImage(base64Image).subscribe(mess => {
            this.ac.setProfileImage(base64Image).then(() =>
                this.userImage = base64Image
            );
            console.log(mess);
            this.showToast(mess);
        }, err => {
            console.log(err);
            this.showToast(err);
        });
    }*/

    upload() {
        //console.log(this.platform.is("android"));
        //if (this.platform.is("android")) {
            //this.uploadForDesktop();
        //} else {
            this.uploadForMobile();
        //}
    }

    async showToast(message) {
        var alert = await this.tC.create({
            message: message,
            duration: 3000,
            position: "bottom"
        });
        await alert.present();
    }
}