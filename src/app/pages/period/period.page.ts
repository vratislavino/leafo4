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
    subHeader: 'Zvol délku svého ovulačního'
  };

  period_length;
  myDate;
  endPeriodDate;

  constructor(private userService: UserProvider, private router:Router) { }

  ngOnInit() {
    this.userService.getOvulationData().subscribe((data) => {
      console.log(data["ovulation_date"]);
      if(data["ovulation_date"] == null) {
        this.period_length = "24";
        this.endPeriodDate = new Date().toISOString();
        this.myDate = new Date().toISOString();
      } else {
        this.period_length = data["ovulation_length"];
        this.endPeriodDate = data["period_end"];
        this.myDate = new Date(data["ovulation_date"]).toISOString();
      }
    });
  }

  saveData() {
    this.userService.setOvulationData(this.myDate, this.period_length, this.endPeriodDate).subscribe((data) => {
      this.router.navigate(["/calendar"]);
    });
  }

}
