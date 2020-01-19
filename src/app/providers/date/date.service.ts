import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public toKeyDate(date:Date) : string {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }
  
}
