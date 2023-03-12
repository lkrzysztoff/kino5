import { createSelector, createFeatureSelector } from '@ngrx/store';
import { addShowInterface } from './admin.interfaces';
 
export const selectShows = createFeatureSelector<ReadonlyArray<addShowInterface>>('shows');
 
export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<number>
>('collection');
 
export const selectShowsCollection = createSelector(
  selectShows,
  selectCollectionState,
  (shows, collection) => {
    return collection.map((id) => shows.find((show) => show.id === id)!);
  }
);