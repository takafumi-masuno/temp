import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConpaneTopComponent } from './conpane-top.component';

const routes: Routes = [{ path: '', component: ConpaneTopComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConpaneTopRoutingModule {}
