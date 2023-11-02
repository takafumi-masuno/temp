/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { SiteCdService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class GetConpaneTopFirstViewService {
  constructor(private siteCdService: SiteCdService) {}

  setScreen = 'conpane-top';

  /**
   * 空き家TOPのファーストビューを取得するAPI。
   * @param request IFvTopRequest
   */
  // execute(): Observable<IFvConpaneTop> {
  //   const prm = {
  //     siteCd: this.siteCdService.getSiteCd(),
  //     pageSetting: CsitePageSetting.page.top,
  //     breadcrumbCd: CsiteBreadCrumbCdList.page.top,
  //     /** 下記2つのパラメーターはテスト表示のため固定値とfalseを渡している。 */
  //     seoNm: 'customhouse-conpane',
  //     requireConditions: false,
  //   };
  //   const response: Observable<IFvConpaneTop> = {
  //     source: undefined,
  //     operator: undefined,
  //     lift: function <R>(operator?: Operator<IFvConpaneTop, R>): Observable<R> {
  //       throw new Error('Function not implemented.');
  //     },
  //     subscribe: function (
  //       observerOrNext?:
  //         | Partial<Observer<IFvConpaneTop>>
  //         | ((value: IFvConpaneTop) => void)
  //     ): Subscription {
  //       throw new Error('Function not implemented.');
  //     },
  //     forEach: function (next: (value: IFvConpaneTop) => void): Promise<void> {
  //       throw new Error('Function not implemented.');
  //     },
  //     pipe: function (): Observable<IFvConpaneTop> {
  //       throw new Error('Function not implemented.');
  //     },
  //     toPromise: function (): Promise<IFvConpaneTop> {
  //       throw new Error('Function not implemented.');
  //     },
  //   };
  //   return response;
  // }
}
