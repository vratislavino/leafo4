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

  @ViewChild('slider', null) slider;
  znameni = [
    [
      { name: "Kozoroh", image: "assets/imgs/avatar.png" },
      { name: "Vodnář", image: "assets/imgs/avatar.png" },
      { name: "Ryby", image: "assets/imgs/avatar.png" }
    ], [
      { name: "Beran", image: "assets/imgs/avatar.png" },
      { name: "Býk", image: "assets/imgs/avatar.png" },
      { name: "Blíženec", image: "assets/imgs/avatar.png" }
    ], [
      { name: "Rak", image: "assets/imgs/avatar.png" },
      { name: "Lev", image: "assets/imgs/avatar.png" },
      { name: "Panna", image: "assets/imgs/avatar.png" }
    ], [
      { name: "Váhy", image: "assets/imgs/avatar.png" },
      { name: "Štír", image: "assets/imgs/avatar.png" },
      { name: "Střelec", image: "assets/imgs/avatar.png" }
    ],
  ]

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



    /*
        const fromReg = this.route.snapshot.paramMap.get("fromRegistration");
        if(!(fromReg == undefined || fromReg == "false")) {
            
        }    */


    //this.loading.present();
    this.currentUserData = this.ac.getCopyOfUser();

    this.ac.getProfileImage().then((data: string) => {
      this.userImage = data;
    });
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

  saveData() {

  }

  selectZnameni(znameni) {
    console.log("znameni :");
    console.log(znameni);
    this.page = 1;
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

  async get

  async showToast(message) {
    var alert = await this.tC.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
