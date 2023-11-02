import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogRegisterComponent } from './catalog-register.component';

const routes: Routes = [{ path: '', component: CatalogRegisterComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * カタログ登録RoutingModule
 */
export class CatalogRegisterRoutingModule {}
