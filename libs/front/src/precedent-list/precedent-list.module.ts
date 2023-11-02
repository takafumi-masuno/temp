import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PushPipe } from '@ngrx/component';

import { PrecedentListComponent } from './precedent-list.component';
import { PrecedentListRoutingModule } from './precedent-list.routing.module';
import { PartHeaderModule } from '../components/part-header';
import { PartFooterModule } from '../components/part-footer';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartPaginationModule } from '../components/part-pagination';
import { PartSearchResultModule } from '../components/part-search-result';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartErrorModule } from '../components/part-error';

@NgModule({
  declarations: [PrecedentListComponent],
  imports: [
    CommonModule,
    PrecedentListRoutingModule,
    PartHeaderModule,
    PartFooterModule,
    PartFixedFooterModule,
    PartPaginationModule,
    PartSearchResultModule,
    PartSideMenuModule,
    PartErrorModule,
    PushPipe,
    MatTableModule,
    MatSortModule,
    FormsModule,
  ],
  exports: [RouterModule],
  bootstrap: [PrecedentListComponent],
})
export class PrecedentListModule {}
