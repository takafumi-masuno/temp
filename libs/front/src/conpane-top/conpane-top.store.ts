import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TransferStateService } from '@shared/services';
import { StoreAppFacade } from '../shared/stores/app';

export interface ConpaneTopState {
  error?: boolean;
}

@Injectable()
export class ConpaneTopStore extends ComponentStore<ConpaneTopState> {
  constructor(
    private transferStateService: TransferStateService,
    private storeAppFacade: StoreAppFacade
  ) {
    super({});

    const loadState = this.transferStateService.storeState(
      'CommonCustomhouseConpaneTopState',
      this.select((state) => state)
    );
    if (loadState) {
      this.stateUpdate(loadState);
    }
  }

  /** Reducer */
  /** ストア全情報更新 */
  readonly stateUpdate = this.updater<ConpaneTopState>((_, state) => ({
    ...state,
  }));
}
