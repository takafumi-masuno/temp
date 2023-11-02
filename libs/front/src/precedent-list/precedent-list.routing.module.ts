import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrecedentListComponent } from './precedent-list.component';

const routes: Routes = [
  {
    path: '',
    component: PrecedentListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrecedentListRoutingModule {}
