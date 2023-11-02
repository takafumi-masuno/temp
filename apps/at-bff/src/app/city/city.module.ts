import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { BffMicroservicesModule, MsCityService } from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [CityController],
  providers: [MsCityService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class CityModule {}
