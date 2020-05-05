import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  idsForQuotes = [{ id: 1, days: 1 }, { id: 2, days: 2 }, { id: 3, days: 3 }, { id: 4, days: 5 }];
  idsForHoroscopes = [{ id: 10, days: 10 }];
  idsForRating = [{ id: 20, days: 1 }, { id: 21, days: 2 }, { id: 22, days: 3 }, { id: 23, days: 5 }];
  idsForMondays = [];

  constructor(private localNotif: LocalNotifications) {
    this.localNotif = localNotif;
  }

  replanRatingNotifications() {
    this.localNotif.hasPermission().then(() => {
      this.localNotif.clear(this.idsForRating.map(x=>x.id)).then(() => {

        let arr = [];

        var d = new Date();
        d.setHours(18);
        d.setMinutes(0);
        d.setSeconds(0);

        for (var i = 0; i < this.idsForRating.length; i++) {


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
    });
  }

  replanUserNotifications(userDefined) {

    this.localNotif.hasPermission().then(() => {

      this.localNotif.getScheduledIds().then((ids) => {
        let myids = [];
        for (var i = 0; i < ids.length; i++) {
          if (ids[i] >= 100) {
            myids.push(ids[i]);
          }
        }
        this.localNotif.clear(myids).then(() => {

          let notifs = [];
          for (var i = 0; i < userDefined.length; i++) {
            var ymd = userDefined[i].date.split(" ")[0].split("-");
            var hms = userDefined[i].time.split(":");

            var d = new Date(ymd[0], ymd[1] - 1, ymd[2], hms[0], hms[1], hms[2]);
            notifs.push({
              id: 100 + userDefined[i].id_n,
              title: "Leafo připomíná!",
              text: userDefined[i].text,
              sound: "file://sound.mp3",
              icon: "../assets/imgs/leafo.png",
              led: "00FF00",
              trigger: {
                at: d
              }
            });
          }
        });
      });
    });
  }

  planHoroscope() {
    this.localNotif.hasPermission().then(() => {
      //this.localNotif.schedule
    });
  }

  private removeNotifs(ids: Array<object>) {
    console.log("-- REMOVING NOTIFICATIONS --")
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
