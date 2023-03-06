import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Film } from 'src/app/model/film.model';
@Injectable({
  providedIn: 'root',
})
export class MywatchlistService {
  private watchlist$$ = new BehaviorSubject<Film[]>([]);

  get favList$() {
    return this.watchlist$$.asObservable();
  }
  addMovie(movie: Film) {
    this.watchlist$$.next([...this.watchlist$$.value, movie]);
  }

  removeMovie(movieId: number) {
    this.watchlist$$.next(
      this.watchlist$$.value.filter(({ id }) => id !== movieId)
    );
  }

  hasMovie(movieId: number): boolean {
    return this.watchlist$$.value.some(({ id }) => id === movieId);
  }
}
