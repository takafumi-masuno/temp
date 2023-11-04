import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PartFixedFooterModule } from '../components/part-fixed-footer';
import { PartFooterModule } from '../components/part-footer';
import { PartHeaderModule } from '../components/part-header';
import { PartSideMenuModule } from '../components/part-side-menu';
import { CompanyEditComponent } from './company-edit.component';
import { CompanyEditService } from './services/company-edit.service';
import { CompanyEditResolver } from './resolvers/company-edit.resolver';
import { PartModalChangeConfirmModule } from '../components/part-modal-change-confirm';
import { PartModalPageTransitionConfirmModule } from '../components/part-modal-page-transition-confirm';
import { PartErrorModule } from '../components/part-error';
import { PartImagePickerModule } from '../components/part-image-picker/part-image-picker.module';
import { PartVisibilitySettingsFormModule } from '../components/part-visibility-settings-form/part-visibility-settings-form.module';

const routes: Routes = [
  {
    path: '',
    resolve: { data: CompanyEditResolver },
    component: CompanyEditComponent,
  },
];
@NgModule({
  declarations: [CompanyEditComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PushPipe,
    RouterModule,
    CdkAccordionModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    PartFixedFooterModule,
    PartFooterModule,
    PartHeaderModule,
    PartSideMenuModule,
    PartErrorModule,
    PartModalChangeConfirmModule,
    PartModalPageTransitionConfirmModule,
    PartImagePickerModule,
    PartVisibilitySettingsFormModule,
  ],
  exports: [RouterModule],
  providers: [CompanyEditService],
  bootstrap: [CompanyEditComponent],
})
export class CompanyEditModule {}
