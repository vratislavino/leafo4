import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RatingProvider } from '../../providers/rating/rating';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-notification',
  templateUrl: 'add-notification.html',
  providers: [AccountProvider]
})
export class AddNotificationPage {
	notification;
	myDate;
	myTime;

  constructor(private route:ActivatedRoute, private router:Router, public ac: AccountProvider, public rp: RatingProvider) {

	let a = this.route.snapshot.paramMap.get('date');
		if(a != undefined) {
			this.myDate = new Date(a).toISOString();
			console.log(this.myDate);
		} else {
			console.log("Date not set");
		}

  	var date = new Date();
	this.myTime = date.toISOString();
	console.log("Cas: " + this.myTime);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotificationPage');
  }

  addNotification() {
  	this.rp.addNotification(this.myDate, this.myTime, this.notification).subscribe(val => {
  		console.log("val: " + val);
  		this.router.navigate(['/calendar']);
  	}, error => {
  		console.log("val: " + error);
  	});
  }

  onInput(type, value) {
  	if(type == "note") {
  		this.notification = value;
  	}
  }
}