import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { InfoListStore } from './info-list.store';
import { InfoListSearchRequest } from './models';
import { HTMLEvent } from '../shared/models/events';
import { Router } from '@angular/router';
import { StoreAppFacade } from '../shared/stores/app';

@Component({
  selector: 'athome-customhouse-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss'],
  providers: [InfoListStore],
})
export class InfoListComponent {
  constructor(
    public store: InfoListStore,
    public router: Router,
    public storeAppFacade: StoreAppFacade
  ) {}
  // エラーメッセージ
  errorList: string[];

  title = '';
  koukaiJoutai = '';

  // 表示切替
  deleted = true;
  displayFlg = false;

  // TODO: 削除後に遷移したときの処理
  // 削除通知閉じる
  close() {
    this.deleted = false;
  }

  // 公開状態のデザイン調整用
  selectValue = '';
  fontColor = '';
  changeColor(value: string) {
    this.selectValue = value;
    if (value !== '') {
      this.fontColor = '#707070';
    }
  }

  // お知らせ一覧表
  displayedColumns: string[] = [
    'position',
    'title',
    'keisaiKikan',
    'createDate',
    'koukaiJoutai',
    'detail',
  ];

  /**
   * タイトルのvalueを更新
   * @param event inputChangeイベント
   */
  onChangeInputValue(event: HTMLEvent<HTMLInputElement>) {
    this.title = event.target.value;
  }

  /**
   * 公開状態のvalueを更新
   * @param event selectChangeイベント
   */
  onChangeSelectValue(event: HTMLEvent<HTMLSelectElement>) {
    this.koukaiJoutai = event.target.value;

    this.changeColor(event.target.value);
  }

  /**
   * 検索
   */
  onClickSearch() {
    this.store.search(this.generateRequest());
    this.displayFlg = true;
  }

  /**
   * ソート
   * @param sortState sortイベント
   */
  onClickSort(sortState: Sort) {
    if (sortState.direction) {
      const sort =
        sortState.direction === 'asc'
          ? `+${sortState.active}`
          : `-${sortState.active}`;

      this.store.search(this.generateRequest(null, sort));
      this.displayFlg = true;
    }
  }

  /**
   * ページネーション
   * @param page ページ番号
   */
  onClickPageNation(page: number) {
    this.store.search(this.generateRequest(page));
    this.displayFlg = true;
  }

  /**
   * リクエスト生成
   * @param page ページ番号
   * @param sort ソートイベント
   * @returns bffに渡すリクエスト
   */
  generateRequest(page?: number, sort?: string): InfoListSearchRequest {
    return {
      page: page ? page : 1,
      count: 10,
      isPublish: 0,
      koukaiJoutai:
        this.koukaiJoutai == 'undefined' ? this.koukaiJoutai : undefined,
      title: this.title,
      sort: sort ? sort : null,
    };
  }
}
