import { APP_BASE_HREF, isPlatformServer, Location } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/component-store';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { Observable, of, OperatorFunction, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TransferStateService } from './transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: unknown,
    @Inject(APP_BASE_HREF) private baseHref: string,
    @Optional() @Inject(RESPONSE) private response: Response,
    private transferStateService: TransferStateService,
    private router: Router,
    private location: Location
  ) {}

  public resolveFirstView<T, O>(
    url: string,
    project: (value: T, index: number) => Observable<O>
  ): OperatorFunction<T, { firstView: O; fetched: boolean; value: T }> {
    return this.resolve(
      url,
      'first-view',
      'firstView',
      project
    ) as OperatorFunction<T, { firstView: O; fetched: boolean; value: T }>;
  }

  public resolveTicket<T, O>(
    url: string,
    project: (value: T, index: number) => Observable<O>
  ): OperatorFunction<T, { ticket: O; fetched: boolean; value: T }> {
    return this.resolve(url, 'ticket', 'ticket', project) as OperatorFunction<
      T,
      { ticket: O; fetched: boolean; value: T }
    >;
  }

  private resolve<T, O>(
    url: string,
    id: string,
    fieldName: string,
    project: (value: T, index: number) => Observable<O>
  ) {
    const item = this.transferStateService.getItems<O>(id);
    return pipe(
      switchMap((value: T, index) =>
        (item
          ? of({ item, fetched: false })
          : project(value, index).pipe(
              tapResponse(
                (item) => this.transferStateService.getItems(id, item),
                () => this.navigateToNotFoundPage(url)
              ),
              map((item) => ({ item, fetched: true }))
            )
        ).pipe(
          map(({ item, fetched }) => ({ value, fetched, [fieldName]: item }))
        )
      )
    );
  }

  navigateTo(
    route: string,
    redirect: boolean,
    queryParams = {},
    statusCode?: number,
    currentUrl?: string
  ) {
    if (isPlatformServer(this.platformId)) {
      const url =
        queryParams && Object.keys(queryParams).length
          ? `${route}?${Object.entries(queryParams)
              .map(([key, value]) => `${key}=${value}`)
              .join('&')}`
          : route;
      if (redirect) {
        this.response.status(301);
        this.response.setHeader('Location', url);
      } else {
        if (statusCode) {
          this.response.status(statusCode);
        }
        this.transferStateService.getItems(
          'redirect',
          url.replace(this.baseHref, '')
        );
      }
    }
    this.router
      .navigate([route.replace(this.baseHref, '')], {
        skipLocationChange: !redirect,
        queryParams,
      })
      .then(() => {
        if (currentUrl) {
          this.location.replaceState(currentUrl);
        }
      });
  }

  navigateToNotFoundPage(currentUrl?: string) {
    this.navigateTo('/404', false, {}, 404, currentUrl);
  }
}
