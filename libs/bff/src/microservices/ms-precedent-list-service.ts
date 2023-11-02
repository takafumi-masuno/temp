import { Injectable } from '@nestjs/common';
import { IPrecedentList } from '../models/precedent-list';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrecedentListRequest } from '@front/precedent-list/model/precedent-list';
import { Observable, of } from 'rxjs';

@Injectable()
export class MsPrecedentListService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * @param request フロントからわたってきたリクエスト
   * TODO 建築事例一覧取得API
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPrecedentList(request: PrecedentListRequest): Observable<IPrecedentList> {
    const precedentDataList = {
      message: 'success',
      items: {
        total: 50,
        page: 3,
        precedentDataList: [
          {
            kenchikuJireiId: 11111,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 1500,
            kenchikuKouhou: 1,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 104,
            koukaiJoutai: 1,
          },
          {
            kenchikuJireiId: 22222,
            shougou: 'アキュラホーム（AQ Group）',
            image: '',
            price: 2500,
            kenchikuKouhou: 1,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 109,
            koukaiJoutai: 2,
          },
          {
            kenchikuJireiId: 33333,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 2,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 112,
            koukaiJoutai: 2,
          },
          {
            kenchikuJireiId: 44444,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 3,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 105,
            koukaiJoutai: 1,
          },
          {
            kenchikuJireiId: 55555,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 4,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 108,
            koukaiJoutai: 1,
          },
          {
            kenchikuJireiId: 66666,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 5,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 114,
            koukaiJoutai: 3,
          },
          {
            kenchikuJireiId: 77777,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 6,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 111,
            koukaiJoutai: 3,
          },
          {
            kenchikuJireiId: 88888,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 7,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 110,
            koukaiJoutai: 1,
          },
          {
            kenchikuJireiId: 99999,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 8,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 116,
            koukaiJoutai: 2,
          },
          {
            kenchikuJireiId: 10101,
            shougou: 'アキュラホーム（AQ Group）',
            image: 'https://placehold.jp/120x80.png',
            price: 2500,
            kenchikuKouhou: 9,
            shikichiMenseki: '22.79坪/75.34㎡',
            nobeyukaMenseki: '22.79坪/75.34㎡',
            shunkouNentuki: '2014年8月',
            madoriKubun: 107,
            koukaiJoutai: 3,
          },
        ],
      },
    };
    return of(precedentDataList);
  }
}
