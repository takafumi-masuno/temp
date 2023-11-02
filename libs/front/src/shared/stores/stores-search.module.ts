import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStoreSearch from './store-search/store-search.reducer';
import { StoreSearchEffects, StoreSearchFacade } from './store-search';
import { TransferStateService } from '@shared/services';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStoreSearch.STORESEARCH_FEATURE_KEY,
      fromStoreSearch.reducer
    ),
    EffectsModule.forFeature([StoreSearchEffects]),
  ],
  providers: [StoreSearchFacade],
})
export class StoresSearchModule {
  constructor(
    private readonly store: StoreSearchFacade,
    private readonly transferStateService: TransferStateService
  ) {
    const state = this.transferStateService.storeState(
      'storeSearch',
      store.state$
    );
    if (state) {
      this.store.setState(state);
    }
  }
}
