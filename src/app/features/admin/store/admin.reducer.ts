import { createReducer, on } from '@ngrx/store';
import { initialFilmState } from './admin.state';
import { addFilmsActions } from './admin.actions';

export const addFilmReducer = createReducer(
    initialFilmState,
    on(addFilmsActions.addFilm, (state, action) => ({
      ...state,
      films: action.films,
    })),
    on(addFilmsActions.addSingleFilm, (state, action) => ({
      ...state,
      films: [...state.films, action.films],
    }))
)