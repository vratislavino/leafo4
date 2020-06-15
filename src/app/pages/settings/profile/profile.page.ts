import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/model/UserModel';
import { Camera } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AccountProvider } from 'src/app/providers/account/account';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserProvider } from 'src/app/providers/user/user';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';
import { MotStorageProvider } from 'src/app/providers/mot-storage/mot-storage';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture/ngx';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss', '../settings.scss'],
})
export class ProfilePage implements OnInit {

  currentUserData: User;
  userImage: string = "assets/imgs/avatar.png";
  loading;
  mediaFile;
  page = 0;
  islocationvisible = false;

  cameFromRegistration: boolean;

  @ViewChild('slider', null) slider;
  znameni = [
    [
      { id: 1, name: "Kozoroh", image: "assets/imgs/avatar.png", active: false },
      { id: 2, name: "Vodnář", image: "assets/imgs/avatar.png", active: false },
      { id: 3, name: "Ryby", image: "assets/imgs/avatar.png", active: false },
      { id: 4, name: "Beran", image: "assets/imgs/avatar.png", active: false }
    ], [
      { id: 5, name: "Býk", image: "assets/imgs/avatar.png", active: false },
      { id: 6, name: "Blíženec", image: "assets/imgs/avatar.png", active: false },
      { id: 7, name: "Rak", image: "assets/imgs/avatar.png", active: false },
      { id: 8, name: "Lev", image: "assets/imgs/avatar.png", active: false }
    ], [
      { id: 9, name: "Panna", image: "assets/imgs/avatar.png", active: false },
      { id: 10, name: "Váhy", image: "assets/imgs/avatar.png", active: false },
      { id: 11, name: "Štír", image: "assets/imgs/avatar.png", active: false },
      { id: 12, name: "Střelec", image: "assets/imgs/avatar.png", active: false }
    ],
  ]

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


    const fromReg = this.route.snapshot.paramMap.get("fromRegistration");
    console.log("CAME FROM REGISTRATION: " + fromReg);
    if (fromReg == "1") {
      this.cameFromRegistration = true;
    }

    console.log("CAME FROM REGISTRATION 2 : " + this.cameFromRegistration);


    //this.loading.present();


    this.currentUserData = this.ac.getCopyOfUser();
    console.log("SIGN: " + this.currentUserData.getSign());
    for (var i = 0; i < this.znameni.length; i++) {
      for (var j = 0; j < this.znameni[i].length; j++) {
        if (this.znameni[i][j].id == this.currentUserData.getSign())
          this.znameni[i][j].active = true;
      }
    }

    this.ac.getProfileImage().then((data: string) => {
      this.userImage = data;
    });
  }


  upload(source) {

    let options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: source,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    var prof = this;

    this.camera.getPicture(options).then((imageData) => {

      //this.loading.present();
      //prof.infoLeafo.createAndShowLeafoBubble(this.vc, imageData, "Recovered image data");
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      prof.userService.setProfileImage(base64Image).subscribe(mess => {
        prof.ac.setProfileImage(base64Image).then(() => {
          prof.userImage = base64Image;
          //console.log(this.userImage);
          //this.loading.dismiss();
          prof.showToast("Profilový obrázek uložen");
        });
        prof.showToast(mess);
      }, err => {
        prof.infoLeafo.createAndShowLeafoBubble(prof.vc, err.message, "Chyba1", LeafoInfoType.Sad);
        //this.showToast("SET PROFILE IMAGE " + err.message);
      });
    }).catch(err => {
      prof.infoLeafo.createAndShowLeafoBubble(prof.vc, err.message, "Chyba2", LeafoInfoType.Sad);

      console.log(err.message);
      //this.showToast("GET PICTURE " + err.message);
    });
  }

  saveData() {

    this.userService.updateSettings(this.currentUserData).subscribe((data) => {
      this.ac.saveLocal(this.currentUserData);
      if (this.cameFromRegistration) {
        this.router.navigate(["home"]);
      } else {
        this.router.navigate(["settings", 0]);
      }
    }, (error) => {
      console.log(error);
    });
  }

  selectZnameni(zn) {
    console.log("znameni :");
    console.log(zn);
    for (let arr of this.znameni) {
      for (let obj of arr) {
        obj.active = false;
      }
    }
    var s = this.slider;
    this.currentUserData.setSign(zn.id);
    this.userService.updateSettings(this.currentUserData).subscribe((data) => {
      this.ac.saveLocal(this.currentUserData);
      setTimeout(function () {
        s.slideTo(1);
      }, 1000);
      zn.active = !zn.active;
    }, (error) => { console.log(error) });
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

  selectFromGalerie() {
    this.islocationvisible = !this.islocationvisible;
    this.upload(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  selectFromFotoaparat() {
    this.islocationvisible = !this.islocationvisible;
    this.upload(this.camera.PictureSourceType.CAMERA);
  }

  async showToast(message) {
    var alert = await this.tC.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    await alert.present();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const fromReg = parseInt(params["fromRegister"]);
      console.log(fromReg);
      this.cameFromRegistration = fromReg === 1;
    });
  }

}
