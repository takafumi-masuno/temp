import { Injectable, PLATFORM_ID, Inject, makeStateKey } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  transferStateKeys = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: unknown,
    private transferState: TransferState
  ) {}

  /** サーバtoクライアント関数 */
  public getItems<T>(baseString: string, item?: T): T {
    const key = `${baseString}-ITEMS`;
    this.transferStateKeys[key] =
      this.transferStateKeys[key] || makeStateKey(key);
    const serverResult = this.transferState.get<T>(
      this.transferStateKeys[key],
      null
    );

    if (serverResult) {
      this.transferState.remove(this.transferStateKeys[key]);
      return serverResult;
    }

    if (item === null) {
      return;
    }

    return this.setServerValue(key, item);
  }

  /** 非同期サーバtoクライアント関数
   * TODO: 必要ないかもしれない。
   */
  public getStreemItems<T>(
    baseString: string,
    stream$: Observable<T[]>
  ): Observable<T[]> {
    const key = `${baseString}-ITEMS`;
    this.transferStateKeys[key] =
      this.transferStateKeys[key] || makeStateKey(key);
    const serverResult = this.transferState.get<T[]>(
      this.transferStateKeys[key],
      null
    );

    if (serverResult) {
      this.transferState.remove(this.transferStateKeys[key]);

      return of(serverResult);
    }

    return stream$.pipe(map((items) => this.setServerValue(key, items)));
  }

  private setServerValue<T>(key: string, value: T): T {
    if (isPlatformServer(this.platformId)) {
      this.transferState.onSerialize(this.transferStateKeys[key], () => value);
    }

    return value;
  }

  /** ストア用サーバtoクライアント関数
   * @param baseString 保存Key名
   * @param store storeデータ
   */
  public storeState<T>(baseString: string, store: Observable<T>) {
    const key = `${baseString}-STORE-ITEM`;
    this.transferStateKeys[key] =
      this.transferStateKeys[key] || makeStateKey(key);

    if (isPlatformBrowser(this.platformId)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = this.transferState.get<any>(
        this.transferStateKeys[key],
        null
      );
      this.transferState.remove(this.transferStateKeys[key]);
      this.transferStateKeys[key] = null;
      return data;
    } else {
      this.transferState.onSerialize(this.transferStateKeys[key], () => {
        let state;
        store
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .subscribe((saveState: any) => {
            state = saveState;
          })
          .unsubscribe();
        return state;
      });
      return null;
    }
  }
}
