import { Injectable } from '@angular/core';
import { User } from './shared/ui/orders/order/user';
import { Film } from './model/film.model';
import { testFilm } from './test/test.component';
import { Observable, filter, map, shareReplay, tap, take, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderManagmentService {
  private favBooks = [{ title: 'dupa' }];

  userdata: User = new User('', '', '', '', '', '', false, false);

  properFilms(films: Film[]): testFilm[] {
    return films.map((films) => ({
      title: films.title,
      id: films.id,
      genre: films.genre,
    }));
  }

  filterFilmsById(film$: Observable<Film[]>, id: number): Observable<Film[]> {
    console.log(film$);
    return of([]);
    // return film$.pipe(
    //   take(1),
    //   map((films) => films.filter((films) => films.id == id)),
    //   tap(console.log)
    // );
  }
}

// this.films$ = this.service.getFilms().pipe(
//   map((films => films.filter(films => films.id = 4)))
// )
