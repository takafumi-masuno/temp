import { createAction, props } from '@ngrx/store';
import { State } from './store-property-detail.reducer';

export const setState = createAction(
  '[StoreBukkenDeta] Set State',
  props<{ state: State }>()
);

export const setBukkenCd = createAction(
  '[StoreBukkenDeta] Set Bukken Cd',
  props<{ bukkenCd: string }>()
);
