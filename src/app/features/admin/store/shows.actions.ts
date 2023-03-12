import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Showtest } from '../../home/subpages/reservation/reservation-grid/reservation-interfaces';
import { movie } from '../pages/add-movies-admin/movie.interface';
import { addShowInterface } from './admin.interfaces';

export const ShowsActions = createActionGroup({
    source: 'Shows',
    events: {
      'Add Show': props<{ showId: number }>(),
      'Remove Show': props<{ showId: number }>(),
    },
  });
  
  export const ShowsApiActions = createActionGroup({
    source: 'Shows API',
    events: {
      'Retrieved Show List': props<{ shows: ReadonlyArray<addShowInterface> }>(),
    },
  });
   
  