import { Component } from '@angular/core';
import { InfoPreviewStore } from './info-preview.store';
import { Router } from '@angular/router';

@Component({
  selector: 'athome-customhouse-info-preview',
  templateUrl: './info-preview.component.html',
  styleUrls: ['./info-preview.component.scss'],
  providers: [InfoPreviewStore],
})
/**
 *お知らせ情報component
 */
export class InfoPreviewComponent {
  errorList: string[];

  constructor(private router: Router, public store: InfoPreviewStore) {}
  // TODO: 画像とPDFを表示するための処理
  convertToImage() {
    this.store.info$.subscribe((value) => {
      return `data:image/png;base64, ${value.gazou}`;
    });
  }

  /**
   * 前へボタン押下処理
   */
  onClickPreviousButton() {
    this.store.info$.subscribe((value) => {
      if (value.previousId) {
        this.router.navigate([`info/detail/${value.previousId}`]);
      }
    });
  }

  /**
   * 次へボタン押下処理
   */
  onClickNextButton() {
    this.store.info$.subscribe((value) => {
      if (value.nextId) {
        this.router.navigate([`info/detail/${value.nextId}`]);
      }
    });
  }

  // TODO: ERROR処理
}
