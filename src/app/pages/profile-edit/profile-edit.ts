import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { Router } from '@angular/router';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
  styleUrls: ['profile-edit.scss']
})
export class ProfileEditPage {

  currentUserData:User;
  photo = "./assets/imgs/avatar.png";

  constructor(private router:Router, public ac: AccountProvider, public userService: UserProvider) {
      this.currentUserData = ac.getCopyOfUser();//AccountProvider.user.copy();

  }

  save() {
    this.userService.updateSettings(this.currentUserData, null).subscribe(val => {
      console.log("Updating settings message: " + val);
      //AccountProvider.user = this.currentUserData;
      this.ac.saveLocal(this.currentUserData);
      this.router.navigate(["/profile"]);
    }, error => {
        console.log("Updating settings message: " + error);
    });
  }

  onInput(type, value) {
    if(type == "addressing") {
        this.currentUserData.addressing = value;
    } else if(type == "firstname") {
        this.currentUserData.firstname = value;
    }
  }

}