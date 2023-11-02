import { Component, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'athome-customhouse-part-modal-delete-confirm',
  templateUrl: './part-modal-delete-confirm.component.html',
  styleUrls: ['./part-modal-delete-confirm.component.scss'],
  animations: [
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
})
export class PartModalDeleteConfirmComponent {
  @Output() clickDelete = new EventEmitter();

  passClickDeleteEvent() {
    this.clickDelete.emit();
  }

  showDeleteModal = false;

  // モーダルを開く/閉じる
  open() {
    this.showDeleteModal = true;
  }
  close() {
    this.showDeleteModal = false;
  }
}
