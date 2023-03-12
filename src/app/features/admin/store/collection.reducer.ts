import { createReducer, on } from '@ngrx/store';
import { ShowsActions } from './shows.actions';
 
export const initialState: ReadonlyArray<number> = [];

export const collectionReducer = createReducer(
    initialState,
    on(ShowsActions.removeShow, (state, { showId }) =>
      state.filter((id) => id !== showId)
    ),
    on(ShowsActions.removeShow, (state, { showId }) => {
      if (state.indexOf(showId) > -1) return state;
   
      return [...state, showId];
    })
  );