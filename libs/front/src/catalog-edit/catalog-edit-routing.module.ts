import { RouterModule, Routes } from '@angular/router';
import { CatalogEditComponent } from './catalog-edit.component';
import { NgModule } from '@angular/core';
import { CatalogEditResolver } from './resolvers/catalog-edit.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { catalog: CatalogEditResolver },
    component: CatalogEditComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogEditRoutingModule {}
