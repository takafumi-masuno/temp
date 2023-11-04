import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AppService } from './app.service';
import { BffCoreModule } from '@bff/index';
import { TopModule } from './top/top.module';
import { LoginModule } from './login/login.module';
import { environment } from '../environments/environment';
import { UtilsLogNestLoggerModule, AtLoggerMiddleware } from '@shared/log';
import { CatalogRegisterModule } from './catalog-register/catalog-register.module';
import { AuthModule } from './auth/auth.module';
import { CatalogListModule } from './catalog-list/catalog-list.module';
import { ShougouModule } from './shougou/shougou.module';
import { CatalogDetailModule } from './catalog-detail/catalog-detail.module';
import { PrecedentListModule } from './precedent-list/precedent-list.module';
import { CatalogEditModule } from './catalog-edit/catalog-edit.module';
import { InfoPreviewModule } from './info-preview/info-preview.module';
import { InfoListModule } from './info-list/info-list.module';
import { CompanyListModule } from './company-list/company-list.module';
import { SessionModule } from './session/session.module';
import { CompanyEditModule } from './company-edit/company-edit.module';
import { CityModule } from './city/city.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UtilsLogNestLoggerModule.forRoot(environment.logConfig),
    BffCoreModule.forRoot(environment.msConfig, environment.logConfig),
    TopModule,
    CatalogRegisterModule,
    AuthModule,
    SessionModule,
    InfoPreviewModule,
    LoginModule,
    CatalogListModule,
    CatalogEditModule,
    ShougouModule,
    CatalogDetailModule,
    PrecedentListModule,
    InfoListModule,
    CompanyListModule,
    CompanyEditModule,
    CityModule,
    FileModule,
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AtLoggerMiddleware).forRoutes('');
  }
}
