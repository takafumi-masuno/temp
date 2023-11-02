import { Module } from '@nestjs/common';
import { CatalogEditService } from './catalog-edit.service';
import {
  BffMicroservicesModule,
  MsEditCatalogService,
  MsGetCatalogDetailService,
  MsGetCatalogIsEditService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';
import { CatalogEditController } from './catalog-edit.controller';

@Module({
  controllers: [CatalogEditController],
  providers: [
    CatalogEditService,
    MsGetCatalogDetailService,
    MsEditCatalogService,
    MsGetCatalogIsEditService,
  ],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class CatalogEditModule {}
