import { Module } from '@nestjs/common';
import { CatalogDetailService } from './catalog-detail.service';
import {
  BffMicroservicesModule,
  MsGetCatalogDetailService,
  MsDeleteCatalogService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';
import { CatalogDetailController } from './catalog-detail.controller';

@Module({
  controllers: [CatalogDetailController],
  providers: [
    CatalogDetailService,
    MsGetCatalogDetailService,
    MsDeleteCatalogService,
  ],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class CatalogDetailModule {}
