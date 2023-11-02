import { Module } from '@nestjs/common';
import { PrecedentListController } from './precedent-list.controller';
import { PrecedentListService } from './precedent-list.service';
import { MsPrecedentListService } from '@bff/microservices/ms-precedent-list-service';

@Module({
  controllers: [PrecedentListController],
  providers: [PrecedentListService, MsPrecedentListService],
})
export class PrecedentListModule {}
