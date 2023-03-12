import { createReducer, on } from '@ngrx/store';
import { addShowInterface } from './admin.interfaces';
import { ShowsApiActions } from './shows.actions';


export const initialState: ReadonlyArray<addShowInterface> = [];

export const showsReducer = createReducer(
  initialState,
  on(ShowsApiActions.retrievedShowList, (_state, { shows }) => shows)
);