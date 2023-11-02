import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import {
  BffMicroservicesModule,
  MsGetIsSessionService,
} from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [SessionController],
  providers: [MsGetIsSessionService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class SessionModule {}
