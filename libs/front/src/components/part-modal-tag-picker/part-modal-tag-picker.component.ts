import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  OnInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { HTMLEvent } from '../../shared/models/events';
import { Catalog } from './enum/catalog';

@Component({
  selector: 'athome-customhouse-part-modal-tag-picker',
  templateUrl: './part-modal-tag-picker.component.html',
  styleUrls: ['./part-modal-tag-picker.component.scss'],
  animations: [
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalTagPickerComponent implements OnInit {
  selected: string[] = [];
  selectedPrecedentTag: string[] = [];
  selectedPrecedentCategoryTag: string[] = [];
  selectedStoreTag: string[] = [];

  @Input() catalog: boolean;
  @Input() precedent: boolean;
  @Input() precedentCategory: boolean;
  @Input() store: boolean;
  @Input() checked: string[];

  catalogList = Catalog;

  ngOnInit(): void {
    this.catalogList = Catalog.map((catalogData) => {
      const value = catalogData.value.map((value) => {
        if (this.checked.includes(value.value)) {
          this.selected.push(value.value);
          return {
            ...value,
            checked: true,
          };
        } else {
          return value;
        }
      });
      return {
        ...catalogData,
        value,
      };
    });
  }

  showChangeModal = false;

  // 親コンポーネントへ渡すデータ
  @Output() showCatalogTagFromChild = new EventEmitter();
  passShowCatalogTag(msg: string[]) {
    this.showCatalogTagFromChild.emit(msg);
  }
  @Output() showPrecedentTagFromChild = new EventEmitter();
  passShowPrecedentTag(msg: string[]) {
    this.showPrecedentTagFromChild.emit(msg);
  }
  @Output() showPrecedentCategoryTagFromChild = new EventEmitter();
  passShowPrecedentCategoryTag(msg: string[]) {
    this.showPrecedentCategoryTagFromChild.emit(msg);
  }
  @Output() showStoreTagFromChild = new EventEmitter();
  passShowStoreTag(msg: string[]) {
    this.showStoreTagFromChild.emit(msg);
  }

  // カタログタグ選択モーダル
  @ViewChild('scrollContents') scrollContents: ElementRef;
  @ViewChild('modalWrapper') modalWrapper: ElementRef;
  showTagModal = false;
  contentOver = false;

  windowHeight: number = window.innerHeight;
  modalHeight: number = this.windowHeight - 246;

  // モーダルを開く/閉じる
  open() {
    this.showTagModal = true;

    this.contentOver =
      this.scrollContents.nativeElement.offsetHeight > this.modalHeight - 120
        ? true
        : false;
  }
  close() {
    this.showTagModal = false;
    console.log(this.catalogList);
  }

  changeSelected(event: HTMLEvent<HTMLInputElement>) {
    if (event.target.checked) {
      this.selected.push(event.target.value);
    } else {
      this.selected = this.selected.filter((a) => a !== event.target.value);
    }
  }
  changePrecedentTag(event: HTMLEvent<HTMLInputElement>) {
    if (event.target.checked) {
      this.selectedPrecedentTag.push(event.target.value);
    } else {
      this.selectedPrecedentTag = this.selectedPrecedentTag.filter(
        (a) => a !== event.target.value
      );
    }
  }
  changePrecedentCategoryTag(event: HTMLEvent<HTMLInputElement>) {
    if (event.target.checked) {
      this.selectedPrecedentCategoryTag.push(event.target.value);
    } else {
      this.selectedPrecedentCategoryTag =
        this.selectedPrecedentCategoryTag.filter(
          (a) => a !== event.target.value
        );
    }
  }
  changeStoreTag(event: HTMLEvent<HTMLInputElement>) {
    if (event.target.checked) {
      this.selectedStoreTag.push(event.target.value);
    } else {
      this.selectedStoreTag = this.selectedStoreTag.filter(
        (a) => a !== event.target.value
      );
    }
  }
}
