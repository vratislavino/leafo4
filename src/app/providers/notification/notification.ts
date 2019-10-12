import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  idsForQuotes = [];
  idsForHoroscopes = [];
  idsForRating = [];
  idsForMondays = [];

  constructor(private localNotif : LocalNotifications) {
    this.localNotif = localNotif;
  }

  setUpNotifications() {
    this.localNotif.hasPermission().then(()=> {
      this.planAll();
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
      led: "00FF00",
      trigger: {
        at: new Date(new Date().getTime() + 1000*10)
      }
    }]);*/
  }

  planAll() {
    
  }

  planHoroscope() {
    this.localNotif.hasPermission().then(() => {
      //this.localNotif.schedule
    });
  }

  private removeNotifs(ids: Array<number>) {
    this.localNotif.clear(ids);
  }

  private removeQuoteNotifs() {
    this.removeNotifs(this.idsForQuotes);
  }

  private removeHoroscopeNotifs() {
    this.removeNotifs(this.idsForHoroscopes);
  }

  private removeRatingNotifs() {
    this.removeNotifs(this.idsForRating);
  }

  private removeMondaysNotifs() {
    this.removeNotifs(this.idsForMondays);
  }

  

}
