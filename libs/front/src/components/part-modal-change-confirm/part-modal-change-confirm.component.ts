import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-modal-change-confirm',
  templateUrl: './part-modal-change-confirm.component.html',
  styleUrls: ['./part-modal-change-confirm.component.scss'],
  animations: [
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalChangeConfirmComponent {
  @Input() conversion: boolean;
  @Input() henkou: boolean;
  @Input() sameTime: boolean;

  @Output() buttonClick = new EventEmitter();

  onClick() {
    this.buttonClick.emit();
  }

  showChangeModal = false;

  // モーダルを開く/閉じる
  open() {
    this.showChangeModal = true;
  }
  close() {
    this.showChangeModal = false;
  }
}
