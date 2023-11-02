import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'athome-customhouse-part-pagination',
  templateUrl: './part-pagination.component.html',
  styleUrls: ['./part-pagination.component.scss'],
})
export class PartPaginationComponent implements OnChanges {
  @Input() page: number;
  @Input() total: number;
  @Input() displayNum: number;

  @Output() selectPageNumber = new EventEmitter<number>();

  paginationList = [];
  totalPage = 0;

  ngOnChanges() {
    this.createPaginationList(this.page, this.total);
  }

  selectPage(selectPageNumber: number) {
    this.selectPageNumber.emit(selectPageNumber);
  }

  createPaginationList(currentPage: number, total: number) {
    this.totalPage = Math.ceil(total / this.displayNum);
    const allPaginationList = [...Array(this.totalPage)].map((_, i) => i + 1);
    if (this.totalPage >= 2) {
      if (currentPage <= 5) {
        // 現在ページが5ページ以下の時、1ページ目から10件目までをリストに追加
        this.paginationList = allPaginationList.slice(0, 10);
      } else if (this.totalPage <= currentPage + 5) {
        // 現在ページが最後のページから5ページ以内の時、最後から10件をリストに追加
        this.paginationList = allPaginationList.slice(-10);
      } else {
        // 現在のページが中央に来るように-5, +5の範囲のページをリストに追加
        this.paginationList = allPaginationList.slice(
          currentPage - 5,
          currentPage + 5
        );
      }
    }
  }
}
