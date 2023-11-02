import { Component, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-modal-register-confirm',
  templateUrl: './part-modal-register-confirm.component.html',
  styleUrls: ['./part-modal-register-confirm.component.scss'],
  animations: [
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalRegisterConfirmComponent {
  showRegisterModal = false;

  @Output() buttonClick = new EventEmitter();

  onClick() {
    this.buttonClick.emit();
  }

  // モーダルを開く/閉じる
  open() {
    this.showRegisterModal = true;
  }
  close() {
    this.showRegisterModal = false;
  }
}
