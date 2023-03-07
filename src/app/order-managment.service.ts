import { Injectable } from '@angular/core';
import { User } from './features/home/subpages/orders/order/user-interface';
import { Film } from './shared/interfaces/film.interface';
import { testFilm } from './features/home/subpages/reservation/reservation-grid/reservation-grid.component';
import { Observable, filter, map, shareReplay, tap, take, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderManagmentService {
  private favBooks = [{ title: 'dupa' }];

  userdata: User = new User('', '', '', '', '', '', false, false);
}

//   properFilms(films: Film[]): testFilm[] {
//     return films.map((films) => ({
//       title: films.title,
//       id: films.id,
//       genre: films.genre,
//     }));
//   }

//   filterFilmsById(film$: Observable<Film[]>, id: number): Observable<Film[]> {
//     console.log(film$);
//     return of([]);
    // return film$.pipe(
    //   take(1),
    //   map((films) => films.filter((films) => films.id == id)),
    //   tap(console.log)
    // );
//   }
// }

// this.films$ = this.service.getFilms().pipe(
//   map((films => films.filter(films => films.id = 4)))
// )
