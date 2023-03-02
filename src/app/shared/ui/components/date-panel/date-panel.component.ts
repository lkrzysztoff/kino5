import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from "@angular/router"; 
import {  Input, Output,EventEmitter } from '@angular/core'
import { eachDayOfInterval, endOfISOWeek, format, getDate, parse, startOfDay, startOfISOWeek } from 'date-fns'


@Component({
  selector: 'app-date-panel',
  templateUrl: './date-panel.component.html',
  styleUrls: ['./date-panel.component.css']
})


export class DatePanelComponent implements OnInit {
  date = new Date();
  selectedDate! : Date;

  @Output() dateExport = new EventEmitter();
  

  dates = eachDayOfInterval({
    start: startOfISOWeek(new Date()),
    end: endOfISOWeek(new Date()),
  })

  today = new Date()
dzisiaj! : Date;
  // dates(){
  //   for(let  i = 0; i<7;i++){
  //     this.date = new Date();
      // this.date.setDate(this.date.getDate()+i);
  //     this.czas.push(this.date)
  //   }
  // }
  constructor( private activeRoute: ActivatedRoute) {
  }
  setSelectedDate( date: Date){
    this.selectedDate = date;
    this.export();
    return date;
  }
  ngOnInit(): void {
    let selectedDate = this.activeRoute.snapshot.params["selectedDate"]; 
    if( selectedDate != null ) this.selectedDate = new Date( selectedDate );
    else                       this.selectedDate = new Date( );
    this.export();
     
this.selectedDate = this.date;
    
    this.dzisiaj = new Date()

  }
  export() {
    this.dateExport.emit(this.selectedDate);
  }   
  checkPast(date: Date){
    let teraz = new Date()
    teraz.setDate(this.date.getDate()-1)
    if (date>=this.today) {
      return false
    } else return true;
  }
  

  
  checkToday(date: Date){
     
    
    
  }
}


