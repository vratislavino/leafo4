import { Component, OnInit } from '@angular/core';
import { UserProvider } from './../../providers/user/user';
import { User } from '../../model/UserModel';

@Component({
  selector: 'app-sloginfo',
  templateUrl: './sloginfo.page.html',
  styleUrls: ['./sloginfo.page.scss'],
})
export class SloginfoPage implements OnInit {

  constructor(
    /*public ac: AccountProvider,
    public userService: UserProvider,*/
  ) { }

  //currentUserData: User;
  //user: string;

  ngOnInit() {
    /*this.currentUserData = this.ac.getCopyOfUser();

    this.ac.getProfileImage().then((data: string) => {
        this.userImage = data;
    });*/
  }

}
