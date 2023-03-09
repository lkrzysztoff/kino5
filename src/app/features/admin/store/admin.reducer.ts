import { createReducer, on } from '@ngrx/store';
import { initialFilmState } from './admin.state';
import { addFilmsActions } from './admin.actions';

export const addFilmReducer = createReducer(
    initialFilmState,
    on(addFilmsActions.addMovie, (state, action) => ({
      ...state,
      films: action.films,
    })),
)