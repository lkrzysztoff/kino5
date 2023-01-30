import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DdMmYYYYDatePipe } from './date-pipe';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from "@angular/router"; 
import {  Input, Output,EventEmitter } from '@angular/core'

@Component({
  selector: 'app-date-panel',
  templateUrl: './date-panel.component.html',
  styleUrls: ['./date-panel.component.css']
})


export class DatePanelComponent implements OnInit {
  date = new Date();
  selectedDate : Date | null = null;
  czas : Array<Date>= [];
  
  @Output() dateExport = new EventEmitter();
  


  dates(){
    for(let  i = 0; i<7;i++){
      this.date = new Date();
      this.date.setDate(this.date.getDate()+i);
      this.czas.push(this.date)
    }
  }
  constructor( private activeRoute: ActivatedRoute) { 
  }
  setSelectedDate( date: Date){
    this.selectedDate = date;
    this.export();
  }
  ngOnInit(): void {
    let selectedDate = this.activeRoute.snapshot.params["selectedDate"]; 
    if( selectedDate != null ) this.selectedDate = new Date( selectedDate );
    else                       this.selectedDate = new Date( );
    this.export();
    this.dates();   
  }
  export() {
    this.dateExport.emit(this.selectedDate);
  }   
  
}


