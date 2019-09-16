import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.scss'],
})
export class HoroscopeComponent implements OnInit {

  
  @Input('horoscopeObj') horoscopeObj :any;
  horoscope:any;

  constructor() { 
    
    this.horoscope = this.horoscopeObj;
  }

  ngOnInit() {}

}
