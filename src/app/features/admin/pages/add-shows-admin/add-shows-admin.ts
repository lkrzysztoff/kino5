import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { FilmService } from 'src/app/features/home/subpages/movies/film-service/film-service';
import { showformInput } from './showform/showform.interface';
import { eachHourOfInterval, format } from 'date-fns';
import { AdminFilmService } from '../../services/admin-film.service';
import { eachDayOfInterval } from 'date-fns';
import { startOfISOWeek } from 'date-fns';
import { endOfMonth } from 'date-fns';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-addshowsadmin',
  templateUrl: './add-shows-admin.component.html',
  styleUrls: ['./add-shows-admin.scss'],
})
export class AddshowsadminComponent implements OnInit {
  formBuilder = inject(NonNullableFormBuilder);
  service = inject(FilmService);
  adminService = inject(AdminFilmService);
 
  dates = eachDayOfInterval({
    start: new Date(),
    end: endOfMonth(new Date()),
  }).map((day) => format(day, 'dd/MM'));

  screen$ = this.service.getScreens();
  today!: Date;
  minimumDay!: string[];
  dateArray!: (number | Date)[];
  showForm = this.createShowForm();
  data!: showformInput;
  todayString !: string
  
  private createShowForm() {
    const form = this.formBuilder.group({
      date: this.formBuilder.control<string>(this.todayString, []),
      screen: this.formBuilder.control<number>(NaN, []),
    });
    return form;
  }
  dateCreator() {
    let array = [];
    this.today = new Date();
    array.push(this.today);
    return array.map((today: number | Date) => format(today, 'yyyy-MM-dd'));
    console.log(array);
  }
  submit() {
    this.showForm.markAllAsTouched();
    if (this.showForm.invalid) {
      return;
    }
    this.data = this.showForm.getRawValue();
    console.log(this.data);
  }
  ngOnInit(): void {
    // this.today = new Date().dateArray.push()toDateString().map((today: number | Date) => format(today, 'yyyy-MM-dd'));
    this.todayString = format(new Date(),'MM/dd')
    this.minimumDay = this.dateCreator();
  }
}
