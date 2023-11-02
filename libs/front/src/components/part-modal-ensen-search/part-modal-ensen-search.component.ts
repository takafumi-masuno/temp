import {
  Component,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-modal-ensen-search',
  templateUrl: './part-modal-ensen-search.component.html',
  styleUrls: ['./part-modal-ensen-search.component.scss'],
  animations: [
    trigger('accordion', [
      state('close', style({ height: '0' })),
      state('open', style({ height: '*' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalEnsenSearchComponent {
  showEnsenSearchModal = false;

  prefecture = true;
  line = false;
  station = false;

  public prefectureList: FormGroup;
  // 都道府県
  public selectPrefecture: FormControl;
  public selectLine: FormControl;
  public selectStation: FormControl;
  constructor(private _builder: FormBuilder) {
    // 都道府県
    this.selectPrefecture = new FormControl('');
    this.selectLine = new FormControl('');
    this.selectStation = new FormControl('');
    // 都道府県
    this.prefectureList = this._builder.group({
      selectPrefecture: this.selectPrefecture,
      selectLine: this.selectPrefecture,
      selectStation: this.selectPrefecture,
    });
  }

  selectedLine = '';
  selectedStation = '';
  // 親コンポーネントへ渡すデータ
  @Output() ensenLineFromChild = new EventEmitter();
  @Output() ensenStationFromChild = new EventEmitter();
  passEnsen(line: string, station: string) {
    this.ensenLineFromChild.emit(line);
    this.ensenStationFromChild.emit(station);
  }

  isSelected() {
    setTimeout(() => {
      if (this.selectLine.value) {
        this.line = false;
        this.station = true;
      } else if (this.selectPrefecture.value) {
        this.prefecture = false;
        this.line = true;
      }
    }, 1);
  }

  // アコーディオンのタイトルリスト
  public prefectures = [
    '北海道・東北',
    '関東',
    '甲信越・北陸',
    '東海',
    '近畿',
    '中国',
    '四国',
    '九州・沖縄',
  ];

  public lines = ['JR', '新幹線', 'その他'];

  public stations = ['ＪＲ奥羽本線'];
  // カタログタグ選択モーダル
  @ViewChild('scrollContents') scrollContents: ElementRef;
  @ViewChild('modalWrapper') modalWrapper: ElementRef;
  contentOver = false;

  windowHeight: number = window.innerHeight;
  modalHeight: number = this.windowHeight - 246;

  // モーダルを開く/閉じる
  open() {
    this.showEnsenSearchModal = true;
    if (this.scrollContents.nativeElement.offsetHeight > this.modalHeight) {
      this.contentOver = true;
    } else {
      this.contentOver = false;
    }
  }
  close() {
    this.showEnsenSearchModal = false;
  }
  isContentOver() {
    setTimeout(() => {
      if (this.scrollContents.nativeElement.offsetHeight > this.modalHeight) {
        this.contentOver = true;
      } else {
        this.contentOver = false;
      }
    }, 190);
  }
}
