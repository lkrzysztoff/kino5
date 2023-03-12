import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from '../../home/subpages/reservation/reservation-grid/reservation-interfaces';
import { movie } from '../pages/add-movies-admin/movie.interface';
import { addShowInterface } from '../store/admin.interfaces';
import { repertoire } from '../pages/add-shows-admin/showform/showform.interface';

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

  getCategories(){
    return this.http.get<string[]>(`http://localhost:3000/categories`)
  }

  getAgeCategories(){
    return this.http.get<number[]>(`http://localhost:3000/ageCategories`)
  }

  getRepertoireByDate(date:string){
    return this.http.get<repertoire>(`http://localhost:3000/repertoire?date=`+date)
  }

  afterReturn(show: addShowInterface, repertoire: repertoire) {
    const showId = show.id ? show.id : 1;
    if (!repertoire.shows.includes(showId)) {
      repertoire.shows.push(showId);
      this.http
        .put<repertoire>(
          `http://localhost:3000/repertoire/`+ repertoire.id,
          repertoire
        )
        .subscribe((value) => {
          console.log(value)
          // this.reloadRepertoire();
          alert('Gratulacje! Dodałeś nowy seans!');
        });
    }
    // console.log(show, repertoire);
  }
}
