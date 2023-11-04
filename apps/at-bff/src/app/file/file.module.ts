import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { BffMicroservicesModule, MsFileService } from '@bff/microservices';
import { environment } from '../../environments/environment';

@Module({
  controllers: [FileController],
  providers: [MsFileService],
  imports: [
    BffMicroservicesModule.forRoot(environment.msConfig, environment.logConfig),
  ],
})
export class FileModule {}
