import { NgModule } from '@angular/core';
import { CatalogEditComponent } from './catalog-edit.component';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../shared/share.module';
import { PartHeaderModule } from '../components/part-header';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartErrorModule } from '../components/part-error';
import { PartFooterModule } from '../components/part-footer';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartModalTagPickerModule } from '../components/part-modal-tag-picker';
import { PartModalShougouSearchModule } from '../components/part-modal-shougou-search';
import { PartModalChangeConfirmModule } from '../components/part-modal-change-confirm';
import { PartModalPageTransitionConfirmModule } from '../components/part-modal-page-transition-confirm';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogEditRoutingModule } from './catalog-edit-routing.module';

@NgModule({
  declarations: [CatalogEditComponent],
  imports: [
    CommonModule,
    PushPipe,
    RouterModule,
    ReactiveFormsModule,
    ShareModule,
    CatalogEditRoutingModule,
    PartHeaderModule,
    PartSideMenuModule,
    PartErrorModule,
    PartFooterModule,
    PartFixedFooterModule,
    PartModalTagPickerModule,
    PartModalShougouSearchModule,
    PartModalChangeConfirmModule,
    PartModalPageTransitionConfirmModule,
  ],
  exports: [RouterModule],
  bootstrap: [CatalogEditComponent],
})
export class CatalogEditModule {}
