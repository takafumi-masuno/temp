import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {
  BffMicroservicesModule,
  MsGetPermissionsService,
  MsGetUserInfoService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [AuthController],
  providers: [MsGetUserInfoService, MsGetPermissionsService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class AuthModule {}
