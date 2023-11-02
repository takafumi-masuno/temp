import { NgModule } from '@angular/core';
import { CatalogDetailComponent } from './catalog-detail.component';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { ShareModule } from '../shared/share.module';
import { RouterModule } from '@angular/router';
import { PartHeaderModule } from '../components/part-header';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartFooterModule } from '../components/part-footer';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartModalDeleteConfirmModule } from '../components/part-modal-delete-confirm';
import { CatalogDetailRoutingModule } from './catalog-detail-routing.module';

@NgModule({
  declarations: [CatalogDetailComponent],
  imports: [
    CatalogDetailRoutingModule,
    CommonModule,
    PushPipe,
    ShareModule,
    RouterModule,
    PartHeaderModule,
    PartSideMenuModule,
    PartFooterModule,
    PartFixedFooterModule,
    PartModalDeleteConfirmModule,
  ],
  exports: [RouterModule],
  bootstrap: [CatalogDetailComponent],
})
/**
 * カタログ詳細module
 */
export class CatalogDetailModule {}
