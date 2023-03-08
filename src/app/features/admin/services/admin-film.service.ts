import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from '../../home/subpages/reservation/reservation-grid/reservation-interfaces';
import { movie } from '../pages/add-movies-admin/movie.interface';
import { addShowInterface } from '../pages/add-shows-admin/add-shows-admin';

@Injectable({
  providedIn: 'root',
})
export class AdminFilmService {
  private http = inject(HttpClient);

  adminAddMovieFunction(film: movie) {
    return this.http.post<movie>(`http://localhost:3000/films`, film);
  }

  adminAddShow(show: addShowInterface) {
    return this.http.post<addShowInterface>(`http://localhost:3000/show`, show);
  }

  getFilms() {
    return this.http.get<movie[]>(`http://localhost:3000/films`);
  }
}
