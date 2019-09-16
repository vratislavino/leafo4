import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { Router } from '@angular/router';
import { UserProvider } from 'src/app/providers/user/user';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss'],
  providers: [AccountProvider]
})
export class HomePage implements OnInit {


  addressing = "";
  private subscription;

  constructor(private platform: Platform, private router: Router, public ac: AccountProvider, public userService: UserProvider) {
  }


  testme() {

    this.userService.test().subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {

    this.ac.ready().then(() => {


      console.log(this.ac.test());

      if (!this.ac.isLoggedIn()) {
        this.router.navigate(["/login"]);
      } else {
        this.addressing = this.ac.getAddressing();
      }
    })

  }
}