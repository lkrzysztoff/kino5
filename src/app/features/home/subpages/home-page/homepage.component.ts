import { Component, OnInit, inject } from '@angular/core';
import { Film } from '../../../../model/film.model';
import { Observable } from 'rxjs';
import { MainDataSource } from 'src/app/model/main.datasource.service';
import { repertoire } from 'src/app/features/admin/pages/add-shows-admin/showform/showform.interface';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { DateService } from '../../../../shared/ui-components/date-panel/date.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  filmService = inject(MainDataSource);
  orderManagmentService = inject(OrderManagmentService);
  dateService = inject(DateService);

  selectedDate!: string;
  repertoire$!: Observable<repertoire[]>;
  films$!: Observable<Film[]>;

  dateImport(newDate: Date) {
    this.selectedDate = this.dateService.convertDateToString(newDate);
  }

  getRepertoireByDate(repertoire: repertoire[], date: string) {
    return repertoire.filter((repertoire) => repertoire.date === date);
  }

  returnFilmsById(films: Film[], id: number) {
    return films.filter((films) => films.id === id);
  }

  ngOnInit(): void {
    this.repertoire$ = this.filmService.getRepertoire();
    this.films$ = this.filmService.getFilms();
  }
}
