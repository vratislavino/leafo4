import { Component, OnInit } from '@angular/core';
import { UserProvider } from 'src/app/providers/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-period',
  templateUrl: './period.page.html',
  styleUrls: ['./period.page.scss'],
})
export class PeriodPage implements OnInit {

  customActionSheetOptions: any = {
    header: 'Dny',
    subHeader: 'Zvol délku svého ovulačního cyklu'
  };

  period_length;
  period_lasting;
  myDate;

  constructor(private userService: UserProvider, private router:Router) { }

  ngOnInit() {
    this.userService.getOvulationData().subscribe((data) => {
      console.log(data["ovulation_date"]);
      if(data["ovulation_date"] == null) {
        this.period_length = "24";
        this.period_lasting = "4";
        this.myDate = new Date().toISOString();
      } else {
        this.period_length = data["ovulation_length"];
        this.period_lasting = data["ovulation_lasting"];
        this.myDate = new Date(data["ovulation_date"]).toISOString();
      }
    });
  }

  saveData() {
    this.userService.setOvulationData(this.myDate, this.period_length, this.period_lasting).subscribe((data) => {
      this.router.navigate(["/calendar"]);
    });
  }

}
