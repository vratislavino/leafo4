import { AccountProvider } from './../account/account';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestProvider } from '../request/request';
import { User } from '../../model/UserModel';


@Injectable()
export class UserProvider {
	
	private apiRequest: RequestProvider;
	uschlyStrom = "Uschly strom.png";
	treeArr = [
		"1.png", "2.png", "3.png", "4.png"
	];

	constructor(apiRequest: RequestProvider, private ac: AccountProvider) {
		this.apiRequest = apiRequest;
	}

	public auth(username: string, password: string): Observable<{}> {
		return this.apiRequest.post(
			'/userApi.php', {
			'email': username,
			'pass': password
		});
	}

	public getRegisterDate() {
		return this.apiRequest.post(
			'/getRegisterDate.php', {
			'id_u': this.ac.getUserId()
		});
	}

	public downloadImage() {
		return this.apiRequest.post('/downloadImage.php', {
			id_u: this.ac.getUserId()
		});
	}

	public test() {
		return this.apiRequest.post('/testfunc.php', {
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

	public updateSettings(data: User, characteristics: object[] = undefined): Observable<{}> {
		//public updateSettings(firstname: string, email: string, addressing: string, sign: number, sex: number)

		if (characteristics) {
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
		} else {
			return this.apiRequest.post(
				'/updateSettingsApi.php', {
				id_u: this.ac.getUserId(),
				firstname: data.firstname,
				email: data.email,
				addressing: data.addressing,
				sign: data.sign,
				sex: data.sex
			});
		}

	}

	public setProfileImage(base64Image: string) {
		return this.apiRequest.post(
			'/uploadImage.php', {
			id_u: this.ac.getUserId(),
			data: base64Image
		}
		)
	}

	public setWatering(watering: number) {
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

	public getParsedTreeState() {
		return new Promise((resolve, reject) => {
			this.getTreeState().subscribe((val) => {

				let remaining = val["remaining"];
				let currentWatering = this.parseTreeState(val["tree_state"]);
				let lastWatering = val["lastWatering"];
				let newWatering = currentWatering;
				var date: Date = new Date(lastWatering);
				//this.wateredAt = date.getDay() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear();
				let wateredAt = this.parseDate(lastWatering);

				if (new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7).getTime() < new Date().getTime()) {
					currentWatering = -1;
					console.log("Starší o 7 dní");
				} else if (new Date(date.getTime() + 1000 * 60 * 60 * 24 * 3).getTime() < new Date().getTime()) {
					currentWatering = -1;
					console.log("Starší o 3 dny");
				}
				console.log("Load");
				console.log(new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7) + " " + new Date());

				val["remaining"] = remaining;
				val["tree_state"] = currentWatering;
				val["lastWatering"] = lastWatering;
				val["newWatering"] = newWatering;
				val["wateredAt"] = wateredAt;
				resolve(val);
			}, (err) => reject(err));
		})
	}
	
/*
	public getUnlocked() : Observable<any>{
		return new Observable((observer) => {
			this.getRatedDays().subscribe((val) => {

				let count = val["count"];

				observer.next(count);

				observer.complete();
			}, (err) => observer.error(err));
		})
	}*/

	getRatedDays() {
		return this.apiRequest.post(
			'/getRatedDays.php', {
			id_u: this.ac.getUserId()
		});
	}

	getCurrentTree(currentWatering) {
		const path = "../assets/imgs/";
		if (currentWatering == -1)
			return path + this.uschlyStrom;



		if (currentWatering == 1 || currentWatering == 0)
			return path + this.treeArr[0];

		if (currentWatering == 2)
			return path + this.treeArr[1];

		if (currentWatering == 3)
			return path + this.treeArr[2];

		return path + this.treeArr[3];
	}

	parseDate(date): string {
		var double = date.split(' ');
		var parts = double[0].split('-');
		return parts[2] + ". " + parts[1] + ". " + parts[0];
	}

	parseTreeState(ts: number): number {
		var state: number = 0;
		if (ts == 0)
			return ts;
		else if (ts == 1)
			return ts;
		else if (ts == 2)
			return ts;
		return ts;
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

	public getOvulationData() {
		console.log(this.ac.getUserId());
		return this.apiRequest.post(
			'/getOvulationData.php', {
			id_u: this.ac.getUserId()
		});
	}

	public setOvulationData(date, length, lasting) {
		return this.apiRequest.post(
			'/setOvulationData.php', {
			id_u: this.ac.getUserId(),
			date: date,
			length: length,
			lasting: lasting
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
