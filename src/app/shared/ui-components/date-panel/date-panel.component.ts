import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { DateService } from './date.service';

@Component({
  selector: 'app-date-panel',
  templateUrl: './date-panel.component.html',
  styleUrls: ['./date-panel.component.css'],
})
export class DatePanelComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  dateService = inject(DateService);
  
  date = new Date();
  selectedDate!: Date;
 
  @Output() dateExport = new EventEmitter();

  constructor() {}
  setSelectedDate(date: Date) {
    this.selectedDate = date;
    this.export();
    return date;
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
    let selectedDate = this.activeRoute.snapshot.params['selectedDate'];
    if (selectedDate != null) this.selectedDate = new Date(selectedDate);
    else this.selectedDate = new Date();
    this.export();

    this.selectedDate = this.date;
  }

  export() {
    this.dateExport.emit(this.selectedDate);
  }

  checkPast(index: number, pastDatesLength: number) {
    return index + 1 < pastDatesLength;
  }
}
