import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStorePropertyDetail from './store-property-detail';
import {
  StorePropertyDetailEffects,
  StorePropertyDetailFacade,
} from './store-property-detail';
import { TransferStateService } from '@shared/services';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStorePropertyDetail.STORE_PROPERTY_DETAIL_FEATURE_KEY,
      fromStorePropertyDetail.reducer
    ),
    EffectsModule.forFeature([StorePropertyDetailEffects]),
  ],
  providers: [StorePropertyDetailFacade],
})
export class StoresPropertyDetailModule {
  constructor(
    private readonly store: StorePropertyDetailFacade,
    private readonly transferStateService: TransferStateService
  ) {
    const state = this.transferStateService.storeState(
      'storePropertyDetail',
      store.state$
    );
    if (state) {
      this.store.setState(state);
    }
  }
}
