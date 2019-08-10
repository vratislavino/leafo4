import { AccountProvider } from './../../providers/account/account';
import { UserProvider } from './../../providers/user/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depression',
  templateUrl: './depression.page.html',
  styleUrls: ['./depression.page.scss'],
})
export class DepressionPage implements OnInit {

  horoscope = "horoskop";
  characteristics = "Jsi ";
  addressing ="";
  constructor(
    private userProvider: UserProvider
  ) { 

    this.userProvider.getDepressionData().subscribe((data)=> {
      this.addressing = AccountProvider.user.addressing;
      this.horoscope = this.addressing + ', ' + data['horoscope'];
      
      const chars = data['characteristics'];
      if(chars != undefined) {
        this.characteristics += chars[0];
        for(let i = 1; i < chars.length; i++) {
          this.characteristics += ', ' + chars[i];
        }
      }
    });
  }
  ngOnInit() {
    
  }

}
