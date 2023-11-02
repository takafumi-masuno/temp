import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import {
  GetCitiesReq,
  GetCitiesRes,
  GetCityListReq,
  GetCityListRes,
  ICityInfo,
} from '../models';
import { Observable, of } from 'rxjs';

/**
 * 市区郡関連のマイクロサービス
 */
@Injectable()
export class MsCityService {
  constructor(private apiService: ApiService) {}

  /**
   * 市区郡情報取得APIをコールする
   * @param params APIコール用のパラメータ群
   * @returns APIレスポンス
   */
  getCity(getCitiesRequest: GetCitiesReq): Observable<GetCitiesRes> {
    // TODO: 本実装は建築会社一覧情報取得APIをコールする
    const concernedList = mockData.filter(
      (prefecture) =>
        prefecture.perfectureCd === getCitiesRequest.path.prefectureCode
    );
    const citiesData = concernedList.length
      ? concernedList[0].cities
      : mockData[0].cities;
    return of({
      cities: [...citiesData],
    });
  }

  // TODO: ↓本実装想定処理
  // return this.apiService.getJSONContent<GetCitiesRes>(
  //   new MicroserviceParams({
  //     type: MicroServiceType.base,
  //     path: ['city']
  //   }),
  //   params
  // )

  /**
   * 市区郡情報取得APIをコールする
   * @param params APIコール用のパラメータ群
   * @returns APIレスポンス
   */
  getCityList(getCityListRequest: GetCityListReq): Observable<GetCityListRes> {
    // TODO: 本実装は市区郡情一覧報取得APIをコールする
    const responseData: GetCityListRes = {
      prefectures: getCityListRequest.path.todouhukenCd,
      cities: [
        [
          {
            name: '青森市',
            roman: 'aomorisi',
            code: '201',
          },
          {
            name: '上北郡',
            roman: 'kamikitagun',
            code: '400',
          },
          {
            name: '北津軽郡',
            roman: 'kitatugarugun',
            code: '380',
          },
          {
            name: '黒石市',
            roman: 'kuroisisi',
            code: '204',
          },
          {
            name: '五所川原市',
            roman: 'gojogawarasi',
            code: '205',
          },
          {
            name: '三戸郡',
            roman: 'sabbihegun',
            code: '440',
          },
          {
            name: '下北郡',
            roman: 'simokitagun',
            code: '420',
          },
        ],
        [
          {
            name: 'つがる市',
            roman: 'tugarusi',
            code: '209',
          },
          {
            name: '十和田市',
            roman: 'towadagun',
            code: '206',
          },
          {
            name: '中津軽郡',
            roman: 'nakatugarugun',
            code: '340',
          },
          {
            name: '西津軽郡',
            roman: 'nisitugarugun',
            code: '320',
          },
          {
            name: '八戸市',
            roman: 'hatinohesi',
            code: '203',
          },
          {
            name: '東津軽郡',
            roman: 'higasitugarugun',
            code: '300',
          },
        ],
        [
          {
            name: '平川市',
            roman: 'hirakawasi',
            code: '210',
          },
          {
            name: '弘前市',
            roman: 'hirosakisi',
            code: '202',
          },
          {
            name: '三沢市',
            roman: 'misawasi',
            code: '207',
          },
          {
            name: '南津軽郡',
            roman: 'minamitugarugun',
            code: '360',
          },
          {
            name: 'むつ市',
            roman: 'mutusi',
            code: '208',
          },
        ],
      ],
    };
    return of(responseData);
  }

  // TODO: ↓本実装想定処理
  // return this.apiService.getJSONContent<GetCitiesRes>(
  //   new MicroserviceParams({
  //     type: MicroServiceType.base,
  //     path: ['city']
  //   }),
  //   params
  // )
}

