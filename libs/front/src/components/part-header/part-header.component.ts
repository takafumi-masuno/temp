import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { StoreAppFacade } from '../..//shared/stores/app';

@Component({
  selector: 'athome-customhouse-part-header',
  templateUrl: './part-header.component.html',
  styleUrls: ['./part-header.component.scss'],
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
export class PartHeaderComponent {
  constructor(public storeAppFacade: StoreAppFacade) {}

  @Input() public isLogin: boolean; // ログアウトボタン表示切替

  // ログアウト確認モーダル
  modal = false;
  open() {
    this.modal = true;
  }
  close() {
    this.modal = false;
  }

  windowHeight: number = window.innerHeight;
  modalHeight: number = this.windowHeight - 246;
}
