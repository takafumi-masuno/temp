import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'athome-customhouse-part-fixed-footer',
  templateUrl: './part-fixed-footer.component.html',
  styleUrls: ['./part-fixed-footer.component.scss'],
})
export class PartFixedFooterComponent implements OnDestroy {
  @Input() isFixedPosition = false;

  // TOPへ戻るボタンを表示するかどうかのフラグ
  showToTopButton = false;
  // showToTopButtonが変更されたかどうかのフラグ。初期にアニメーションを無効にするため。
  showToTopButtonHadChanged = false;
  private scrollEventSubscription: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.showToTopButton = window.scrollY > 500;

      this.scrollEventSubscription = fromEvent(window, 'scroll').subscribe(() =>
        this.scrollFixedBar()
      );
    }
  }

  ngOnDestroy() {
    if (this.scrollEventSubscription) {
      this.scrollEventSubscription.unsubscribe();
    }
  }

  // スクロールした際のTOPへ戻るボタンの表示非表示
  private scrollFixedBar() {
    const currentShowToTopButton = window.scrollY > 500;
    if (
      !this.showToTopButtonHadChanged &&
      this.showToTopButton !== currentShowToTopButton
    ) {
      this.showToTopButtonHadChanged = true;
    }
    this.showToTopButton = currentShowToTopButton;
  }

  // TOPへ戻る
  toPageTop() {
    document.querySelector('body').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
