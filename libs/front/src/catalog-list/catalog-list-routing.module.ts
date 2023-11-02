import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogListComponent } from './catalog-list.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogListRoutingModule {}
