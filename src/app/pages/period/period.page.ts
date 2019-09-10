import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
