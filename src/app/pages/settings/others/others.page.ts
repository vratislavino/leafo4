import { LeafoInfoType } from './../../../components/info-leafo/info-leafo';
import { UserProvider } from './../../../providers/user/user';
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../../providers/account/account';
import { User } from '../../../model/UserModel';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LeafoInfoProvider } from '../../../providers/leafo-info/leafo-info';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { count } from 'rxjs/operators';
import { MotStorageProvider } from '../../../providers/mot-storage/mot-storage';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  loading;
  mediaFile;
  
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
    private file : File) { }

  ngOnInit() {
    if(this.storage.exists("video")) {
      this.storage.get("video").then(res=> {
          this.mediaFile = JSON.parse(res) || {};
      });
  } else {
      this.mediaFile = [];
  }
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
              this.infoLeafo.createAndShowLeafoBubble(this.vc, "File saved! " + filename + "(" + capturedFile.size + ")", "Done");
          });
      }, (err) => {
          this.infoLeafo.createAndShowLeafoBubble(this.vc, err, "Error");
      });

  }

  saveFile(file) {
      this.storage.set("video", JSON.stringify(file));
  }

  hasVideo() : boolean {
      return this.storage.exists("video");
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
