import { LeafoInfoType } from './../../components/info-leafo/info-leafo';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { LeafoInfoProvider } from '../../providers/leafo-info/leafo-info';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
    styleUrls: ['settings.scss'],
    providers: [AccountProvider]
})
export class SettingsPage implements OnInit {

    currentUserData: User;
    characteristic: string[] = [];
    minActive: Number = 7;
    nextText: string = "Další";
    userImage: string = "assets/imgs/avatar.png";
    user: string;

    loading;

    @ViewChild('slider', null) slider;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public ac: AccountProvider,
        public tC: ToastController,
        public camera: Camera,
        public loadingCtrl: LoadingController,
        public platform: Platform,
        public userService: UserProvider,
        public vc: ViewContainerRef,
        public infoLeafo: LeafoInfoProvider
        ) {

            

        /*
            const fromReg = this.route.snapshot.paramMap.get("fromRegistration");
            if(!(fromReg == undefined || fromReg == "false")) {
                
            }    */


        //this.loading.present();
        this.currentUserData = this.ac.getCopyOfUser();

        this.ac.getProfileImage().then((data: string) => {
            this.userImage = data;
        });
        console.log(this.currentUserData);
        this.fillArray();
        //this.loading.dismiss();
    }

    ngOnInit() {
        this.route.params.subscribe((params:Params) => {
            const fromReg = parseInt(params["fromRegister"]);
            console.log(fromReg);
            if(fromReg===1) {
                console.log("slideRight called twice");
                this.slideToIndex(3);
            }
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }

    private isWorthUpdating(characteristics) : boolean {
        var user = this.ac.getCopyOfUser();

        return this.currentUserData.firstname != user.getFirstName() ||
        this.currentUserData.email != user.getEmail() ||
        this.currentUserData.addressing != user.getAddressing() ||
        this.currentUserData.sex != user.getSex() ||
        this.currentUserData.sign != user.getSign() ||
			characteristics != null
    }

    private filterCols(): Array<any> {
        return this.cols.filter((col)=>col.active);
    }

    public slideToIndex(slide) {
        this.slider.slideTo(slide);
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
                    this.ac.saveLocal(this.currentUserData);
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

    getNextButtonText() {
        return this.slider.isEnd() ? "Uložit" : "Další";
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
                    id_ch: val[keys[i]]["id_ch"],
                    name: val[keys[i]]["name"],
                    active: false
                };
                this.cols.push(obj);
            }
            console.log("Creattiong buttons!");
            for (var i = 0; i < this.cols.length; i++) {
                if (i % 3 == 0 && i !== 0) {
                    this.vysledek.push(this.temp);
                    this.temp = [];
                }
                this.temp.push(this.cols[i]);
            }

            console.log(this.vysledek);

            this.userService.getCharacteristics().subscribe((valU) => {
                if(valU == undefined || valU == null) {
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
                    console.log(this.userCols);
                    
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

        console.log("Is Checkbox acive: " + checkbox.active);

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

    async showToast(message) {
        var alert = await this.tC.create({
            message: message,
            duration: 3000,
            position: "bottom"
        });
        await alert.present();
    }
}