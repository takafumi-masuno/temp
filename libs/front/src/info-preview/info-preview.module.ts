import { NgModule } from '@angular/core';
import { InfoPreviewComponent } from './info-preview.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoPreviewRoutingModule } from './info-preview-routing.module';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartHeaderModule } from '../components/part-header';
import { PartFooterModule } from '../components/part-footer';
import { PartErrorModule } from '../components/part-error';
import { PushPipe } from '@ngrx/component';

@NgModule({
  declarations: [InfoPreviewComponent],
  imports: [
    CommonModule,
    RouterModule,
    PushPipe,
    InfoPreviewRoutingModule,
    PartSideMenuModule,
    PartHeaderModule,
    PartErrorModule,
    PartFooterModule,
  ],
  exports: [RouterModule],
  bootstrap: [InfoPreviewComponent],
})
export class InfoPreviewModule {}
