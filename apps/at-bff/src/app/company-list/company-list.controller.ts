import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyListService } from './company-list.service';
import { MsCompanyListService } from '@bff/microservices';
import { map } from 'rxjs';
import { GetCompaniesRequest } from '@bff/models';

@ApiTags('company-list')
@Controller('company-list')
export class CompanyListController {
  constructor(
    private readonly companyListService: CompanyListService,
    private readonly msCompanyListService: MsCompanyListService
  ) {}

  /**
   * 建築会社一覧取得
   * @param params 検索条件
   * @returns 建築会社一覧情報
   */
  @Get('companies')
  @ApiResponse({ status: 200 })
  getCompanies(@Query() params: GetCompaniesRequest) {
    // 建築会社一覧取得
    const companies = this.msCompanyListService.getCompanies({
      query: {
        selectors: 'total,page,companies',
        kaiinNo: params.kaiinNo,
        shougou: params.shougou,
        shougouKana: params.shougouKana,
        tel: params.tel,
        koukaiJoutai: params.koukaiJoutai,
        sort: params.sort,
        order: params.order && params.order.toUpperCase(),
        page: params.page,
        limitPerPage: params.limitPerPage,
      },
    });
    return companies.pipe(
      map((data) => this.companyListService.getCompanies(data))
    );
  }
}
