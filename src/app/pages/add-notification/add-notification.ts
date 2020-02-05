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
  styleUrls: ['add-notification.scss'],
  providers: [AccountProvider]
})
export class AddNotificationPage {
	notification;
	dateInpt;
	timeInpt;
	textInpt;
	id_n;
	text;
	time;
	edit: boolean = false;

  constructor(private route:ActivatedRoute, private router:Router, public ac: AccountProvider, public rp: RatingProvider) {

	let date = this.route.snapshot.paramMap.get("date");
	console.log("Date: " + date);
	if(date != undefined) {
		this.dateInpt = new Date(date).toISOString(); // date.keyDate
		console.log(this.dateInpt);
	} else {
		console.log("Date not set");
	}

	let text = this.route.snapshot.paramMap.get('text');
	let id_n = this.route.snapshot.paramMap.get('id_n');
	let time = this.route.snapshot.paramMap.get('time');

	if(text != undefined && id_n != undefined && time != undefined)
		this.edit = true;

	if(this.edit) {
		this.timeInpt = time;
		console.log("Time: " + this.timeInpt);
		this.textInpt = text;
	} else {
  		var timeDate = new Date();
		this.timeInpt = timeDate.toISOString();
		console.log("Cas: " + this.timeInpt);
	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotificationPage');
  }

  addNotification() {
  	this.rp.addNotification(this.dateInpt, this.timeInpt, this.notification).subscribe(val => {
  		console.log("val: " + val);
  		this.router.navigate(['/calendar']);
  	}, error => {
  		console.log("val: " + error);
  	});
  }

	editNotification() {
		console.log("Edit notification");
		/*this.rp.editNotification(this.textInpt, this.dateInpt, this.timeInpt).subscribe(val => {
			console.log("val: " + val);
			this.router.navigate(['/calendar']);
		}, error => {
			console.log("val: " + error);
		});*/
	}

  onInput(type, value) {
  	if(type == "note") {
  		this.notification = value;
  	}
  }
}