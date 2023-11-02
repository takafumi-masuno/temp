import { convertToCodeNm } from '@bff/convert';
import {
  GetCityListRes,
  ICompany,
  ICompanyEditResponse,
  ICompanyInfoDetail,
  ICompanyInfoForCompanyEdit,
  IKaiin,
  IKaiinInfo,
} from '@bff/models';
import { Injectable } from '@nestjs/common';
import { IBasicErrorResponse } from '@shared/models';

/**
 * 建築会社変更サービス
 */
@Injectable()
export class CompanyEditService {
  /**
   * 建築会社情報を編集する
   * @param companyInfo 建築会社情報
   * @returns 編集した建築会社情報
   */
  convertCompanyInfo(
    companyInfo: [ICompany, IKaiin | IBasicErrorResponse, GetCityListRes]
  ): {
    data: ICompanyEditResponse;
  } {
    let convertedCompanyData: ICompanyEditResponse;

    const kaiinData = companyInfo[1];
    const areaData = companyInfo[2];
    if ('detail' in kaiinData) {
      const companyData = companyInfo[0];

      convertedCompanyData = {
        companyInfo: this.convertCompanyInfoToCodeNm(
          companyData.kenchikuKaishaInfo,
          areaData
        ),
      };
    } else {
      const convertedKaiinInfo: IKaiinInfo = {
        kaiinNo: kaiinData.kaiinNo,
        ippanShougou: kaiinData.shogoName,
        ippanShougouKana: kaiinData.shogoKana,
        postNo: `〒${kaiinData.postNo}`,
        shozaichi: `${kaiinData.todofukenName}${kaiinData.cityName}${kaiinData.townName}${kaiinData.banchi}${kaiinData.buildingName}`,
        koutuu: `${kaiinData.stationName}/${kaiinData.railLineName} ${kaiinData.tohoJikan}分 【バス】 ${kaiinData.basJikan}分 ${kaiinData.basteiName} 徒歩${kaiinData.basteiJikan}分`,
        tel: kaiinData.ippanTel,
        fax: kaiinData.daihyoFax,
        daihyoushaNm: kaiinData.daihyoshaName,
        menkyoNm: kaiinData.menkyoName,
        shozokuDantaiNm: kaiinData.shozokuDantaiName,
        hoshouKaisha: kaiinData.hoshoKyokaiName,
        koutoriKamei: kaiinData.kotoriName,
        shihonkin: kaiinData.shihonkin,
        jugyouinsuu: `${kaiinData.staffCnt}人`,
        seturituNentsuki: `${kaiinData.setsuritsuDate.substring(
          0,
          4
        )}年${kaiinData.setsuritsuDate.substring(4, 6)}月`,
        teikyuubi: kaiinData.teikyuDay,
        sonotaTeikyuubi: kaiinData.otherTeikyuDay,
        eigyouZikan: `${Number(
          kaiinData.eigyoStartTime.substring(0, 2)
        )}:${kaiinData.eigyoStartTime.substring(2, 4)}～${Number(
          kaiinData.eigyoEndTime.substring(0, 2)
        )}:${kaiinData.eigyoEndTime.substring(2, 4)}`,
        sonotaEigyouZikan: kaiinData.otherEigyoTime,
      };

      const companyData = companyInfo[0];

      convertedCompanyData = {
        basicInfo: convertedKaiinInfo,
        companyInfo: this.convertCompanyInfoToCodeNm(
          companyData.kenchikuKaishaInfo,
          areaData
        ),
      };
    }
    return { data: convertedCompanyData };
  }

  /**
   * 建築会社情報のコードをラベルに変換する
   * @param companyInfo 建築会社情報
   * @param areaData 施工対応エリア情報
   * @returns 変換した建築会社情報
   */
  convertCompanyInfoToCodeNm(
    companyInfo: ICompanyInfoDetail,
    areaData: GetCityListRes
  ): ICompanyInfoForCompanyEdit {
    const convertedCompanyInfo = {
      ...companyInfo,
      areaTodouhukenCd: areaData.prefectures.map((pref) =>
        pref.toString().padStart(2, '0')
      ),
      areaSikugunCd: areaData.cities,
      areaSikugunNm: areaData.cities.map((list) =>
        list.map((city) => city.name)
      ),
    };

    return convertedCompanyInfo;
  }
}
