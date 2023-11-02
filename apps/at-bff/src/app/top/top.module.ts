import { Module } from '@nestjs/common';
import { TopController } from './top.controller';
import { TopService } from './top.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BffMicroservicesModule } from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [TopController],
  providers: [TopService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class TopModule {}
