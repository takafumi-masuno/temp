import { createAction, props } from '@ngrx/store';
import { State } from './store-search.reducer';

export const setState = createAction(
  '[StoreSearch] Set State',
  props<{ state: State }>()
);

export const getSearch = createAction('[StoreSearch] Get Search');

export const setSearch = createAction(
  '[StoreSearch] Set Search',
  props<{ search: any }>()
);
