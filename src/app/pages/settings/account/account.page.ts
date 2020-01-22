import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserProvider } from './../../../providers/user/user';
import { User } from '../../../model/UserModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountProvider } from 'src/app/providers/account/account';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  
  user: string;

  passInput = "";
  passCheckInput = "";

  currentUserData: User;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public ac: AccountProvider,
    public tC: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public userService: UserProvider,
    public vc: ViewContainerRef,
    public infoLeafo: LeafoInfoProvider
  ) {
    this.currentUserData = this.ac.getCopyOfUser();
  }

  //currentUserData: User;
  //user: string;

  ngOnInit() {
  }

  saveData() {
    this.userService.updateSettings(this.currentUserData).subscribe(val => {
      console.log("Updating settings message: " + val);
      this.ac.saveLocal(this.currentUserData);
      this.router.navigate(["/home"]);
    }, error => {
      console.log("Updating settings message: " + error);
    });
  }
}
