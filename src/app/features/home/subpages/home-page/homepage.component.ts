import { Component, OnInit, inject } from '@angular/core';
import { Film } from '../../../../shared/interfaces/film.interface';
import { Observable } from 'rxjs';
import { repertoire } from 'src/app/features/admin/pages/add-shows-admin/showform/showform.interface';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { DateService } from '../../../../shared/ui-components/date-panel/date.service';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../movies/film-service/film-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  filmService = inject(FilmService);
  orderManagmentService = inject(OrderManagmentService);
  dateService = inject(DateService);
  activeRoute = inject(ActivatedRoute);

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
    this.selectedDate = this.activeRoute.snapshot.params['selectedDate'];
  }
}
