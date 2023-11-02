import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-side-menu',
  templateUrl: './part-side-menu.component.html',
  styleUrls: ['./part-side-menu.component.scss'],
  animations: [
    trigger('accordion', [
      state('close', style({ height: '0' })),
      state('open', style({ height: '*' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartSideMenuComponent {
  // アコーディオンのタイトルリスト
  public items = [
    'お知らせ',
    '建築会社',
    'カタログ',
    '建築事例',
    '店舗・モデルハウス',
    'イベント',
    '住宅展示場',
    '反響',
    'ユーザー',
  ];
  expandedIndex = 0;
}
