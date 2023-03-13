import { Component, OnInit, inject } from '@angular/core';
import { Film } from '../../../../shared/interfaces/film.interface';
import { Observable } from 'rxjs';
import { repertoire } from 'src/app/features/admin/pages/add-shows-admin/showform/showform.interface';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { DateService } from '../../../../shared/ui-components/date-panel/date.service';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../movies/film-service/film-service';
import { Showtest } from '../reservation/reservation-grid/reservation-interfaces';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  private filmService = inject(FilmService);
  private orderManagmentService = inject(OrderManagmentService);
  private dateService = inject(DateService);
  private activeRoute = inject(ActivatedRoute);

  selectedDate!: string;
  repertoire$!: Observable<repertoire[]>;
  films$!: Observable<Film[]>;
  show$!: Observable<Showtest[]>;
  dateImport(newDate: Date) {
    this.selectedDate = this.dateService.convertDateToString(newDate);
  }

  getRepertoireByDate(repertoire: repertoire[], date: string) {
    return repertoire.filter((repertoire) => repertoire.date === date);
  }

  returnFilmsById(films: Film[], id: number[], shows: Showtest[]) {
    let filmsArray: number[] = [];
    shows.forEach((value) => {
      if(id.includes(value.id)) filmsArray.push( value.filmId)
    })
    return films.filter((film) => filmsArray.includes(film.id));
  }

  ngOnInit(): void {
    this.repertoire$ = this.filmService.getRepertoire();
    this.films$ = this.filmService.getFilms();
    this.selectedDate = this.activeRoute.snapshot.params['selectedDate'];
    this.show$ = this.filmService.getShowtest();
  }

  modifiedDate !: string;
  checkDate(selectedDate:string){
    let formated
    formated = selectedDate.split('/').join('-');
    return formated;
  }
}
