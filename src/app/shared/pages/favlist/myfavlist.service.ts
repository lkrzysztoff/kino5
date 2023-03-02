import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Film } from 'src/app/model/film.model';
@Injectable({
  providedIn: 'root',
})
export class MyfavlistService {
  private favlist$$ = new BehaviorSubject<Film[]>([]);

  get favList$() {
    return this.favlist$$.asObservable();
  }
  addMovie(movie: Film) {
    this.favlist$$.next([...this.favlist$$.value, movie]);
  }

  removeMovie(movieId: number) {
    this.favlist$$.next(
      this.favlist$$.value.filter(({ id }) => id !== movieId)
    );
  }

  hasMovie(movieId: number): boolean {
    return this.favlist$$.value.some(({ id }) => id === movieId);
  }
}
