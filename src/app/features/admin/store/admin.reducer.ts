import { createReducer, on } from '@ngrx/store';
import { initialFilmState } from './admin.state';
import { addFilmsActions } from './admin.actions';
import { addShowInterface } from './admin.interfaces';

export const addFilmReducer = createReducer(
    initialFilmState,
    on(addFilmsActions.addMovie, (state, action) => ({
      ...state,
      films: action.films,
    })),
)

// export const addShowReducer = createReducer(
//   initialShowState,
//   on(addShowsActions.addShow, (state,action) => ({
//     ...state,
//     shows: action.shows
//   }))
// )

