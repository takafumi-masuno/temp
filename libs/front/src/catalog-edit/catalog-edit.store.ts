import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { CatalogEditService, CatalogGetIsEditService } from './services';
import {
  CatalogEditRequest,
  CatalogDetail,
  CatalogIsEditRequest,
} from './models';

interface CatalogRegisterState {
  catalog: CatalogDetail;
  error: {
    code: number;
    message: string;
  };
  isEdit: boolean;
}

@Injectable()
/**
 * カタログ変更store
 */
export class CatalogEditStore extends ComponentStore<CatalogRegisterState> {
  constructor(
    readonly catalogEditService: CatalogEditService,
    readonly catalogGetIsEditService: CatalogGetIsEditService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super({
      catalog: null,
      error: null,
      isEdit: null,
    });

    this.route.data
      .pipe(
        map((data) => data.catalog),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.setCatalog(data.catalog);
      });
  }

  readonly catalog$: Observable<CatalogDetail> = this.select(
    (state) => state.catalog
  );

  readonly error$: Observable<{
    code: number;
    message: string;
  }> = this.select((state) => state.error);

  readonly isEdit$: Observable<boolean> = this.select((state) => state.isEdit);

  readonly setCatalog = this.updater<CatalogDetail>((state, catalog) => {
    return { ...state, catalog };
  });

  readonly setError = this.updater<{
    code: number;
    message: string;
  }>((state, error) => {
    return { ...state, error };
  });

  readonly setIsEdit = this.updater<boolean>((state, isEdit) => {
    return { ...state, isEdit };
  });
  /**
   * カタログを変更する
   */
  readonly edit = this.effect((args$: Observable<CatalogEditRequest>) => {
    return args$.pipe(
      switchMap((credential) =>
        this.catalogEditService.execute(credential).pipe(
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
  });

  /**
   * コンフリクト確認
   */
  readonly getIsEdit = this.effect(
    (args$: Observable<CatalogIsEditRequest>) => {
      return args$.pipe(
        switchMap((credential) =>
          this.catalogGetIsEditService.execute(credential).pipe(
            tapResponse(
              (result) => {
                this.setIsEdit(Boolean(result.isEdit));
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
