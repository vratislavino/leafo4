import { MotStorageProvider } from './../mot-storage/mot-storage';
import { Injectable } from '@angular/core';
import { User } from '../../model/UserModel';
import { Events } from '@ionic/angular';

@Injectable()
export class AccountProvider {

	private readyPromise: Promise<void> = null;
	private events: Events;
	private motStorage: MotStorageProvider;

	constructor(events: Events, motStorage: MotStorageProvider) {
		this.readyPromise = motStorage.ready();
		this.events = events;
		this.motStorage = motStorage;
	}

	ready(): Promise<void> {
		return this.readyPromise;
	}

	login(user:User, data, nav:boolean) {

		user.extractUser(data);
		this.motStorage.set('auth', user);
		console.log("SAVED USER TO STORAGE AFTER LOGIN");
		console.log(this.getAuthData());

		this.events.publish('user:login', nav);
	}

	saveLocal(user:User) {
		this.motStorage.set('auth', user);

		console.log("SAVED USER TO STORAGE FROM saveLocal");
		console.log(this.getAuthData());
	}

	getProfileImage() {
		return new Promise((resolve, reject)=> {
			if(this.motStorage.exists('avatar')) {
				resolve(this.motStorage.get('avatar'));
			} else {
				reject ('assets/imgs/avatar.png');
			}
			
		});
	}
	
	setProfileImage(data) {
		return new Promise((resolve, reject)=> {
			this.motStorage.set('avatar', data);
			resolve();
		});
	}

	logout() {
		this.motStorage.remove('auth');
		
		console.log("REMOVED USER FROM STORAGE FROM LOGOUT");
		console.log(this.getAuthData());
		this.events.publish('user:logout');
	}

	getAuthData(): any {
		return this.motStorage.get('auth');
	}

	test() {
		return this.motStorage.exists("auth");
	}

	isLoggedIn(): boolean {
		return this.getAuthData();
	}

	getCopyOfUser():User {
		var usr = this.getAuthData();
		var copy = new User(usr.email);
		copy.extractUser(usr);

		return copy;
	}

	getUserId():number {
		var auth = this.getAuthData();

		return auth.id;
	}

	getAddressing():string {
		var auth = this.getAuthData();

		return auth.addressing;
	}

	getUserName(): string {
		let auth = this.getAuthData();
		if (auth) {
			return auth.username;
		}
		return '';
	}

	getUserUuid(): string {
		let auth = this.getAuthData();
		if (auth && auth.uuid) {
			return auth.uuid;
		}
		return null;
	}

	getUserRole(): string {
		let auth = this.getAuthData();
		if (auth && auth.uuid) {
			return auth.role;
		}
		return null;
	}

}