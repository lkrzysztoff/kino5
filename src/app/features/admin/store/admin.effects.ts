import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FilmService } from '../../home/subpages/movies/film-service/film-service';
import { AdminFilmService } from '../services/admin-film.service';
import { addFilmsActions } from './admin.actions';

@Injectable()
export class AdminEffects{
    private actions$ = inject(Actions);
    private adminFilmService = inject(AdminFilmService)


  sendMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFilmsActions.addOneMovie),
      switchMap((result) => {
        return this.adminFilmService.adminAddMovieFunction(result.films).pipe(
          map((result) => {
            return addFilmsActions.addMovie({ films: [] });
          })
        );
      })
    )
  );
}