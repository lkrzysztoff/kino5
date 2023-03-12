import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from '../../home/subpages/reservation/reservation-grid/reservation-interfaces';
import { movie } from '../pages/add-movies-admin/movie.interface';
import { addShowInterface } from './admin.interfaces';

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

// export const addShowsActions = createActionGroup({
//   source: 'AdminShows',
//   events:{
//     'Add show': props<{
//       shows: addShowInterface[]
//     }>(),
//     'Add one show': props<{
//       shows: addShowInterface
//     }>()
//   }
// })

