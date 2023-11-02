import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { PrecedentListStore } from './precedent-list.store';
import { PrecedentListRequest } from './model/precedent-list';
import { SegmentValueMst } from '../shared/constants';
import { StoreAppFacade } from '../shared/stores/app';

@Component({
  selector: 'athome-customhouse-precedent-list',
  templateUrl: './precedent-list.component.html',
  styleUrls: ['./precedent-list.component.scss'],
  providers: [PrecedentListStore],
})
export class PrecedentListComponent implements AfterViewInit {
  constructor(
    public store: PrecedentListStore,
    public storeAppFacade: StoreAppFacade
  ) {}

  page: number;
  cnt_precedents: number;
  selectors: string;
  dataSort: string;
  shougou: string;
  shougouKana: string;
  kenchikuKouhou: number;
  kakakutaiFrom: number;
  kakakutaiTo: number;
  shunkouNentukiFrom: string;
  shunkouNentukiTo: string;
  madoriKubun: number;
  koukaiJoutai: number;
  segmentValues = SegmentValueMst.SegmentValue;

  // 削除アラート表示切替
  deleted = false;

  // 削除通知閉じる
  close() {
    this.deleted = false;
  }

  // プレースホルダーの文字色設定
  selectValue = '';
  fontColor = '';
  changeColor(value) {
    this.selectValue = value;
    if (value !== '') {
      this.fontColor = '#707070';
    }
  }
  fontColorReset() {
    this.fontColor = '';
  }

  // 建築事例一覧表
  displayedColumns: string[] = [
    'position',
    'shougou',
    'image',
    'price',
    'kenchiku_kouhou',
    'shikichi_menseki',
    'nobeyuka_menseki',
    'shunkou_nentuki',
    'madori_kubun',
    'koukai_joutai',
    'detail',
  ];

  // TODO 権限処理 下記は権限による表示切替確認用
  atUserKengen: boolean;

  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.atUserKengen = true;
    this.storeAppFacade.user$.subscribe((value) => {
      if (!this.atUserKengen) {
        this.shougou = value.info.shougou;
      }
    });
  }

  /**
   * 検索処理 検索ボタン押下
   * @param dataSort テーブルヘッダーのsortボタン押下
   */
  searchPrecedentList(dataSort?: string, page?: number) {
    // TODO エラー処理 商号入力欄に何も入ってない場合
    if (!this.shougou || this.shougou.trim() === '') {
      throw new Error('商号は必須です。');
    } else {
      const request: PrecedentListRequest = {
        page: page,
        sort: dataSort,
        shougou: this.shougou,
        shougouKana: this.shougouKana,
        kenchikuKouhou: this.kenchikuKouhou,
        kakakutaiFrom: this.kakakutaiFrom,
        kakakutaiTo: this.kakakutaiTo,
        shunkouNentukiFrom: this.shunkouNentukiFrom,
        shunkouNentukiTo: this.shunkouNentukiTo,
        madoriKubun: this.madoriKubun,
        koukaiJoutai: this.koukaiJoutai,
      };
      this.store.searchPrecedentList(request);
    }
  }

  /**
   * 一覧のテーブルヘッダー押下で検索
   * @param sortState テーブルヘッダーの値
   */
  announceSortChange(sortState: Sort) {
    if (sortState.direction === 'asc') {
      this.dataSort = '+' + sortState.active;
    } else {
      this.dataSort = '-' + sortState.active;
    }
    this.searchPrecedentList(this.dataSort);
  }

  onClickPageNationButtonClick(page: number, shougou: string) {
    if (!shougou) {
      throw new Error('商号は必須です。');
    } else {
      this.searchPrecedentList(shougou, page);
    }
  }
}
