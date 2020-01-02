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
  sex = 1;

  constructor(private router:Router, public ac: AccountProvider, public userService: UserProvider) {
      this.currentUserData = ac.getCopyOfUser();//AccountProvider.user.copy();
      this.getSex();
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

  getSex() {
    this.sex = this.currentUserData.sex;
    if(this.sex == 1)
      return "Můž";
    if(this.sex == 2)
      return "Žena";
    
    return "Jiné";
    /*
    console.log("Sex: " + this.sex);
    if(this.sex == "1") {
      this.sex = "Muž";
    } else if(this.sex == "2") {
      this.sex = "Žena";
    } else {
      this.sex = "Jiné";
    }*/
  }

}