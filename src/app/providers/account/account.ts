import { MotStorageProvider } from './../mot-storage/mot-storage';
import { Injectable } from '@angular/core';
import { User } from '../../model/UserModel';
import { Events } from '@ionic/angular';

@Injectable()
export class AccountProvider {

	public static user: User;
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

	login(data) {

		AccountProvider.user.extractUser(data);
		this.motStorage.set('auth', AccountProvider.user);
		this.events.publish('user:login');
	}

	saveLocal() {
		this.motStorage.set('auth', AccountProvider.user);
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

	initUser() {
		AccountProvider.user = User.createWholeUser(this.getAuthData())
	}

	logout() {
		this.motStorage.remove('auth');
		this.events.publish('user:logout');
	}

	getAuthData(): any {
		return this.motStorage.get('auth');
	}

	isLoggedIn(): boolean {
		return this.getAuthData() ? true : false;
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