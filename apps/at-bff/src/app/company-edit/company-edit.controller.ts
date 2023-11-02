import { Controller, Get, Param } from '@nestjs/common';
import { CompanyEditService } from './company-edit.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  MsCityService,
  MsCompanyService,
  MsKaiinService,
} from '@bff/microservices';
import { forkJoin, map, of, switchMap } from 'rxjs';

/**
 * 建築会社変更コントローラー
 */
@Controller('company-edit')
export class CompanyEditController {
  constructor(
    private readonly companyEditService: CompanyEditService,
    private readonly msCompanyService: MsCompanyService,
    private readonly msKaiinService: MsKaiinService,
    private readonly msCityService: MsCityService
  ) {}

  @Get(':kenchikuKaishaId')
  @ApiResponse({ status: 200 })
  getCompanyEditFirstView(@Param() params: { kenchikuKaishaId: string }) {
    console.log(
      'CompanyEditController: getCompanyEditFirstView発火',
      params.kenchikuKaishaId
    );
    const companyInfo = this.msCompanyService
      .getCompany({
        path: {
          kenchikuKaishaId: Number(params.kenchikuKaishaId),
        },
        query: {
          selectors: 'kenchiku_kaisha_info',
        },
      })
      .pipe(
        switchMap((companyData) => {
          const kaiinData = this.msKaiinService.getKaiin({
            path: {
              kaiinNo: companyData.kenchikuKaishaInfo.kaiinNo,
            },
          });
          const areaData = this.msCityService.getCityList({
            path: {
              todouhukenCd: companyData.kenchikuKaishaInfo.areaTodouhukenCd,
              sikugunCd: companyData.kenchikuKaishaInfo.areaSikugunCd,
            },
          });
          return forkJoin([of(companyData), kaiinData, areaData]);
        })
      );
    return companyInfo.pipe(
      map((data) => this.companyEditService.convertCompanyInfo(data))
    );
  }
}
