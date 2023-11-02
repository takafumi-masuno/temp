import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { CatalogRegisterRoutingModule } from './catalog-register-routing.module';
import { CatalogRegisterComponent } from './catalog-register.component';
import { PartHeaderModule } from '../components/part-header';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartFooterModule } from '../components/part-footer';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartModalTagPickerModule } from '../components/part-modal-tag-picker';
import { PartModalShougouSearchModule } from '../components/part-modal-shougou-search';
import { PartModalRegisterConfirmModule } from '../components/part-modal-register-confirm';
import { PartModalPageTransitionConfirmModule } from '../components/part-modal-page-transition-confirm';
import { ReactiveFormsModule } from '@angular/forms';
import { PartErrorModule } from '../components/part-error';

@NgModule({
  declarations: [CatalogRegisterComponent],
  imports: [
    CommonModule,
    CatalogRegisterRoutingModule,
    ReactiveFormsModule,
    PushPipe,
    RouterModule,
    PartHeaderModule,
    PartSideMenuModule,
    PartFooterModule,
    PartFixedFooterModule,
    PartModalTagPickerModule,
    PartModalShougouSearchModule,
    PartModalRegisterConfirmModule,
    PartModalPageTransitionConfirmModule,
    PartErrorModule,
  ],
  exports: [RouterModule],
  bootstrap: [CatalogRegisterComponent],
})
/**
 * カタログ登録module
 */
export class CatalogRegisterModule {}