const mockData: { perfectureCd: string; cities: ICityInfo[] }[] = [
  {
    perfectureCd: '02',
    cities: [
      {
        name: '青森市',
        roman: 'aomorisi',
        code: '201',
      },
      {
        name: '上北郡',
        roman: 'kamikitagun',
        code: '400',
      },
      {
        name: '北津軽郡',
        roman: 'kitatugarugun',
        code: '380',
      },
      {
        name: '黒石市',
        roman: 'kuroisisi',
        code: '204',
      },
      {
        name: '五所川原市',
        roman: 'gojogawarasi',
        code: '205',
      },
      {
        name: '三戸郡',
        roman: 'sabbihegun',
        code: '440',
      },
      {
        name: '下北郡',
        roman: 'simokitagun',
        code: '420',
      },
      {
        name: 'つがる市',
        roman: 'tugarusi',
        code: '209',
      },
      {
        name: '十和田市',
        roman: 'towadagun',
        code: '206',
      },
      {
        name: '中津軽郡',
        roman: 'nakatugarugun',
        code: '340',
      },
      {
        name: '西津軽郡',
        roman: 'nisitugarugun',
        code: '320',
      },
      {
        name: '八戸市',
        roman: 'hatinohesi',
        code: '203',
      },
      {
        name: '東津軽郡',
        roman: 'higasitugarugun',
        code: '300',
      },
      {
        name: '平川市',
        roman: 'hirakawasi',
        code: '210',
      },
      {
        name: '弘前市',
        roman: 'hirosakisi',
        code: '202',
      },
      {
        name: '三沢市',
        roman: 'misawasi',
        code: '207',
      },
      {
        name: '南津軽郡',
        roman: 'minamitugarugun',
        code: '360',
      },
      {
        name: 'むつ市',
        roman: 'mutusi',
        code: '208',
      },
    ],
  },
  {
    perfectureCd: '13',
    cities: [
      {
        name: '千代田区',
        roman: 'tiyodaku',
        code: '101',
      },
      {
        name: '中央区',
        roman: 'tyuouku',
        code: '102',
      },
      {
        name: '港区',
        roman: 'minatoku',
        code: '103',
      },
      {
        name: '新宿区',
        roman: 'sinjukuku',
        code: '104',
      },
      { name: '文京区', roman: 'bunkyouku', code: '105' },
      { name: '台東区', roman: 'taitouku', code: '106' },
      { name: '墨田区', roman: 'sumidaku', code: '107' },
      { name: '江東区', roman: 'koutouku', code: '108' },
      { name: '品川区', roman: 'sinagawaku', code: '109' },
      { name: '目黒区', roman: 'meguroku', code: '110' },
      { name: '大田区', roman: 'ootaku', code: '111' },
      { name: '世田谷区', roman: 'setagayaku', code: '112' },
      { name: '渋谷区', roman: 'sibuyaku', code: '113' },
      { name: '中野区', roman: 'nakanoku', code: '114' },
      { name: '杉並区', roman: 'suginamiku', code: '115' },
      { name: '豊島区', roman: 'tosimaku', code: '116' },
      { name: '北区', roman: 'kitaku', code: '117' },
      { name: '荒川区', roman: 'awakawaku', code: '118' },
      { name: '板橋区', roman: 'itabasiku', code: '119' },
      { name: '練馬区', roman: 'nerimaku', code: '120' },
      { name: '足立区', roman: 'adatiku', code: '121' },
      { name: '葛飾区', roman: 'katusikaku', code: '122' },
      { name: '江戸川区', roman: 'edogawaku', code: '123' },
      { name: '八王子市', roman: 'hatioujisi', code: '201' },
      { name: '立川市', roman: 'tatikawasi', code: '202' },
      { name: '武蔵野市', roman: 'musasinosi', code: '203' },
      { name: '三鷹市', roman: 'mitakasi', code: '204' },
      { name: '青梅市', roman: 'oumesi', code: '205' },
      { name: '府中市', roman: 'futyusi', code: '206' },
      { name: '昭島市', roman: 'akisimasi', code: '207' },
      { name: '調布市', roman: 'tyoufusi', code: '208' },
      { name: '町田市', roman: 'matidasi', code: '209' },
      { name: '小金井市', roman: 'koganeisi', code: '210' },
      { name: '小平市', roman: 'kodairasi', code: '211' },
      { name: '日野市', roman: 'hinosi', code: '212' },
      { name: '東村山市', roman: 'higasimurayamasi', code: '213' },
      { name: '国分寺市', roman: 'kokubunjisi', code: '214' },
      { name: '国立市', roman: 'kunitatisi', code: '215' },
      { name: '福生市', roman: 'fussasi', code: '218' },
      { name: '狛江市', roman: 'komaesi', code: '219' },
      { name: '東大和市', roman: 'higasiyamatosi', code: '220' },
      { name: '清瀬市', roman: 'kiyosesi', code: '221' },
      { name: '東久留米市', roman: 'higasikurumesi', code: '222' },
      { name: '武蔵村山市', roman: 'musasimurayamasi', code: '223' },
      { name: '多摩市', roman: 'tamasi', code: '224' },
      { name: '稲城市', roman: 'inagisi', code: '225' },
      { name: '羽村市', roman: 'hamurasi', code: '227' },
      { name: 'あきる野市', roman: 'akirunosi', code: '228' },
      { name: '西東京市', roman: 'nisitokyosi', code: '229' },
      { name: '西多摩郡', roman: 'nisitamagun', code: '300' },
    ],
  },
];
