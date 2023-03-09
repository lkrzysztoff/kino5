import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { movie } from '../pages/add-movies-admin/movie.interface';

export const addFilmsActions = createActionGroup({
  source: 'AdminFilm',
  events: {
    'Add movie': props<{
      films: movie[];
    }>(),
    'Add one movie': props<{
      films: movie;
    }>(),
  },
});
