import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RatingProvider } from '../../providers/rating/rating';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
  providers: [AccountProvider]
})
export class AddNotePage {

	note;
	myDate;

  constructor(private router :Router, private route :ActivatedRoute, public ac: AccountProvider, public rp: RatingProvider) {

		let date = this.route.snapshot.paramMap.get("date");
		console.log(date);
		if(date != undefined) {
			this.myDate = new Date(date).toISOString(); // date.keyDate
			console.log(this.myDate);
		} else {
			console.log("Date not set");
		}
	
	//TODO--- get date from that
	  /*
  	if(navParams.get("date") != undefined) {
  		this.myDate = navParams.get("date").keyDate;
  		console.log(this.myDate);
  	} else {
  		console.log("Date not set");
  	}*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  addNote() {
    console.log("Adding note.");
  	this.rp.addNote(this.myDate, this.note, "star").subscribe(val => {
		  console.log(val);
		  this.router.navigate(['/calendar']);
  	}, error => {
  		console.log("val: " + error);
  	});
    console.log("idk");
  }

  onInput(type, value) {
  	if(type == "note") {
  		this.note = value;
  	}
  }

}