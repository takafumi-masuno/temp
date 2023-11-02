import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { BffMicroservicesModule, MsGetLoginsService } from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [LoginController],
  providers: [MsGetLoginsService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class LoginModule {}
