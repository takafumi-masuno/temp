import { Component } from '@angular/core';
import { StoreAppFacade } from '../shared/stores/app';
import { CatalogDetailStore } from './catalog-detail.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'athome-customhouse-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.scss'],
  providers: [CatalogDetailStore],
})
/**
 * カタログ詳細component
 */
export class CatalogDetailComponent {
  constructor(
    public storeAppFacade: StoreAppFacade,
    public store: CatalogDetailStore,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  readonly user$ = this.storeAppFacade.user$;

  // TODO: カタログ変更ページ作成時にhtmlに実装
  /**
   * カタログ変更ページ遷移処理
   */
  onClickCatalogEdit() {
    this.route.params.subscribe((params) => {
      this.router.navigate[`catalog/${params['id']}`];
    });
  }

  /**
   * カタログ削除処理
   */
  onClickCatalogDelete() {
    this.route.params.subscribe((params) => {
      this.store.deleteCatalog(params['id']);
    });
  }
}
