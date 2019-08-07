import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  loc : LocalNotifications;

  constructor(private localNotif : LocalNotifications) {
    this.loc = localNotif;
  }

  


  setUpNotifications() {
    this.loc.hasPermission().then(()=> {
      console.log("ok");
    });
    //if(this.localNotif.hasPermission())

    //console.log(this.localNotif.getDefaults());
    
    /*console.log("setting up notifications");
    LocalNotifications.schedule([{
      id: 1,
      title: "Testovací notifikace",
      text: "THIS IS A TEST!",
      sound: "file://sound.mp3",
      icon: "../assets/imgs/leafo.png",
      led: "FF0000",
      trigger: {
        at: new Date(new Date().getTime() + 1000*10)
      }
    }]);*/
  }

  removeNotifications() {
    console.log("removing notifications");
  }

}
