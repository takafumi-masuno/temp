import { DeleteCompanyReq, GetCompanyReq, ICompany } from '../models';
import { ApiService } from '..';
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { IError, ISuccess } from '@shared/models';

/**
 * 建築会社関連のマイクロサービス
 */
@Injectable()
export class MsCompanyService {
  constructor(private apiService: ApiService) {}

  /**
   * 建築会社情報取得APIをコールする
   * @param params APIコール用のパラメータ群
   * @return APIレスポンス
   */
  getCompany(request: GetCompanyReq): Observable<ICompany> {
    // TODO: 本実装は建築会社情報取得APIをコールする
    return of(this.mockData);

    // TODO: ↓本実装想定処理
    // return this.apiService.getJSONContent<ICompany>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.detail,
    //     serviceName: 'company',
    //     path: ['company', request.path.kenchikuKaishaId],
    //   }), request.query
    // );
  }

  mockData = {
    kenchikuKaishaInfo: {
      kaiinNo: '12345678',
      kaishaType: 1,
      toriatsukaiKubun: [1, 2, 3],
      areaTodouhukenCd: [1, 2, 3],
      areaSikugunCd: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      areaBikou: '※施工は別途加盟工務店が請け負います',
      tsubotankaFrom: '66.0',
      tsubotankaTo: '120.0',
      hontaikakakuFrom: '1980.0',
      hontaikakakuTo: '3000.0',
      afterServiceTeikiTenken:
        '20年間 1年、2年、以降優勝メンテナンスにて35年まで保証\n第三者機関の住宅瑕疵担保責任保険。完成保証制度。',
      kanseiHoshou: '完成保証制度',
      kasiHoshou: 'ハウスプラス住宅保証(株)\n株式会社ハウスジーメン',
      sonotaHoshou:
        '35年保証(20年目以降の有償メンテナンス必要)\n地盤保証（株式会社ハウスジーメン）',
      sekouJisseki: '2093棟（2021年）\n8347棟',
      sikakusya:
        '一般建築士、宅地建物取引士、木造ハウジングコーディネーター、一級建築施工管理技士、インテリアコーディネーター',
      uriagedaka: '38.0億円（2021年）',
      homePage: 'https://xxxx/xxx/',
      kensetsuKyokaKubun: 0,
      kensetsuKyokaNo: '000406',
      zimusyoTourokuNo: '東京都知事 第53443号',
      tokuchouType: [2, 3, 4, 5, 6, 7, 1],
      setsumeiTitle:
        '檜の持ち味と棟梁の技術にこだわってつくる住まい。それが日本ハウスHDの選ばれる理由',
      setsumeiShousai: '会社説明内容が入力できます。',
      kaishaGazou1:
        'https://m.media-amazon.com/images/I/61S5wsiSHjL._AC_SY110_.jpg',
      kaishaGazou2:
        'https://m.media-amazon.com/images/I/71ZMXqrB9XL._AC_SY110_.jpg',
      kaishaGazou3:
        'https://m.media-amazon.com/images/I/81ku0JFRedL._AC_SY110_.jpg',
      kaishaGazou4:
        'https://m.media-amazon.com/images/I/81l5YGuBV3L._AC_SY110_.jpg',
      kaishaGazou5:
        'https://m.media-amazon.com/images/I/51n20MY+0rL._AC_SY145_.jpg',
      kaishaDouga: 'https://www.athome.com/movie_files/path/kaisha/xxxxx.mp4',
      kodawariTitle1: '会社のこだわりのタイトル１',
      kodawariTitle2: '会社のこだわりのタイトル２',
      kodawariTitle3: '会社のこだわりのタイトル３',
      kodawariShousai1:
        '会社のこだわりの説明１が入ります。会社のこだわりの説明１が入ります。会社のこだわりの説明１が入ります。会社のこだわりの説明１が入ります。会社のこだわりの説明１が入ります。会社のこだわりの説明１が入ります。',
      kodawariShousai2:
        '会社のこだわりの説明２が入ります。会社のこだわりの説明２が入ります。会社のこだわりの説明２が入ります。会社のこだわりの説明２が入ります。会社のこだわりの説明２が入ります。会社のこだわりの説明２が入ります。',
      kodawariShousai3:
        '会社のこだわりの説明３が入ります。会社のこだわりの説明３が入ります。会社のこだわりの説明３が入ります。会社のこだわりの説明３が入ります。会社のこだわりの説明３が入ります。会社のこだわりの説明３が入ります。',
      kodawariGazou1:
        'https://m.media-amazon.com/images/I/31Ii+h9mqoL._MCnd_AC_.jpg',
      kodawariGazou2:
        'https://m.media-amazon.com/images/I/311KN5imHlL._MCnd_AC_.jpg',
      kodawariGazou3:
        'https://m.media-amazon.com/images/I/21jMft9GYXL._MCnd_AC_.jpg',
      openStart: '2023-04-01',
      openEnd: '2023-12-31',
      koukaiJoutai: 3,
      updatedDate: '2023-04-02T00:09:00.000Z',
    },
  };

  /**
   * 建築会社情報削除APIをコールする
   * @param request 建築会社情報削除リクエスト
   * @returns 建築会社情報削除レスポンス
   */
  deleteCompany(request: DeleteCompanyReq): Observable<ISuccess | IError> {
    // TODO: 本実装は建築会社情報削除APIをコールする
    // 成功時
    return of({ message: 'Success' });
    // 失敗時
    // return of({ detail: 'Invalid syntax for this request was provided.' });

    // TODO: ↓本実装想定処理
    // return this.apiService.deleteJSONContent<BasicValidResponseType>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.detail,
    //     serviceName: 'companies',
    //     path: [request.path.kenchikuKaishaId],
    //   }), {}
    // );
  }
}
