import { Injectable } from '@nestjs/common';
// import { GetHogeResponse } from '@athome-lib/models/microservices/src';

@Injectable()
export class TopService {
  getHoge(): { data: boolean } {
    return { data: true };
  }
}
