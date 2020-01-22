import { LeafoInfoType } from './../../components/info-leafo/info-leafo';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LeafoInfoProvider } from '../../providers/leafo-info/leafo-info';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { MotStorageProvider } from 'src/app/providers/mot-storage/mot-storage';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-sothers',
  templateUrl: './sothers.page.html',
  styleUrls: ['./sothers.page.scss'],
})
export class SothersPage implements OnInit {

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    currentUserData: User;
    characteristic: string[] = [];
    minActive: Number = 7;
    userImage: string = "assets/imgs/avatar.png";
    user: string;

    passInput="";
    passCheckInput=""

    znameni = [
        [
            { name: "Kozoroh", image: "assets/imgs/avatar.png" },
            { name: "Vodnář", image: "assets/imgs/avatar.png" },
            { name: "Ryby", image: "assets/imgs/avatar.png" }
        ],[
            { name: "Beran", image: "assets/imgs/avatar.png" },
            { name: "Býk", image: "assets/imgs/avatar.png" },
            { name: "Blíženec", image: "assets/imgs/avatar.png" }
        ],[
            { name: "Rak", image: "assets/imgs/avatar.png" },
            { name: "Lev", image: "assets/imgs/avatar.png" },
            { name: "Panna", image: "assets/imgs/avatar.png" }
        ],[
            { name: "Váhy", image: "assets/imgs/avatar.png" },
            { name: "Štír", image: "assets/imgs/avatar.png" },
            { name: "Střelec", image: "assets/imgs/avatar.png" }
        ],
    ]

    textforbutton = "Další";
    loading;
    mediaFile;
    
    @ViewChild('slider', null) slider;
    @ViewChild('ownvideo', null) ownVideo;
    

    constructor(private router: Router,
        private route: ActivatedRoute,
        public ac: AccountProvider,
        public tC: ToastController,
        public camera: Camera,
        public loadingCtrl: LoadingController,
        public platform: Platform,
        public userService: UserProvider,
        public vc: ViewContainerRef,
        public infoLeafo: LeafoInfoProvider,
        private storage:MotStorageProvider,
        private mediaCapture : MediaCapture,
        private media : Media,
        private file : File
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
        //console.log(this.currentUserData);
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
        });
        if(this.storage.exists("video")) {
            this.storage.get("video").then(res=> {
                this.mediaFile = JSON.parse(res) || {};
            });
        } else {
            this.mediaFile = [];
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }

    private filterCols(): Array<any> {
        return this.cols.filter((col)=>col.active);
    }

    public slideToIndex(slide) {
        this.slider.slideTo(slide);
    }

    public slideToRight() {
        console.log(this.passInput, this.passCheckInput);
        this.slider.getActiveIndex().then((index) => {
            this.slider.isEnd().then((isend) => {
                //console.log(index + " is end? " + isend);
                if (isend) {
                    let array = this.filterCols();//this.userCols == this.currentCols ? null : this.currentCols;
                    //this.userCols = this.userCols == this.currentCols ? this.userCols : this.currentCols;
        
                    //if(this.isWorthUpdating(array) || true) {
                        console.log("SENDING");
                        console.log(array);
                        this.userService.updateSettings(this.currentUserData, array).subscribe(val => {
                            console.log("Updating settings message: " + val);
                            this.ac.saveLocal(this.currentUserData);
                        }, error => {
                            console.log("Updating settings message: " + error);
                        });
                    //}
                    index = 0;
        
                    this.router.navigate(["/home"]);
        
                } else {
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
        let options : CaptureVideoOptions = {
            limit: 1,
            duration: 120
        };

        this.mediaCapture.captureVideo(options).then((res:MediaFile[]) => {
            let capturedFile = res[0];
            console.log("myfile: ", capturedFile);
            let filename = capturedFile.name;
            let dir = capturedFile["localURL"].split('/');
            dir.pop();
            let fromDirectory = dir.join('/');
            let toDirectory = this.file.dataDirectory;

            this.file.copyFile(fromDirectory, filename, toDirectory, filename).then((res) => {
                //let url = res.nativeURL.replace(/^file:\/\//, '');
                this.saveFile({name: filename, size: capturedFile.size});
            });
        });

    }

    onSlideChanged() {
        this.slider.getActiveIndex().then((index) => {
            this.textforbutton = index < 4 ? "Další" : "Uložit";
        });
    }

    saveFile(file) {
        this.storage.set("video", JSON.stringify(file));
    }

    hasVideo() : boolean {
        return this.storage.exists("video");
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
                var name = val[keys[i]]["name"];
                if(this.currentUserData.getSex() == 2) {
                    var charec = name.substring(name.length - 1, name.length);
                    if(charec == 'ý')
                    name = name.substring(0, name.length - 1) + 'á';
                }
                var obj = {
                    id_ch: val[keys[i]]["id_ch"],
                    name: name,
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
                if(valU == undefined || valU == null) {
                    return;
                }
                var keysU = Object.keys(valU);
                if (keysU.length > 0) {
                    for (var j = 0; j < keysU.length; j++) {
                        var name = valU[keysU[j]]["name"];
                        if(this.currentUserData.getSex() == 2) {
                            var charec = name.substring(name.length - 1, name.length);
                            if(charec == 'ý')
                                name = name.substring(0, name.length - 1) + 'á';
                        }
                        var obj = {
                            name: name,
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

        //console.log("Is Checkbox acive: " + checkbox.active);

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
                this.infoLeafo.createAndShowLeafoBubble(this.vc, "Omlouvám se, vyskytla se chyba. Zkus to prosím později.", "Chyba", LeafoInfoType.Sad);
                //this.showToast("SET PROFILE IMAGE " + err.message);
            });
        }).catch(err => {
            this.infoLeafo.createAndShowLeafoBubble(this.vc, "Omlouvám se, vyskytla se chyba. Zkus to prosím později.", "Chyba", LeafoInfoType.Sad);
                
            console.log(err.message);
            //this.showToast("GET PICTURE " + err.message);
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
