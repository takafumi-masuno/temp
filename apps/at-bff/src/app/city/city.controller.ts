import { MsCityService } from '@bff/microservices';
import { GetCityInfoRequest } from '@bff/models';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs';

/**
 * 市区郡controller
 */
@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly msCityService: MsCityService) {}

  /**
   * 市区郡情報を取得する
   * @param params 市区郡取得リクエスト
   * @returns 市区郡情報
   */
  @Get()
  @ApiResponse({ status: 200 })
  getCityInfo(@Query() getCityInfoRequest: GetCityInfoRequest) {
    const cities = this.msCityService.getCity({
      path: {
        prefectureCode: getCityInfoRequest.prefectureCode,
      },
    });
    return cities.pipe(map((data) => ({ data: data.cities })));
  }
}
