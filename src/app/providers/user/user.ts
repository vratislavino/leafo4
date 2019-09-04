import { AccountProvider } from './../account/account';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestProvider } from '../request/request';
import { User } from '../../model/UserModel';


@Injectable()
export class UserProvider {
	private apiRequest: RequestProvider;

	constructor(apiRequest: RequestProvider, private ac:AccountProvider) {
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
			id_u: this.ac.getUserId()
		});
	}

	public register(email, pass, passA, username, fName, sName, addressing, sign, sex) {
		return this.apiRequest.post(
			'/registerApi.php', {
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
				id_u: this.ac.getUserId(),
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
				id_u: this.ac.getUserId(),
				data: base64Image
			}
		)
	}

	public setWatering(watering:number) {
		return this.apiRequest.post(
			'/setCustomWatering.php', {
				'id_u': this.ac.getUserId(),
				'num': watering 
			}
		);
	} 

	public getTreeState() {
		return this.apiRequest.post(
			'/getTreeState.php', {
				id_u: this.ac.getUserId()
			});
	}

	public setTreeState() {
		return this.apiRequest.post(
			'/setStates.php', {
				id_u: this.ac.getUserId()
			});
	}

	public getCharacteristics() {
		return this.apiRequest.post(
			'/getCharacteristics.php', {
				'user_id': this.ac.getUserId()
			}
		);
	}

	public getAllCharacteristics() {
		return this.apiRequest.post(
			'/getAllCharacteristics.php', {}
		);
	}

	public getDepressionData() {
		return this.apiRequest.post(
			'/getDepression.php', {
				id_u: this.ac.getUserId()
			});
	}
	
	public getLastDepression() {
		return this.apiRequest.post(
			'/getLastDepression.php', {
				id_u: this.ac.getUserId()
			});
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
