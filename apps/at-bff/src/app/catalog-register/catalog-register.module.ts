import { Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { BffMicroservicesModule, MsGetUsersService } from '@bff/microservices';
import { CatalogRegisterService } from './catalog-register.service';
import { CatalogRegisterController } from './catalog-register.controller';
import { MsRegisterCatalogService } from '@bff/microservices';

@Module({
  controllers: [CatalogRegisterController],
  providers: [
    CatalogRegisterService,
    MsGetUsersService,
    MsRegisterCatalogService,
  ],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class CatalogRegisterModule {}
