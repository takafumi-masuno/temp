import { Module } from '@nestjs/common';
import { CompanyListController } from './company-list.controller';
import { CompanyListService } from './company-list.service';
import {
  BffMicroservicesModule,
  MsCompanyListService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [CompanyListController],
  providers: [CompanyListService, MsCompanyListService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class CompanyListModule {}
