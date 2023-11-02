import { GetCompaniesRes, ICompanySearchResult } from '@bff/models';
import { Injectable } from '@nestjs/common';
import { convertToCodeNm } from '@bff/convert/index';

@Injectable()
export class CompanyListService {
  getCompanies(data: GetCompaniesRes): { data: ICompanySearchResult } {
    const result: ICompanySearchResult = {
      total: data.total,
      page: data.page,
      companies: data.companies.map((companyData) => {
        const {
          shougou,
          kaishaType,
          yuubinNo,
          shozaichi,
          tel,
          koukaiJoutai,
          kenchikuKaishaId: detail,
        } = companyData;

        const company = {
          shougou,
          kaishaType: convertToCodeNm('KAISHA_TYPE', kaishaType),
          yuubinNo,
          shozaichi: shozaichi.toString(),
          tel,
          koukaiJoutai: convertToCodeNm('KOUKAI_JOUTAI', koukaiJoutai),
          detail,
        };
        return company;
      }),
    };
    return { data: result };
  }
}
