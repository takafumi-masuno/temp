import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'athome-customhouse-part-search-result',
  templateUrl: './part-search-result.component.html',
  styleUrls: ['./part-search-result.component.scss'],
})
export class PartSearchResultComponent implements OnChanges {
  @Input() total: number;
  @Input() page: number;
  @Input() displayNum: number;

  resultsNumberCurrent = '';

  ngOnChanges() {
    this.resultsNumberCurrent = this.createCurrentResultsNumberLabel(
      this.total,
      this.page,
      this.displayNum
    );
  }

  /**
   * トータル、ページ、表示件数から、現在ページの表示件数（ex: 1～10件）ラベルを作成する
   * @param total トータル
   * @param page ページ
   * @param LIMIT_PER_PAGE 表示件数
   */
  createCurrentResultsNumberLabel(
    total: number,
    page: number,
    displayNum: number
  ) {
    return `${displayNum * (page - 1) + 1}～${
      Math.ceil(total / displayNum) === page ? total : displayNum * page
    }`;
  }
}
