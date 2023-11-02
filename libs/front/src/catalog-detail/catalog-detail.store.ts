import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, map, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogDetail } from './models';
import { DeleteCatalogService } from './services';

interface CatalogDetailState {
  catalog: CatalogDetail;
}

@Injectable()
/**
 * カタログ詳細store
 */
export class CatalogDetailStore extends ComponentStore<CatalogDetailState> {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deleteCatalogService: DeleteCatalogService
  ) {
    super({
      catalog: null,
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

  readonly setCatalog = this.updater<CatalogDetail>((state, catalog) => {
    return { ...state, catalog };
  });

  /**
   * カタログを削除する
   */
  readonly deleteCatalog = this.effect((args$: Observable<number>) => {
    return args$.pipe(
      switchMap((credentials) =>
        this.deleteCatalogService.execute(credentials).pipe(
          tapResponse(
            (result) => {
              if (result.code === 200) {
                this.router.navigate(['catalog'], {
                  queryParams: { isDelete: true },
                });
              }
              return result;
            },
            (e) => {
              // TODO: エラー処理
              console.error(e);
            }
          )
        )
      )
    );
  });
}
