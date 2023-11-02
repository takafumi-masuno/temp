import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PushPipe } from '@ngrx/component';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

import { CatalogListComponent } from './catalog-list.component';
import { CatalogListRoutingModule } from './catalog-list-routing.module';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartHeaderModule } from '../components/part-header';
import { ShareModule } from '../shared/share.module';
import { PartSearchResultModule } from '../components/part-search-result';
import { PartPaginationModule } from '../components/part-pagination';
import { PartFooterModule } from '../components/part-footer';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartModalTagPickerModule } from '../components/part-modal-tag-picker';
import { PartErrorModule } from '../components/part-error';
import { PartCompletionModule } from '../components/part-completion';

@NgModule({
  declarations: [CatalogListComponent],
  imports: [
    CommonModule,
    CatalogListRoutingModule,
    PushPipe,
    ShareModule,
    RouterModule,
    PartCompletionModule,
    PartSideMenuModule,
    PartHeaderModule,
    PartSearchResultModule,
    PartPaginationModule,
    PartFooterModule,
    PartFixedFooterModule,
    PartErrorModule,
    PartModalTagPickerModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
  ],
  exports: [RouterModule],
  bootstrap: [CatalogListComponent],
})
export class CatalogListModule {}
