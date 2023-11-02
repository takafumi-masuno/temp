import { Module } from '@nestjs/common';
import { ShougouController } from './shougou.controller';
import { BffMicroservicesModule, MsGetUsersService } from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [ShougouController],
  providers: [MsGetUsersService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class ShougouModule {}
