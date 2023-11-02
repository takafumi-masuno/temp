import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-modal-store-search',
  templateUrl: './part-modal-store-search.component.html',
  styleUrls: ['./part-modal-store-search.component.scss'],
  animations: [
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalStoreSearchComponent {
  // 表示切替
  selected = '';

  // 親コンポーネントへ渡すデータ
  @Output() showStoreFromChild = new EventEmitter();
  passStore(msg: string) {
    this.showStoreFromChild.emit(msg);
  }

  @ViewChild('scrollContents') scrollContents: ElementRef;
  showStoreModal = false;
  contentOver = false;

  windowHeight: number = window.innerHeight;

  // モーダルを開く/閉じる
  open() {
    this.showStoreModal = true;
    if (
      this.scrollContents.nativeElement.offsetHeight >
      this.windowHeight - 316
    ) {
      this.contentOver = true;
    } else {
      this.contentOver = false;
    }
  }
  close() {
    this.showStoreModal = false;
  }
}
