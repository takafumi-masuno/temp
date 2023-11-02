import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogDetailComponent } from './catalog-detail.component';
import { CatalogDetailResolver } from './resolvers';

const routes: Routes = [
  {
    path: '',
    resolve: { catalog: CatalogDetailResolver },
    component: CatalogDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * カタログ詳細routingModule
 */
export class CatalogDetailRoutingModule {}
