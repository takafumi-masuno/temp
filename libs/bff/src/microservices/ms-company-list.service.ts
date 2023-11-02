import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { GetCompaniesReq, GetCompaniesRes } from '../models';
import { Observable, of } from 'rxjs';

@Injectable()
export class MsCompanyListService {
  constructor(private apiService: ApiService) {}

  /**
   * 建築会社一覧取得APIをコールする
   * @param params APIコール用のパラメータ群
   * @returns APIレスポンス
   */
  getCompanies(params: GetCompaniesReq): Observable<GetCompaniesRes> {
    // TODO: パラメーター確認用。本実装は削除。
    console.log('リクエストパラメーター', JSON.parse(JSON.stringify(params)));
    // TODO: 本実装は建築会社一覧情報取得APIをコールする
    if (params.query.kaiinNo === '99999') {
      return of({
        total: 0,
        page: 1,
        companies: [],
      });
    }
    // TODO: なぜかページがstring型で渡ってきているので調査
    if (
      Number(params.query.page) ===
      Math.ceil(mockData[0].total / params.query.limitPerPage)
    ) {
      return of({
        ...mockData[2],
        page: Number(params.query.page),
      });
    } else {
      return of({
        ...mockData[Math.floor(Math.random() * 2)],
        page: Number(params.query.page),
      });
    }

    // TODO: ↓本実装想定処理
    // return this.apiService.getJSONContent<GetCompaniesRes>(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['companies']
    //   }),
    //   params
    // )
  }
}

const mockData: Omit<GetCompaniesRes, 'page'>[] = [
  {
    total: 269,
    companies: [
      {
        kenchikuKaishaId: 11111,
        shougou: 'AAA株式会社',
        kaishaType: 2,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 2,
      },
      {
        kenchikuKaishaId: 22222,
        shougou: 'BBB株式会社',
        kaishaType: 1,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 3,
      },
      {
        kenchikuKaishaId: 33333,
        shougou: 'CCC株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 44444,
        shougou: 'DDD株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 55555,
        shougou: 'EEE株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 66666,
        shougou: 'FFF株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 77777,
        shougou: 'GGG株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 88888,
        shougou: 'HHH株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 99999,
        shougou: 'III株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 100000,
        shougou: 'JJJ株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
    ],
  },
  {
    total: 269,
    companies: [
      {
        kenchikuKaishaId: 51111,
        shougou: 'AAAAA株式会社',
        kaishaType: 2,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 2,
      },
      {
        kenchikuKaishaId: 52222,
        shougou: 'BBBBB株式会社',
        kaishaType: 1,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 3,
      },
      {
        kenchikuKaishaId: 53333,
        shougou: 'CCCCC株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 54444,
        shougou: 'DDDDD株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 55555,
        shougou: 'EEEEE株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 56666,
        shougou: 'FFFFF株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 57777,
        shougou: 'GGGGG株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 58888,
        shougou: 'HHHHH株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 59999,
        shougou: 'IIIII株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 510000,
        shougou: 'JJJJJ株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
    ],
  },
  {
    total: 269,
    companies: [
      {
        kenchikuKaishaId: 271111,
        shougou: 'AAAAAA株式会社',
        kaishaType: 2,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 2,
      },
      {
        kenchikuKaishaId: 272222,
        shougou: 'BBBBBB株式会社',
        kaishaType: 1,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 3,
      },
      {
        kenchikuKaishaId: 273333,
        shougou: 'CCCCCC株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 274444,
        shougou: 'DDDDDD株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 275555,
        shougou: 'EEEEEE株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 276666,
        shougou: 'FFFFFF株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 277777,
        shougou: 'GGGGGG株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 278888,
        shougou: 'HHHHHH株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
      {
        kenchikuKaishaId: 279999,
        shougou: 'IIIIII株式会社',
        kaishaType: 3,
        yuubinNo: '1000011',
        shozaichi: '東京都○○区○○町1-11 ○○ビル1階',
        tel: '000-0000-0000',
        koukaiJoutai: 1,
      },
    ],
  },
];
