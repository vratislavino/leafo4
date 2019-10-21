import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { User } from '../../model/UserModel';
import { Router } from '@angular/router';
import { UserProvider } from 'src/app/providers/user/user';
import { QuoteProvider } from 'src/app/providers/quote/quote';
import { RatingProvider } from 'src/app/providers/rating/rating';
import { NotificationProvider } from 'src/app/providers/notification/notification';

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

  private todayRated = false;
  private quoteObtained = false;
  private horoscopeObtained = false;


  constructor(private platform: Platform, 
    private router: Router, 
    public ac: AccountProvider, 
    public userService: UserProvider, 
    private qp: QuoteProvider, 
    private rp:RatingProvider,
    private np:NotificationProvider) {
  }

  ngOnInit(): void {

    this.ac.ready().then(() => {

      if (!this.ac.isLoggedIn()) {
        this.router.navigate(["/login"]);
      } else {
        this.addressing = this.ac.getAddressing();
        this.initData();
      }
    })

  }

  initData() {
    /*this.setNotifsForRating();
    this.setNotifsForQuote();
    this.*/
  }

  

  setNotifsForRating() {
    if(this.todayRated) {
      this.np.planDayRating();
    }
  }
}