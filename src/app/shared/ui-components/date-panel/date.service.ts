import { Injectable } from '@angular/core';
import {
  eachDayOfInterval,
  endOfISOWeek,
  startOfISOWeek,
  format
} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dates = eachDayOfInterval({
    start: startOfISOWeek(new Date()),
    end: endOfISOWeek(new Date()),
  })

  pastDates = eachDayOfInterval({
    start: startOfISOWeek(new Date()),
    end: new Date(),
  });

  pastDateLength = this.pastDates.length;

  convertDateToString(date: Date) {
    const today = date;
    const yyyy = today.getFullYear();
    let mm: string | number = today.getMonth() + 1;
    let dd: string | number = today.getDate();
    if (dd < 10) dd = '0' + dd.toString();
    if (mm < 10) mm = '0' + mm.toString();
    const formattedToday = dd + '/' + mm;
    return formattedToday;
  }
  constructor() {}

  get datesOfWeek (){
    return this.dates
  }
}

// .map((day) => format(day, 'yyyy-MM-dd'));
