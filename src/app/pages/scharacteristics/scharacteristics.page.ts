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
  selector: 'app-scharacteristics',
  templateUrl: './scharacteristics.page.html',
  styleUrls: ['./scharacteristics.page.scss'],
})
export class ScharacteristicsPage implements OnInit {
  currentUserData: User;
  characteristic: string[] = [];
  minActive: Number = 7;

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

          
      this.currentUserData = this.ac.getCopyOfUser();

      this.fillArray();
  }

  ngOnInit() {

  }

  private filterCols(): Array<any> {
      return this.cols.filter((col)=>col.active);
  }

  public save() {
    let array = this.filterCols();//this.userCols == this.currentCols ? null : this.currentCols;
    //this.userCols = this.userCols == this.currentCols ? this.userCols : this.currentCols;

    if(/*this.isWorthUpdating(array) || */true) {
        console.log("SENDING");
        console.log(array);
        this.userService.updateSettings(this.currentUserData, array).subscribe(val => {
            console.log("Updating settings message: " + val);
            this.ac.saveLocal(this.currentUserData);
        }, error => {
            console.log("Updating settings message: " + error);
        });
    }

    this.router.navigate(["/home"]);
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

  async showToast(message) {
      var alert = await this.tC.create({
          message: message,
          duration: 3000,
          position: "bottom"
      });
      await alert.present();
  }

}
