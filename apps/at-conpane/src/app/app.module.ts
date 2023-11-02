import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendsModule } from '@front/shared/backends.module';
import { AppComponent } from '@front/app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoresAppModule,
  StoresSearchModule,
  StoresPropertyDetailModule,
} from '@front/shared/stores';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { APP_ENV } from '@shared/models';
import { PushPipe, LetDirective } from '@ngrx/component';
import { APP_BASE_HREF } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';

export const metaReducers: MetaReducer<unknown, never>[] =
  environment.production
    ? [] //productionでは使用しない
    : [storeFreeze];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StoresAppModule,
    StoresSearchModule,
    StoresPropertyDetailModule,
    StoreModule.forRoot(metaReducers),
    EffectsModule.forRoot([]),
    TransferHttpCacheModule,
    BackendsModule.forRoot(environment.apiConfig),
    FormsModule,
    LazyLoadImageModule,
    PushPipe,
    LetDirective,
  ],
  providers: [
    { provide: APP_ENV, useValue: environment },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
