import { Module } from '@nestjs/common';
import { CompanyEditController } from './company-edit.controller';
import { CompanyEditService } from './company-edit.service';
import {
  BffMicroservicesModule,
  MsCityService,
  MsCompanyService,
  MsKaiinService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [CompanyEditController],
  providers: [
    CompanyEditService,
    MsCompanyService,
    MsKaiinService,
    MsCityService,
  ],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class CompanyEditModule {}
