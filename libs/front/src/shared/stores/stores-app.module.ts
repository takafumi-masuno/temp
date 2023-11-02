import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStoreApp from './app/store-app.reducer';
import { StoreAppEffects, StoreAppFacade } from './app';
import { TransferStateService } from '@shared/services';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStoreApp.STORE_APP_FEATURE_KEY,
      fromStoreApp.reducer,
      { initialState: fromStoreApp.initialState }
    ),
    EffectsModule.forFeature([StoreAppEffects]),
  ],
  providers: [StoreAppFacade],
})
export class StoresAppModule {
  constructor(
    private readonly store: StoreAppFacade,
    private readonly transferStateService: TransferStateService
  ) {
    const state = this.transferStateService.storeState(
      'storeApp',
      store.state$
    );
    if (state) {
      this.store.setState(state);
    }
  }
}
