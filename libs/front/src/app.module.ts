import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PushPipe } from '@ngrx/component';

import { AppComponent } from './app.component';
import { ConpaneTopComponent } from './conpane-top';
import { NotFoundComponent } from './not-found';
import { CatalogListComponent } from './catalog-list';
import { CatalogRegisterComponent } from './catalog-register';
import { CatalogDetailComponent } from './catalog-detail';
import { PrecedentListComponent } from './precedent-list/precedent-list.component';
import { CatalogEditComponent } from './catalog-edit/catalog-edit.component';
import { InfoListComponent } from './info-list';
import { InfoPreviewComponent } from './info-preview/info-preview.component';

const routes: Routes = [
  { path: '', component: ConpaneTopComponent },
  { path: 'info', component: InfoListComponent },
  { path: 'info/detail/:id', component: InfoPreviewComponent },
  { path: 'catalog', component: CatalogListComponent },
  { path: 'catalog/register', component: CatalogRegisterComponent },
  { path: 'catalog/:id', component: CatalogDetailComponent },
  { path: 'catalog/edit/:id', component: CatalogEditComponent },
  { path: 'precedent', component: PrecedentListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), PushPipe],
  exports: [RouterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
