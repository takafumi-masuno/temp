import { Injectable } from '@angular/core';
import { IArea, IPrefecture } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PrefectureService {
  private Hokkaido: IPrefecture = {
    prefCd: '01',
    prefNm: '北海道',
    name: '北海道',
    prefRomaji: 'hokkaido',
    areaCd: '11',
  };
  private Aomori: IPrefecture = {
    prefCd: '02',
    prefNm: '青森県',
    name: '青森',
    prefRomaji: 'aomori',
    areaCd: '11',
  };
  private Iwate: IPrefecture = {
    prefCd: '03',
    prefNm: '岩手県',
    name: '岩手',
    prefRomaji: 'iwate',
    areaCd: '11',
  };
  private Miyagi: IPrefecture = {
    prefCd: '04',
    prefNm: '宮城県',
    name: '宮城',
    prefRomaji: 'miyagi',
    areaCd: '11',
  };
  private Akita: IPrefecture = {
    prefCd: '05',
    prefNm: '秋田県',
    name: '秋田',
    prefRomaji: 'akita',
    areaCd: '11',
  };
  private Yamagata: IPrefecture = {
    prefCd: '06',
    prefNm: '山形県',
    name: '山形',
    prefRomaji: 'yamagata',
    areaCd: '11',
  };
  private Fukushima: IPrefecture = {
    prefCd: '07',
    prefNm: '福島県',
    name: '福島',
    prefRomaji: 'fukushima',
    areaCd: '11',
  };
  private Tokyo: IPrefecture = {
    prefCd: '13',
    prefNm: '東京都',
    name: '東京',
    prefRomaji: 'tokyo',
    areaCd: '12',
  };
  private Kanagawa: IPrefecture = {
    prefCd: '14',
    prefNm: '神奈川県',
    name: '神奈川',
    prefRomaji: 'kanagawa',
    areaCd: '12',
  };
  private Saitama: IPrefecture = {
    prefCd: '11',
    prefNm: '埼玉県',
    name: '埼玉',
    prefRomaji: 'saitama',
    areaCd: '12',
  };
  private Chiba: IPrefecture = {
    prefCd: '12',
    prefNm: '千葉県',
    name: '千葉',
    prefRomaji: 'chiba',
    areaCd: '12',
  };
  private Ibaraki: IPrefecture = {
    prefCd: '08',
    prefNm: '茨城県',
    name: '茨城',
    prefRomaji: 'ibaraki',
    areaCd: '12',
  };
  private Tochigi: IPrefecture = {
    prefCd: '09',
    prefNm: '栃木県',
    name: '栃木',
    prefRomaji: 'tochigi',
    areaCd: '12',
  };
  private Gunma: IPrefecture = {
    prefCd: '10',
    prefNm: '群馬県',
    name: '群馬',
    prefRomaji: 'gunma',
    areaCd: '12',
  };
  private Niigata: IPrefecture = {
    prefCd: '15',
    prefNm: '新潟県',
    name: '新潟',
    prefRomaji: 'niigata',
    areaCd: '13',
  };
  private Toyama: IPrefecture = {
    prefCd: '16',
    prefNm: '富山県',
    name: '富山',
    prefRomaji: 'toyama',
    areaCd: '13',
  };
  private Ishikawa: IPrefecture = {
    prefCd: '17',
    prefNm: '石川県',
    name: '石川',
    prefRomaji: 'ishikawa',
    areaCd: '13',
  };
  private Fukui: IPrefecture = {
    prefCd: '18',
    prefNm: '福井県',
    name: '福井',
    prefRomaji: 'fukui',
    areaCd: '13',
  };
  private Yamanashi: IPrefecture = {
    prefCd: '19',
    prefNm: '山梨県',
    name: '山梨',
    prefRomaji: 'yamanashi',
    areaCd: '12',
  };
  private Nagano: IPrefecture = {
    prefCd: '20',
    prefNm: '長野県',
    name: '長野',
    prefRomaji: 'nagano',
    areaCd: '13',
  };
  private Aichi: IPrefecture = {
    prefCd: '23',
    prefNm: '愛知県',
    name: '愛知',
    prefRomaji: 'aichi',
    areaCd: '14',
  };
  private Gifu: IPrefecture = {
    prefCd: '21',
    prefNm: '岐阜県',
    name: '岐阜',
    prefRomaji: 'gifu',
    areaCd: '14',
  };
  private Shizuoka: IPrefecture = {
    prefCd: '22',
    prefNm: '静岡県',
    name: '静岡',
    prefRomaji: 'shizuoka',
    areaCd: '14',
  };
  private Mie: IPrefecture = {
    prefCd: '24',
    prefNm: '三重県',
    name: '三重',
    prefRomaji: 'mie',
    areaCd: '14',
  };
  private Osaka: IPrefecture = {
    prefCd: '27',
    prefNm: '大阪府',
    name: '大阪',
    prefRomaji: 'osaka',
    areaCd: '15',
  };
  private Hyogo: IPrefecture = {
    prefCd: '28',
    prefNm: '兵庫県',
    name: '兵庫',
    prefRomaji: 'hyogo',
    areaCd: '15',
  };
  private Kyoto: IPrefecture = {
    prefCd: '26',
    prefNm: '京都府',
    name: '京都',
    prefRomaji: 'kyoto',
    areaCd: '15',
  };
  private Shiga: IPrefecture = {
    prefCd: '25',
    prefNm: '滋賀県',
    name: '滋賀',
    prefRomaji: 'shiga',
    areaCd: '15',
  };
  private Nara: IPrefecture = {
    prefCd: '29',
    prefNm: '奈良県',
    name: '奈良',
    prefRomaji: 'nara',
    areaCd: '15',
  };
  private Wakayama: IPrefecture = {
    prefCd: '30',
    prefNm: '和歌山県',
    name: '和歌山',
    prefRomaji: 'wakayama',
    areaCd: '15',
  };
  private Tokushima: IPrefecture = {
    prefCd: '36',
    prefNm: '徳島県',
    name: '徳島',
    prefRomaji: 'tokushima',
    areaCd: '16',
  };
  private Kagawa: IPrefecture = {
    prefCd: '37',
    prefNm: '香川県',
    name: '香川',
    prefRomaji: 'kagawa',
    areaCd: '16',
  };
  private Ehime: IPrefecture = {
    prefCd: '38',
    prefNm: '愛媛県',
    name: '愛媛',
    prefRomaji: 'ehime',
    areaCd: '16',
  };
  private Kochi: IPrefecture = {
    prefCd: '39',
    prefNm: '高知県',
    name: '高知',
    prefRomaji: 'kochi',
    areaCd: '16',
  };
  private Tottori: IPrefecture = {
    prefCd: '31',
    prefNm: '鳥取県',
    name: '鳥取',
    prefRomaji: 'tottori',
    areaCd: '16',
  };
  private Shimane: IPrefecture = {
    prefCd: '32',
    prefNm: '島根県',
    name: '島根',
    prefRomaji: 'shimane',
    areaCd: '16',
  };
  private Okayama: IPrefecture = {
    prefCd: '33',
    prefNm: '岡山県',
    name: '岡山',
    prefRomaji: 'okayama',
    areaCd: '16',
  };
  private Hiroshima: IPrefecture = {
    prefCd: '34',
    prefNm: '広島県',
    name: '広島',
    prefRomaji: 'hiroshima',
    areaCd: '16',
  };
  private Yamaguchi: IPrefecture = {
    prefCd: '35',
    prefNm: '山口県',
    name: '山口',
    prefRomaji: 'yamaguchi',
    areaCd: '16',
  };
  private Fukuoka: IPrefecture = {
    prefCd: '40',
    prefNm: '福岡県',
    name: '福岡',
    prefRomaji: 'fukuoka',
    areaCd: '17',
  };
  private Saga: IPrefecture = {
    prefCd: '41',
    prefNm: '佐賀県',
    name: '佐賀',
    prefRomaji: 'saga',
    areaCd: '17',
  };
  private Nagasaki: IPrefecture = {
    prefCd: '42',
    prefNm: '長崎県',
    name: '長崎',
    prefRomaji: 'nagasaki',
    areaCd: '17',
  };
  private Kumamoto: IPrefecture = {
    prefCd: '43',
    prefNm: '熊本県',
    name: '熊本',
    prefRomaji: 'kumamoto',
    areaCd: '17',
  };
  private Oita: IPrefecture = {
    prefCd: '44',
    prefNm: '大分県',
    name: '大分',
    prefRomaji: 'oita',
    areaCd: '17',
  };
  private Miyazaki: IPrefecture = {
    prefCd: '45',
    prefNm: '宮崎県',
    name: '宮崎',
    prefRomaji: 'miyazaki',
    areaCd: '17',
  };
  private Kagoshima: IPrefecture = {
    prefCd: '46',
    prefNm: '鹿児島県',
    name: '鹿児島',
    prefRomaji: 'kagoshima',
    areaCd: '17',
  };
  private Okinawa: IPrefecture = {
    prefCd: '47',
    prefNm: '沖縄県',
    name: '沖縄',
    prefRomaji: 'okinawa',
    areaCd: '17',
  };

  /**
   * エリアごとの都道府県一覧データ
   */
  private PrefecturesArea: IArea[] = [
    {
      areaNm: '北海道・東北',
      areaRomaji: 'tohoku',
      prefData: [
        this.Hokkaido,
        this.Aomori,
        this.Iwate,
        this.Akita,
        this.Miyagi,
        this.Yamagata,
        this.Fukushima,
      ],
    },
    {
      areaNm: '関東',
      areaRomaji: 'kanto',
      prefData: [
        this.Tokyo,
        this.Kanagawa,
        this.Chiba,
        this.Saitama,
        this.Gunma,
        this.Tochigi,
        this.Ibaraki,
      ],
    },
    {
      areaNm: '甲信越・北陸',
      areaRomaji: 'hokuriku',
      prefData: [
        this.Yamanashi,
        this.Nagano,
        this.Niigata,
        this.Ishikawa,
        this.Toyama,
        this.Fukui,
      ],
    },
    {
      areaNm: '東海',
      areaRomaji: 'tokai',
      prefData: [this.Aichi, this.Shizuoka, this.Gifu, this.Mie],
    },
    {
      areaNm: '近畿',
      areaRomaji: 'kinki',
      prefData: [
        this.Osaka,
        this.Hyogo,
        this.Kyoto,
        this.Shiga,
        this.Nara,
        this.Wakayama,
      ],
    },
    {
      areaNm: '中国',
      areaRomaji: 'chugoku',
      prefData: [
        this.Hiroshima,
        this.Okayama,
        this.Tottori,
        this.Shimane,
        this.Yamaguchi,
      ],
    },
    {
      areaNm: '四国',
      areaRomaji: 'shikoku',
      prefData: [this.Kagawa, this.Ehime, this.Tokushima, this.Kochi],
    },
    {
      areaNm: '九州・沖縄',
      areaRomaji: 'kyushu',
      prefData: [
        this.Fukuoka,
        this.Nagasaki,
        this.Kumamoto,
        this.Saga,
        this.Oita,
        this.Miyazaki,
        this.Kagoshima,
        this.Okinawa,
      ],
    },
  ];

  /**
   * 都道府県データ一覧
   */
  private allPrefectures = this.PrefecturesArea.reduce(
    (prev, curr) => [...prev, ...curr.prefData],
    [] as IPrefecture[]
  );

  /**
   * 都道府県コードから都道府県データを１件取得
   * @param prefectureCd 都道府県コード
   * @returns 都道府県データ
   */
  getPrefecture(prefectureCode: string) {
    const prefectureData = this.getPrefectures().find(
      (pref) => pref.prefCd === prefectureCode
    );
    if (prefectureData) {
      return prefectureData;
    } else {
      throw new Error(`都道府県コードが無効です: ${prefectureCode}`);
    }
  }

  /**
   * 都道府県名から都道府県データを１件取得
   * @param PrefectureName 都道府県コード
   * @returns 都道府県データ
   */
  getPrefectureByName(prefectureName: string) {
    const prefectureData = this.getPrefectures().find(
      (pref) => pref.prefNm === prefectureName
    );
    if (prefectureData) {
      return prefectureData;
    } else {
      throw new Error(`都道府県名が無効です: ${prefectureName}`);
    }
  }

  /**
   * 都道府県コードから都道府県名を取得
   * @param prefectureCd 都道府県コード
   * @returns 都道府県名
   */
  getPrefectureName(prefectureCode: string) {
    const prefectureData = this.getPrefectures().find(
      (pref) => pref.prefCd === prefectureCode
    );
    if (prefectureData) {
      return prefectureData.prefNm;
    } else {
      throw new Error(`都道府県コードが無効です: ${prefectureCode}`);
    }
  }

  /**
   * 都道府県名から都道府県コードを取得
   * @param PrefectureName 都道府県コード
   * @returns 都道府県コード
   */
  getPrefectureCode(prefectureName: string) {
    const prefectureData = this.getPrefectures().find(
      (pref) => pref.prefNm === prefectureName
    );
    if (prefectureData) {
      return prefectureData.prefCd;
    } else {
      throw new Error(`都道府県名が無効です: ${prefectureName}`);
    }
  }

  /**
   * 都道府県データ一覧を取得
   * @returns 都道府県データ一覧
   */
  getPrefectures() {
    return this.allPrefectures;
  }

  /**
   * エリアごとの都道府県一覧データを取得
   * @returns エリアごとの都道府県一覧データ
   */
  getAreaPrefectures() {
    return this.PrefecturesArea;
  }
}
