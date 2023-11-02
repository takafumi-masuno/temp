import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

import { InfoListComponent } from './info-list.component';
import { PartHeaderModule } from '../components/part-header';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartCompletionModule } from '../components/part-completion';
import { PartFooterModule } from '../components/part-footer';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartPaginationModule } from '../components/part-pagination';
import { PartSearchResultModule } from '../components/part-search-result';
import { PartErrorModule } from '../components/part-error';
import { InfoListRoutingModule } from './info-list-routing.module';
import { PushPipe } from '@ngrx/component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [InfoListComponent],
  imports: [
    CommonModule,
    RouterModule,
    PushPipe,
    InfoListRoutingModule,
    PartHeaderModule,
    PartSideMenuModule,
    PartCompletionModule,
    PartFooterModule,
    PartFixedFooterModule,
    PartPaginationModule,
    PartSearchResultModule,
    PartErrorModule,
    MatTableModule,
    MatSortModule,
  ],
  exports: [RouterModule],
  bootstrap: [InfoListComponent],
})
export class InfoListModule {}
