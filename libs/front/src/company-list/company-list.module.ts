import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { CompanyListComponent } from './company-list.component';
import { CompanyListService } from './services/company-list.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartFooterModule } from '../components/part-footer';
import { PartHeaderModule } from '../components/part-header';
import { PartSideMenuModule } from '../components/part-side-menu';
import { PartPaginationModule } from '../components/part-pagination';
import { PartSearchResultModule } from '../components/part-search-result';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
  },
];
@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PushPipe,
    RouterModule,
    CdkAccordionModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    PartFixedFooterModule,
    PartFooterModule,
    PartHeaderModule,
    PartSideMenuModule,
    PartPaginationModule,
    PartSearchResultModule,
  ],
  exports: [RouterModule],
  providers: [CompanyListService],
  bootstrap: [CompanyListComponent],
})
export class CompanyListModule {}
