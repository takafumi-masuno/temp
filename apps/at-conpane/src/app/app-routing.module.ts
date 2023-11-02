import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '@front/shared/guards';
import { noMatch, matcherTop } from '@shared/router';

const routes: Routes = [
  {
    path: 'please_wait',
    loadChildren: () =>
      import('@front/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('@front/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    /** カタログ登録 */
    path: 'catalog/register',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/catalog-register/catalog-register.module').then(
        (m) => m.CatalogRegisterModule
      ),
  },
  {
    /** 住宅展示場トップ画面 */
    matcher: matcherTop,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/conpane-top/conpane-top.module').then(
        (m) => m.ConpaneTopModule
      ),
  },
  {
    /** ログイン画面 */
    path: 'login',
    loadChildren: () =>
      import('@front/login/login.module').then((m) => m.LoginModule),
  },
  {
    /**お知らせ情報画面 */
    path: 'info/detail/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/info-preview/info-preview.module').then(
        (m) => m.InfoPreviewModule
      ),
  },
  {
    /** お知らせ一覧画面 */
    path: 'info',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/info-list/info-list.module').then((m) => m.InfoListModule),
  },
  {
    /** カタログ一覧画面 */
    path: 'catalog',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/catalog-list/catalog-list.module').then(
        (m) => m.CatalogListModule
      ),
  },
  {
    /**カタログ詳細画面 */
    path: 'catalog/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/catalog-detail/catalog-detail.module').then(
        (m) => m.CatalogDetailModule
      ),
  },
  {
    /** カタログ変更画面 */
    path: 'catalog/edit/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/catalog-edit/catalog-edit.module').then(
        (m) => m.CatalogEditModule
      ),
  },

  {
    /** 建築事例一覧画面 */
    path: 'precedent',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/precedent-list/precedent-list.module').then(
        (m) => m.PrecedentListModule
      ),
  },
  {
    /** 建築会社一覧画面 */
    path: 'company',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/company-list/company-list.module').then(
        (m) => m.CompanyListModule
      ),
  },
  {
    /** 建築会社変更画面 */
    path: 'company/edit/:kenchikuKaishaId',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@front/company-edit/company-edit.module').then(
        (m) => m.CompanyEditModule
      ),
  },
  {
    matcher: noMatch,
    loadChildren: () =>
      import('@front/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
