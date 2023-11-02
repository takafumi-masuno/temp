import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, map, takeUntil } from 'rxjs';
import { Info } from './models';

interface InfoPreviewState {
  info: Info;
  error: {
    code: number;
    message: string;
  };
}

@Injectable()
/**
 * お知らせ情報Store
 */
export class InfoPreviewStore extends ComponentStore<InfoPreviewState> {
  constructor(private route: ActivatedRoute) {
    super({
      info: null,
      error: null,
    });

    this.route.data
      .pipe(
        map((data) => data.info),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.setInfo(data.info);
      });
  }

  readonly info$: Observable<Info> = this.select((state) => state.info);
  readonly error$: Observable<{ code: number; message: string }> = this.select(
    (state) => state.error
  );

  /**
   * お知らせ情報をセットする
   */
  readonly setInfo = this.updater<Info>((state, info) => {
    return { ...state, info };
  });

  /**
   * エラーをセットする
   */
  readonly setError = this.updater<{ code: number; message: string }>(
    (state, error) => {
      return { ...state, error };
    }
  );
}
