import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import merge from 'lodash/merge';

import { StoreSearchFacade } from '../stores/store-search';
import { TransferStateService } from '@shared/services';
import { StoreAppFacade } from '../stores/app';
import { UserAgentService } from '@shared/services';
import { QueryParamsService } from './query-params.service';

@Injectable({
  providedIn: 'root',
})
export class PostSendService {
  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    @Inject(DOCUMENT) private document: Document,
    private transferStateService: TransferStateService,
    private router: Router,
    private storeSearchFacade: StoreSearchFacade,
    private storeAppFacade: StoreAppFacade,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParamsService,
    private userAgentService: UserAgentService
  ) {}

  public isSSR(): boolean {
    return this.transferStateService.getItems<boolean>('SSR', null);
  }

  public getNavigationDetails(
    path: string,
    queryParams?: Params,
    mergeParams = false
  ): { url: string; queryParams: Params } {
    const [url, urlParams] = path.split('?');
    return {
      url,
      queryParams: merge(
        mergeParams ? { ...this.activatedRoute.snapshot.queryParams } : {},
        queryParams,
        urlParams
          ?.split('&')
          .map((param) => param.split('='))
          .reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1] }), {})
      ),
    };
  }

  send<T>(path, params: T, target = null, method = 'post') {
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    if (target && !this.userAgentService.isOtherBrowser()) {
      form.target = target;
    }

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key] as unknown as string;

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    return null;
  }

  /** 周辺マップを別ウィンドウで開く */
  public sendToWindow(path: string) {
    window.open(
      path,
      '',
      'width=1020px,height=830px,scrollbars=yes,resizable=yes,location=yes'
    );
  }
}
