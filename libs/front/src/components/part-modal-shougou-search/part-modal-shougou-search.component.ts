import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-modal-shougou-search',
  templateUrl: './part-modal-shougou-search.component.html',
  styleUrls: ['./part-modal-shougou-search.component.scss'],
  animations: [
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalShougouSearchComponent {
  // 表示切替
  noResult = false;
  selected = '';

  @Input() shougouList: string[];
  @Input() isKana = true;

  // 親コンポーネントへ渡すデータ
  @Output() showShougouFromChild = new EventEmitter();
  @Output() searchShougouFromChild = new EventEmitter();
  passShougou(msg: string) {
    this.showShougouFromChild.emit(msg);
  }

  @ViewChild('scrollContents') scrollContents: ElementRef;
  @ViewChild('modalWrapper') modalWrapper: ElementRef;
  showShougouModal = false;
  contentOver = false;

  windowHeight: number = window.innerHeight;

  // モーダルを開く/閉じる
  open() {
    this.showShougouModal = true;
    this.contentOver =
      this.scrollContents.nativeElement.offsetHeight > this.windowHeight - 343
        ? true
        : false;
  }
  close() {
    this.showShougouModal = false;
    this.shougouList = null;
  }

  /**
   * 商号検索処理
   * @param memberName 商号
   * @param memberNameKana 商号カナ
   */
  showResult(memberName: string, memberNameKana: string) {
    this.searchShougouFromChild.emit({
      memberName,
      memberNameKana,
    });

    setTimeout(() => {
      if (this.shougouList.length > 0) {
        this.contentOver =
          this.scrollContents.nativeElement.offsetHeight >
          this.windowHeight - 343
            ? true
            : false;
      } else {
        this.noResult = true;
      }
    }, 100);
  }
}
