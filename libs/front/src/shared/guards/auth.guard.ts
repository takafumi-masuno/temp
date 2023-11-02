import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, filter } from 'rxjs';
import { StoreAppFacade } from '../stores/app';
import { AtUserRoll, AtUserKengen, KenchikuKaishaUserRoll } from '../constants';
import { Permissions } from '../models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private storeAppFacade: StoreAppFacade,
    private router: Router,
    private cookieService: CookieService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    const sessionId = this.cookieService.get('sessionId');
    if (!sessionId) {
      this.router.navigate(['login'], {
        queryParams: { prevPage: `${location.pathname}` },
      });
      return false;
    } else {
      this.storeAppFacade.setIsSession(sessionId);

      this.storeAppFacade.isSession$.subscribe((value) => {
        if (value === false) {
          this.router.navigate(['login'], {
            queryParams: { prevPage: `${location.pathname}` },
          });
          return false;
        }
      });
    }

    // ユーザー情報と権限を取得する
    this.storeAppFacade.setUser(sessionId);

    this.storeAppFacade.user$.pipe(filter((x) => !!x)).subscribe((value) => {
      const { atUser, kenchikuKaishaUser } = value.permissions;
      const tenpoModelHouseNm = value.info.tenpoModelHouseNm;
      const currentPage = location.pathname;

      if (atUser && !kenchikuKaishaUser) {
        if (!checkPageOpenAtUserPermission(atUser, currentPage)) {
          this.router.navigate(['404']);
        }
      } else if (!atUser && kenchikuKaishaUser) {
        if (
          !checkPageOpenKenchikuPermission(
            kenchikuKaishaUser,
            currentPage,
            tenpoModelHouseNm
          )
        ) {
          this.router.navigate(['404']);
        }
      }
    });
    /**
     * TODO: エラー処理（セッションタイムアウト等
     * 現在はloginページ未実装のため404に遷移する
     */
    // this.storeAppFacade.user$.subscribe((value) => {
    //   if (!value) {
    //     this.router.navigate(['404']);
    //     return false;
    //   }
    // });

    return true;
  }
}

/**
 * アットホームユーザーのページ遷移制御
 * @param permission 権限
 * @param currentPage 現在のページ
 * @returns ページ遷移の可否
 */
const checkPageOpenAtUserPermission = (
  permission: Permissions['atUser'],
  currentPage: string
): boolean => {
  const regExp = /(register|edit)/g;

  if (
    ['home', 'info/detail', 'password/change'].some((page) =>
      currentPage.includes(page)
    )
  ) {
    return true;
  }

  if (
    currentPage.includes('conversion') &&
    permission.roll !== AtUserRoll.admin
  ) {
    return false;
  }

  switch (permission.roll) {
    case AtUserRoll.admin:
      return permission.permission === AtUserKengen.edit;
    case AtUserRoll.agency:
      if (permission.permission === AtUserKengen.readonly) {
        return !regExp.test(currentPage);
      } else if (permission.permission === AtUserKengen.edit) {
        return true;
      } else if (permission.permission === AtUserKengen.infoRegister) {
        return currentPage.includes('info');
      }
      break;
    case AtUserRoll.sales:
      if (permission.permission === AtUserKengen.readonly) {
        return (
          !regExp.test(currentPage) &&
          !currentPage.includes('info') &&
          !currentPage.includes('user')
        );
      } else if (permission.permission === AtUserKengen.edit) {
        return (
          !currentPage.includes('info') &&
          !currentPage.includes('company/register')
        );
      }
      break;
    case AtUserRoll.developer:
      if (permission.permission === AtUserKengen.readonly) {
        return !regExp.test(currentPage) && !currentPage.includes('info');
      } else if (permission.permission === AtUserKengen.edit) {
        return (
          !currentPage.includes('info') &&
          !currentPage.includes('company/register')
        );
      }
      break;
  }

  return false;
};

/**
 * 建築会社ユーザーのページ遷移制御
 * @param permission 権限
 * @param currentPage 現在のページ
 * @param tenpoModelHouseNm 店舗名
 * @returns ページ遷移の可否
 */
const checkPageOpenKenchikuPermission = (
  permission: Permissions['kenchikuKaishaUser'],
  currentPage: string,
  tenpoModelHouseNm?: string
): boolean => {
  if (
    ['home', 'info/detail', 'password/change'].some((page) =>
      currentPage.includes(page)
    )
  ) {
    return true;
  }

  if (currentPage.includes('info')) {
    return false;
  }

  if (tenpoModelHouseNm && currentPage.includes('company')) {
    return false;
  }

  if (currentPage.includes('conversion')) {
    return permission.conversionReception ? true : false;
  }

  switch (permission.roll) {
    case KenchikuKaishaUserRoll.admin:
      return true;
    case KenchikuKaishaUserRoll.general:
      return currentPage.includes('user') ? false : true;
    default:
      return false;
  }
};
