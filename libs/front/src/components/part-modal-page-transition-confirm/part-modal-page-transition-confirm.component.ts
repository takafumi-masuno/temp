import { Component, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-modal-page-transition-confirm',
  templateUrl: './part-modal-page-transition-confirm.component.html',
  styleUrls: ['./part-modal-page-transition-confirm.component.scss'],
  animations: [
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalPageTransitionConfirmComponent {
  showPageTransitionModal = false;

  @Output() buttonClick = new EventEmitter();
  onClick() {
    this.buttonClick.emit();
  }

  // モーダルを開く/閉じる
  open() {
    this.showPageTransitionModal = true;
  }
  close() {
    this.showPageTransitionModal = false;
  }
}
