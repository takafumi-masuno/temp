import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopService } from './top.service';
// import { forkJoin } from 'rxjs';
// import { map } from 'rxjs/operators';

@ApiTags('top')
@Controller('top')
export class TopController {
  constructor(private readonly topService: TopService) {}
  @Get('hoge')
  @ApiResponse({ status: 200 })
  // @ApiQuery({ name: 'hoge', example: 'hoge' })
  // @ApiResponse({ status: 200 })s
  getHoge() {
    console.log('hoge');
    // const result = this.msTopService.getHoge({
    //   path: { version: 'v1' },
    //   query: { hoge: params.hoge },
    // });

    // return forkJoin([result]).pipe(
    //   map((data) => this.topService.getHoge(data[0]))
    // );

    return this.topService.getHoge();
  }
}
