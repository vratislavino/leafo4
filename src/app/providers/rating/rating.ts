import { AccountProvider } from './../account/account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { D } from '../../../D';
import { RequestProvider } from '../request/request';
import { Observable } from 'rxjs';

@Injectable()
export class RatingProvider { 

  private apiRequest: RequestProvider;
  
  constructor(apiRequest: RequestProvider, private ac: AccountProvider) {
		this.apiRequest = apiRequest;
	}

  getApplesForCurrentTree() {
    return this.apiRequest.post(
      '/getApples.php', {
        id_u: this.ac.getUserId()
      });
  }

  getYearNotifications() {
    return this.apiRequest.post(
      '/getYearNotifications.php', {
        id_u: this.ac.getUserId()
      }
    );
  }

  collectApple(appleId, answers) {
    return this.apiRequest.post(
      '/collectApple.php', {
        id_u: this.ac.getUserId(),
        id_da: appleId,
        answers: answers 
      })
  }

  getDayData(date, ratingOnly) {
    return this.apiRequest.post(
      '/getRatings.php', {
        id_u: this.ac.getUserId(),
        startDate: date,
        endDate: date,
        ratingOnly: ratingOnly
      
    });
  }

  getWeekData(date, ratingOnly):Observable<{}> {
    let startDate = new Date(date);
    let endDate = new Date(date);
    startDate=D.addWeek(startDate,-1);

    return this.apiRequest.post(
      '/getRatings.php', {
        id_u: this.ac.getUserId(),
        startDate: D.toKeyDate(startDate),
        endDate: D.toKeyDate(endDate),
        ratingOnly: ratingOnly
      });
  }

getMonthDataByMoment(start, end, ratingOnly):Observable<{}> {
  return this.apiRequest.post(
    '/getRatings.php', {
      id_u: this.ac.getUserId(),
      startDate: start,
      endDate: end,
      ratingOnly: ratingOnly
  });
} 

  getMonthData(date, ratingOnly):Observable<{}> {

    let startDate = new Date(date);
    let endDate = new Date(date);
    startDate.setDate(1);
    endDate.setDate(D.getDaysInMonth(endDate)); 

    return this.apiRequest.post(
      '/getRatings.php', {
        id_u: this.ac.getUserId(),
        startDate: D.toKeyDate(startDate),
        endDate: D.toKeyDate(endDate),
        ratingOnly: ratingOnly
    });
  }

  addNotification(date, time, text):Observable<{}> {
    return this.apiRequest.post(
      '/addNotification.php', {
        id_u: this.ac.getUserId(),
        date: date,
        time: time,
        text: text
      });
  }

  addNote(date, text, icon="star"):Observable<{}> {
    return this.apiRequest.post(
      '/addNote.php', {
        id_u: this.ac.getUserId(),
        date: date,
        text: text,
        icon: icon
    });
  }

  sendReview(text): Observable<{}> {
    return this.apiRequest.post('/setReview.php', {
      id_u: this.ac.getUserId(),
      text: text
    });
  }

  setDayReview(date, rating): Observable<{}>{

    /*
    Přidat podmínku k volání!
    if(new Date(date + " 0:0") <= new Date()) {
        callThisFunc()
    */
   console.log(date + " : " + rating);
    return this.apiRequest.post(
      '/setRatings.php', {
        id_u: this.ac.getUserId(),
        date: date,
        rating: rating
      });
  }
/*
  sendChangeRequest(postData) { 

    return this.apiRequest.post(
      'setRatings.php', postData);
*/
    /*
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"
        })
      }

      var url = "https://api.occamy.cz/setRatings.php";
      this.http.post(url, JSON.stringify(postData), httpOptions)
        .subscribe(data => {

          console.log(data);
          if(data["Error"] != undefined) {
            reject(data["Error"]);
            return;
          }
          
          resolve(data);
        }, error=> {
          let str = "Error while attempting to set review for " + postData.date;
          console.error(str);
          console.log(error);
          reject(str);
        })
    });*/
 // }
/*
  sendRequest(postData) {
    //return new Promise((resolve, reject) => {
      
      return this.apiRequest.post(
        '/getRatings.php', postData);*/
      /*
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"
        })
      }*/
      /*let postData = {
        id_u: userId,
        type: "month",
        month: month,
        ratingOnly: ratingOnly
      }*/
/*


      var url = "https://api.occamy.cz/getRatings.php";
      this.http.post(url, JSON.stringify(postData), httpOptions)
        .subscribe(d => {
          console.log(d);
          var data = d as Array<number>;
          if(data.length == 1 && data["Error"] != undefined) {
            reject(data["Error"]);
            return;
          }
          resolve(data);
        }, error=> {
          let str = "Error while attempting to get data for interval from " + postData.startDate + " to " + postData.endDate;
          console.error(str);
          console.log(error);
          reject(str);
        });*/
    //});
  //}
}