import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  
  constructor() { }

  getDaysDiff(date1: Date, today: Date) {

    var diff = today.getTime() - date1.getTime();
    diff = diff / 1000/60/60/24;
    return diff;
}

  public toKeyDate(date:Date) : string {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  public toDate(date:string) : Date {
    let pole = date.split(" ");
    let dat = pole[0].split("-");
    let tim = pole[1].split(":");
    
    let d = new Date(parseInt(dat[0]), (parseInt(dat[1]))-1, parseInt(dat[2]), 
                      parseInt(tim[0]), parseInt(tim[1]), parseInt(tim[2])
    );
    return d;
  }
  
}
