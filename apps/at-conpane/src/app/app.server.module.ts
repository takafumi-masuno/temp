import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { XhrFactory } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { AppComponent } from '@front/index';
import { SsrCookieInterceptor, ServerXhr } from '@shared/interceptors';

@NgModule({
  imports: [AppModule, NoopAnimationsModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: XhrFactory, useClass: ServerXhr },
    { provide: HTTP_INTERCEPTORS, useClass: SsrCookieInterceptor, multi: true },
  ],
})
export class AppServerModule {}
