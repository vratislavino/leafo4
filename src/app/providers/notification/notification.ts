import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  idsForQuotes = [{id: 1, days: 1},{id: 2, days: 2},{id: 3, days: 3},{id: 4, days: 5}];
  idsForHoroscopes = [{id: 10, days: 10}];
  idsForRating = [{id: 20, days: 1},{id: 21, days: 2},{id: 22, days: 3},{id: 23, days: 5}];
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

  planDayRating() {
    this.localNotif.hasPermission().then(() => {


      this.removeHoroscopeNotifs();
      let arr = [];
      

      var d = new Date();
      d.setHours(18);
      d.setMinutes(0);
      d.setSeconds(0);

      for(var i = 0; i < this.idsForRating.length; i++) {


        var notif = {
          id: this.idsForRating[i].id,
          title: "Připomenutí!",
          text: "Nezapomeň dnes ohodnotit den!",
          sound: "file://sound.mp3",
          icon: "../assets/imgs/leafo.png",
          led: "00FF00",
          trigger: {
            at: new Date(d.getTime() + this.idsForRating[i].days * 24 * 60 * 60 * 1000)
          }
        }

        arr.push(notif);
      }

      this.localNotif.schedule(arr);
    });
  }

  planHoroscope() {
    this.localNotif.hasPermission().then(() => {
      //this.localNotif.schedule
    });
  }

  private removeNotifs(ids: Array<object>) {
    var idss = ids.map(a => a["id"]);
    console.log(idss);
    this.localNotif.clear(idss);
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
