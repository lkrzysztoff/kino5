import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Show } from 'src/app/shared/interfaces/show.interface';
import { Screen } from 'src/app/shared/interfaces/screen.interface';

import { movie } from 'src/app/features/admin/pages/add-movies-admin/movie.interface';
import { repertoire } from 'src/app/features/admin/pages/add-shows-admin/showform/showform.interface';
import { OrderManagmentService } from 'src/app/order-managment.service';
import { map, pipe } from 'rxjs';
import { shareReplay } from 'rxjs';
import { Showtest } from 'src/app/features/home/subpages/reservation/reservation-grid/reservation-grid.component';
import { Cart } from 'src/app/shared/interfaces/cart-interface';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  baseUrl: string;
  auth_token?: string;
  dataService = inject(OrderManagmentService);

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.baseUrl + 'films');
  }
 
  getScreens(): Observable<Screen[]> {
    return this.http.get<Screen[]>(this.baseUrl + 'screen');
  }

  // saveOrder(order: Order): Observable<Order> {
  //     return this.http.post<Order>(this.baseUrl + "orders", order);
  // }

  adminAddMovie(film: movie) {
    return this.http.post<movie>(this.baseUrl + 'films', film);
  }

  getRepertoire() {
    return this.http.get<repertoire[]>(this.baseUrl + 'repertoire');
  }

  getFilmsByShowsId(id: number): Observable<Film[]> {
    return this.http.get<Film[]>(this.baseUrl + 'films/' + id);
  }

  getShowtest() {
    return this.http.get<Showtest[]>(this.baseUrl + 'show');
  }

  
}
