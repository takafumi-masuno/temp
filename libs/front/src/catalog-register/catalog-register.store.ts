import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import {
  CatalogRegisterService,
  CatalogShougouSearchService,
} from './services';
import {
  Catalog as CatalogRegisterRequest,
  CatalogRegisterResponse,
  CatalogShougouResponse,
  Shougou,
} from './models';
import { Router } from '@angular/router';
interface CatalogRegisterState {
  shougouList: string[];
  catalog: CatalogRegisterResponse['catalog'];
  error: {
    code: CatalogRegisterResponse['code'];
    message: CatalogRegisterResponse['message'];
  };
}

@Injectable()
/**
 * カタログ登録store
 */
export class CatalogRegisterStore extends ComponentStore<CatalogRegisterState> {
  constructor(
    readonly catalogRegisterService: CatalogRegisterService,
    readonly catalogShougouSearchService: CatalogShougouSearchService,
    private router: Router
  ) {
    super({
      shougouList: null,
      catalog: null,
      error: null,
    });
  }

  readonly shougouList$: Observable<string[]> = this.select(
    (state) => state.shougouList
  );

  readonly catalog$: Observable<CatalogRegisterResponse['catalog']> =
    this.select((state) => state.catalog);

  readonly error$: Observable<{
    code: CatalogRegisterResponse['code'];
    message: CatalogRegisterResponse['message'];
  }> = this.select((state) => state.error);

  readonly setShougouList = this.updater<string[]>((state, shougouList) => {
    return { ...state, shougouList };
  });

  readonly setCatalog = this.updater<CatalogRegisterResponse['catalog']>(
    (state, catalog) => {
      return { ...state, catalog };
    }
  );

  readonly setError = this.updater<{
    code: CatalogRegisterResponse['code'];
    message: CatalogRegisterResponse['message'];
  }>((state, error) => {
    return { ...state, error };
  });

  /**
   * 商号検索
   */
  readonly searchShougou = this.effect((args$: Observable<Shougou>) => {
    return args$.pipe(
      switchMap((credential) =>
        this.catalogShougouSearchService.execute(credential).pipe(
          tapResponse(
            (result) => {
              return result;
            },
            (e) => {
              console.error(e);
            }
          )
        )
      ),
      filter((response) => !!response.items.users),
      tap((response: CatalogShougouResponse) => {
        const users = response.items.users;
        this.setShougouList(users.map((user) => user.shougou));
      })
    );
  });

  /**
   * カタログを登録する
   */
  readonly register = this.effect(
    (args$: Observable<CatalogRegisterRequest>) => {
      return args$.pipe(
        switchMap((credential) =>
          this.catalogRegisterService.execute(credential).pipe(
            tapResponse(
              (result) => {
                if (result.code === 200) {
                  this.router.navigate(['catalog']);
                }
              },
              (e) => {
                // TODO: error処理
                console.error(e);
              }
            )
          )
        )
      );
    }
  );
}
