import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPreviewComponent } from './info-preview.component';
import { InfoPreviewResolver } from './resolvers/info-preview.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { info: InfoPreviewResolver },
    component: InfoPreviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPreviewRoutingModule {}
