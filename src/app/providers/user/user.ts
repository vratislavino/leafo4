import { AccountProvider } from './../account/account';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestProvider } from '../request/request';
import { User } from '../../model/UserModel';


@Injectable()
export class UserProvider {
	private apiRequest: RequestProvider;

	constructor(apiRequest: RequestProvider) {
		this.apiRequest = apiRequest;
	}

	public auth(username: string, password: string): Observable<{}> {
		return this.apiRequest.post(
			'/userApi.php', {
				'email': username,
				'pass': password
			});
	}

	public downloadImage() {
		return this.apiRequest.post('downloadImage.php', {
			id_u: AccountProvider.user.id
		});
	}

	public register(email, pass, passA, username, fName, sName, addressing, sign, sex) {
		return this.apiRequest.post(
			'/userApi.php', {
				email: email,
				pass: pass,
				passA: passA,
				username: username,
				firstname: fName,
				surname: sName,
				addressing: addressing,
				sign: sign,
				sex: sex
			});
	}

	public updateSettings(data: User, characteristics: object[]): Observable<{}> {
		//public updateSettings(firstname: string, email: string, addressing: string, sign: number, sex: number)
		
		return this.apiRequest.post(
			'/updateSettingsApi.php', {
				id_u: AccountProvider.user.id,
				firstname: data.firstname,
				email: data.email,
				addressing: data.addressing,
				sign: data.sign,
				sex: data.sex,
				characteristics: characteristics
			});
	}

	public setProfileImage(base64Image: string) {
		return this.apiRequest.post(
			'/uploadImage.php', {
				id_u: AccountProvider.user.id,
				data: base64Image
			}
		)
	}

	public setWatering(watering:number) {
		return this.apiRequest.post(
			'/setCustomWatering.php', {
				'id_u': AccountProvider.user.id,
				'num': watering 
			}
		);
	} 

	public getTreeState() {
		return this.apiRequest.post(
			'/getTreeState.php', {
				id_u: AccountProvider.user.id
			});
	}

	public setTreeState() {
		return this.apiRequest.post(
			'/setStates.php', {
				id_u: AccountProvider.user.id
			});
	}

	public getCharacteristics() {
		return this.apiRequest.post(
			'/getCharacteristics.php', {
				'user_id': AccountProvider.user.id
			}
		)
	}

	public getAllCharacteristics() {
		return this.apiRequest.post(
			'/getAllCharacteristics.php', {}
		)
	}
	/*
	  updateDeviceToken(userUuid: string, token: string) {
		return this.apiRequest.put(
		  '/users/' + userUuid + '/device-token', {
			'token': token
		  });
	  }
	*/
}
