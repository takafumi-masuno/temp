import { Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import {
  BffMicroservicesModule,
  MsGetInfoListService,
} from '@bff/microservices';
import { InfoListController } from './info-list.controller';
import { InfoListService } from './info-list.service';

@Module({
  controllers: [InfoListController],
  providers: [InfoListService, MsGetInfoListService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class InfoListModule {}
