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
	styleUrls: ['add-note.scss'],
	providers: [AccountProvider]
})
export class AddNotePage {

	note;
	dateInpt;
	textInpt;
	id_n;
	text
	edit: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, public ac: AccountProvider, public rp: RatingProvider) {

		let date = this.route.snapshot.paramMap.get("date");
		console.log(date);
		if (date != undefined) {
			this.dateInpt = new Date(date).toISOString(); // date.keyDate
			console.log(this.dateInpt);
		} else {
			console.log("Date not set");
		}
		this.text = this.route.snapshot.paramMap.get("text");
		this.id_n = this.route.snapshot.paramMap.get("id_n");
		if (this.text != undefined && this.id_n != undefined)
			this.edit = true;

		if (this.edit) {
			this.textInpt = this.text;
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
		this.rp.addNote(this.dateInpt, this.note, "star").subscribe(val => {
			console.log(val);
			this.router.navigate(['/calendar']);
		}, error => {
			console.log("val: " + error);
		});
		console.log("idk");
	}

	editNote() {
		console.log("Edit note");
		console.log(this.dateInpt + " : " + this.id_n);
		this.rp.editDeleteNote(this.id_n, 1, this.textInpt, this.dateInpt, "star").subscribe((data) => {
			console.log(data);
			this.router.navigate(['/calendar']);
		})
		/*this.rp.editNotification(this.textInpt, this.dateInpt, this.timeInpt).subscribe(val => {
			console.log("val: " + val);
			this.router.navigate(['/calendar']);
		}, error => {
			console.log("val: " + error);
		});*/
	}

	onInput(type, value) {
		if (type == "note") {
			this.note = value;
		}
	}

}