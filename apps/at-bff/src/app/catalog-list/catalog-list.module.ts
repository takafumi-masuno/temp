import { Module } from '@nestjs/common';
import { CatalogListController } from './catalog-list.controller';
import { CatalogListService } from './catalog-list.service';
import {
  BffMicroservicesModule,
  MsGetCatalogListService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [CatalogListController],
  providers: [CatalogListService, MsGetCatalogListService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class CatalogListModule {}
