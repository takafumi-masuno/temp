import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SegmentValueMst } from '../shared/constants';
import { CatalogListStore } from './catalog-list.store';
import { CatalogListSearchRequest } from './models/catalog-list';
import { HTMLEvent } from '../shared/models/events';
import { ActivatedRoute } from '@angular/router';
import { StoreAppFacade } from '../shared/stores/app';
import { filter } from 'rxjs';

@Component({
  selector: 'athome-customhouse-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss'],
  providers: [CatalogListStore],
})
export class CatalogListComponent implements OnInit {
  constructor(
    public store: CatalogListStore,
    public storeAppFacade: StoreAppFacade,
    private route: ActivatedRoute
  ) {}

  // 表示切替
  deleted = false;
  displaySearchResultAreaFlg = false;

  shougou = '';
  catalogNm = '';
  catalogMedia: string;
  catalogType: string;
  status: string;
  dataSource = new MatTableDataSource([]);

  // 公開状態のデザイン調整用
  selectValue = '';
  fontColor = '';
  changeColor(value: string) {
    this.selectValue = value;
    if (value !== '') {
      this.fontColor = '#707070';
    }
  }

  // 建築会社一覧表
  displayedColumns: string[] = [
    'position',
    'shougou',
    'catalogNm',
    'catalogGaiyou',
    'catalogType',
    'catalogMedia',
    'catalogTag',
    'status',
    'detail',
  ];

  tags: string[] = [];

  releaseStatusOptions = SegmentValueMst.SegmentValue.KOUKAI_JOUTAI;
  catalogMediaOptions = SegmentValueMst.SegmentValue.CATALOG_MEDIA;
  catalogTypeOptions = SegmentValueMst.SegmentValue.CATALOG_TYPE;

  ngOnInit(): void {
    document.querySelector('body').scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });

    addEventListener('load', () => {
      const perfEntries = performance.getEntriesByType('navigation');
      if (perfEntries[0]['type'] !== 'reload') {
        this.route.queryParams.subscribe((params) => {
          if (params.isDelete) {
            this.deleted = true;
          } else {
            this.setDisplayValue();
            this.sessionStraceSearch();
          }
        });
      }
    });

    this.storeAppFacade.user$
      .pipe(filter((value) => !value.permissions.atUser))
      .subscribe((value) => {
        this.shougou = value.info.shougou;
      });

    // TODO: 権限処理
  }

  // TODO: エラー分岐
  errorMessages: string[];

  /**
   * 削除通知を閉じる
   */
  close() {
    this.deleted = false;
  }

  /**
   * inputのvalueを更新する
   * @param event イベント
   * @param type shougou | catalogNm
   */
  changeInput(
    event: HTMLEvent<HTMLInputElement>,
    type: 'shougou' | 'catalogNm'
  ) {
    if (type === 'shougou') {
      this.shougou = event.target.value;
    } else if (type === 'catalogNm') {
      this.catalogNm = event.target.value;
    }
  }

  /**
   *
   * @param value プルダウンメニューの値
   * @param type プルダウンメニューの種類
   */
  changeSelect(value: string, type: 'status' | 'catalogMedia' | 'catalogType') {
    switch (type) {
      case 'status':
        this.status = value;
        break;
      case 'catalogType':
        this.catalogType = value;
        break;
      case 'catalogMedia':
        this.catalogMedia = value;
        break;
    }
    this.changeColor(value);
  }

  /**
   * タグ追加処理
   * @param selectTags 選択したタグ
   */
  onReceiveTagData(selectTags: string[]) {
    this.tags = selectTags;
  }

  /**
   * 検索するボタン押下処理
   * @param catalogNm カタログ名
   */
  onSearchButtonClick() {
    if (!this.shougou) {
      this.errorMessages = ['商号は必須です'];
    }
    const sendValue = this.generateCatalogListSearchRequest();

    sessionStorage.setItem('catalogList', JSON.stringify(sendValue));

    sessionStorage.setItem('catalogDisplayValue', JSON.stringify(sendValue));
    this.store.search(sendValue);
    this.displaySearchResultAreaFlg = true;
  }

  /**
   * ソート処理
   * @param sortState sortイベント
   */
  sortChange(sortState: Sort) {
    if (!this.shougou) {
      throw new Error('商号は必須です。');
    }
    const sendValue = this.generateCatalogListSearchRequest();

    if (sortState.direction) {
      sendValue['sort'] = sortState.active;
      sendValue['order'] = sortState.direction;
    }

    this.store.search(sendValue);
    this.displaySearchResultAreaFlg = true;
  }

  /**
   * クリアボタン処理
   */
  onClearButtonClick() {
    this.storeAppFacade.user$.subscribe((value) => {
      if (value.permissions.atUser) {
        this.shougou = '';
      }
    });
    this.catalogNm = '';
    this.tags = [];
    sessionStorage.removeItem('catalogDisplayValue');
  }

  /**
   * ページネーション押下処理
   * @param page ページ
   */
  onClickPageNationButtonClick(page: number) {
    if (!this.shougou) {
      throw new Error('商号は必須です。');
    }
    const sendValue = this.generateCatalogListSearchRequest();
    sendValue['page'] = page;

    this.store.search(sendValue);
    this.displaySearchResultAreaFlg = true;
  }

  /**
   * 表示する値を更新する
   */
  setDisplayValue() {
    const displayValue = JSON.parse(
      sessionStorage.getItem('catalogDisplayValue')
    );
    this.shougou = displayValue?.shougou ? displayValue.shougou : '';
    this.catalogType = displayValue?.catalogType
      ? displayValue.catalogType
      : undefined;
    this.catalogMedia = displayValue?.catalogMedia
      ? displayValue.catalogMedia
      : undefined;
    this.catalogNm = displayValue?.catalogNm ? displayValue.catalogNm : '';
    this.tags = displayValue?.catalogTag ? displayValue.catalogTag : [];
    this.status = displayValue?.koukaiJoutai
      ? displayValue.koukaiJoutai
      : undefined;
  }

  /**
   * 詳細ページ遷移前の検索条件で検索する
   */
  sessionStraceSearch() {
    const conditions = JSON.parse(sessionStorage.getItem('catalogList'));

    if (conditions.shougou) {
      this.store.search(conditions);
      this.displaySearchResultAreaFlg = true;
    }
  }

  /**
   * カタログ検索のリクエストを生成する
   * @returns カタログ検索のリクエスト内容
   */
  generateCatalogListSearchRequest(): CatalogListSearchRequest {
    return {
      page: 1,
      count: 10,
      shougou: this.shougou,
      catalogNm: this.catalogNm ? this.catalogNm : null,
      catalogMedia: this.catalogMedia !== undefined ? this.catalogMedia : null,
      catalogType: this.catalogType !== undefined ? this.catalogType : null,
      koukaiJoutai: this.status !== undefined ? this.status : null,
      catalogTag: this.tags.length > 0 ? this.tags : null,
    };
  }
}
