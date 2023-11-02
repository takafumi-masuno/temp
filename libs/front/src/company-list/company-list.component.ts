import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyListStore } from './company-list.store';
import { MatSort, Sort } from '@angular/material/sort';
import { SegmentType, SegmentValueMst } from '../shared/constants';
import { StoreAppFacade } from '../shared/stores/app';
import { filter } from 'rxjs';

@Component({
  selector: 'athome-customhouse-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [CompanyListStore],
})
/**
 * 建築会社一覧
 */
export class CompanyListComponent implements OnInit {
  constructor(
    public store: CompanyListStore,
    public storeAppFacade: StoreAppFacade,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  // 検索条件
  searchKaiinNo = '';
  searchShougou = '';
  searchShougouKana = '';
  searchTel = '';
  selectValue = 0;

  // 検索条件プルダウン公開状態のデザイン調整用
  fontColor = '';

  // 建築会社一覧表
  displayedColumns: string[] = [
    'position',
    'shougou',
    'kaishaType',
    'yuubinNo',
    'shozaichi',
    'tel',
    'koukaiJoutai',
    'detail',
  ];

  // 公開状態プルダウン選択肢
  koukaiJoutaiOptions: SegmentType[] = [];

  ngOnInit() {
    this.koukaiJoutaiOptions = this.createKoukaiJoutaiOptions(
      SegmentValueMst.SegmentValue.KOUKAI_JOUTAI
    );
    /**
     * 建築会社ユーザーの場合に、商号と商号カナを設定
     */
    this.storeAppFacade.user$
      .pipe(filter((value) => !value?.permissions.atUser))
      .subscribe((data) => {
        this.searchShougou = data?.info.shougou;
        this.searchShougouKana = data?.info.shougouKana;
      });
  }

  /**
   * 検索条件プルダウン公開状態のデザイン調整
   */
  changeColor() {
    if (this.selectValue === 0) {
      // 初期値以外→初期値の操作をした場合フォントカラーが初期化されないので設定
      this.fontColor = '';
    } else {
      this.fontColor = '#707070';
    }
  }

  /**
   * クリアボタン押下時にデザイン調整のフォントカラーもクリアする
   */
  resetFontColor() {
    this.selectValue = 0;
    this.fontColor = '';
  }

  /**
   * 削除完了通知を表示する
   */
  notifyDelete() {
    this.store.setDeletedNotice(true);
  }

  /**
   * 削除完了通知を非表示にする
   */
  closeDeleteNotification() {
    this.store.setDeletedNotice(false);
  }

  /**
   * ソート順変更
   */
  changeSort(sortState: Sort) {
    const prm = {
      sort: sortState.active,
      order: sortState.direction,
      page: 1,
    };
    this.store.setSort(prm);

    // アクセシビリティ用
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /**
   * ページ移動
   */
  movePage(page: number) {
    this.store.setPage(page);
  }

  /**
   * 検索
   */
  onSearch() {
    const prm = {
      searchKaiinNo: this.searchKaiinNo,
      searchShougou: this.searchShougou,
      searchShougouKana: this.searchShougouKana,
      searchTel: this.searchTel,
      selectValue: this.selectValue,
    };
    this.store.setCompanySearch(prm);
  }

  /**
   * 公開状態プルダウンの選択肢を作成する
   */
  createKoukaiJoutaiOptions(options: SegmentType[]): SegmentType[] {
    const defalutOption: SegmentType = {
      value: 0,
      nm: 'すべて',
      sort: 1,
    };
    const sortKoukaiJoutaiOptions = [
      ...options.slice(-(options.length - 1)),
      options[0],
    ];
    return [defalutOption, ...sortKoukaiJoutaiOptions];
  }
}
