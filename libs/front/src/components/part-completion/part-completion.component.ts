import { Component, Input } from '@angular/core';

@Component({
  selector: 'athome-customhouse-part-completion',
  templateUrl: './part-completion.component.html',
  styleUrls: ['./part-completion.component.scss'],
})
export class PartCompletionComponent {
  @Input() selectedItem: string;
  @Input() userConfirm: boolean;

  // 表示切替
  deleted = true;

  // 削除通知閉じる
  close() {
    this.deleted = false;
  }
}
