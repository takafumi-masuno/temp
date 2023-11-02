export class RecommendedConditionsConstant {
  public static readonly conditions: Record<
    string,
    { id: string; name: string; defaultTemplate: string }
  > = {
    EKITOHO: {
      id: 'EKITOHO',
      name: '駅徒歩',
      defaultTemplate: '{{dispName}}にすれば{{count}}件増えます',
    },
    PRICETO: {
      id: 'PRICETO',
      name: '賃料',
      defaultTemplate: '予算をあと{{dispName}}増やせば{{count}}件増えます',
    },
    MADORI: {
      id: 'MADORI',
      name: '間取り',
      defaultTemplate: '間取で{{dispName}}を追加すると{{count}}件増えます',
    },
    MENSEKI: {
      id: 'MENSEKI',
      name: '面積',
      defaultTemplate: '{{dispName}}下げれば{{count}}件増えます',
    },
    TSUBO: {
      id: 'TSUBO',
      name: '面積',
      defaultTemplate: '{{dispName}}下げれば{{count}}件増えます',
    },
    CHIKUNENSU: {
      id: 'CHIKUNENSU',
      name: '築年数',
      defaultTemplate: '{{dispName}}にすれば{{count}}件増えます',
    },
    VEKITIME: {
      id: 'VEKITIME',
      name: '所要時間',
      defaultTemplate: '所要時間をあと{{dispName}}増やせば{{count}}件増えます',
    },
    TOCHIMENSEKI: {
      id: 'TOCHIMENSEKI',
      name: '面積',
      defaultTemplate: '{{dispName}}下げれば{{count}}件増えます',
    },
  };
}

type SelectCondition = {
  code: string;
  name: string;
  romaji: string;
  long?: boolean;
};

export class SelectConditionsConstant {
  public static readonly otherCategory: SelectCondition[] = [
    {
      code: 'C16',
      name: '居抜き',
      romaji: 'inuki',
    },
    {
      code: 'C17',
      name: 'スケルトン',
      romaji: 'skelton',
    },
  ];
  public static readonly categories: {
    name: string;
    romaji: string;
    conditions: SelectCondition[];
  }[] = [
    {
      name: '状態',
      romaji: 'jotai',
      conditions: [
        {
          code: 'R32',
          name: '造作譲渡無償',
          romaji: 'jotomusho',
        },
        {
          code: 'R03',
          name: '内覧会あり',
          romaji: 'preview',
        },
      ],
    },
    {
      name: '外観・設備',
      romaji: 'gaikan',
      conditions: [
        {
          code: 'R08',
          name: '看板取付スペースあり',
          romaji: 'billbord',
        },
        {
          code: 'R33',
          name: 'シャッター付き',
          romaji: 'shutter',
        },
        {
          code: 'R27',
          name: '天井高3m以上',
          romaji: 'over3mheigh',
        },
        {
          code: 'R07',
          name: '前面ガラス張り',
          romaji: 'frontglass',
        },
        {
          code: 'R09',
          name: '外装改装相談',
          romaji: 'exteriorremodeling',
        },
      ],
    },
    {
      name: '内装・設備',
      romaji: 'naikan',
      conditions: [
        {
          code: 'R31',
          name: '冷暖房あり',
          romaji: 'airconditioning',
        },
        {
          code: 'R13',
          name: '換気口あり',
          romaji: 'vent',
        },
        {
          code: 'R14',
          name: '排煙設備あり',
          romaji: 'smokevent',
        },
        {
          code: 'R15',
          name: 'グリストラップあり',
          romaji: 'greasetrap',
        },
        {
          code: 'R16',
          name: '厨房防水あり',
          romaji: 'waterproof',
        },
        {
          code: 'R17',
          name: '排水設備あり',
          romaji: 'drain',
        },
        {
          code: 'R18',
          name: '防音処理あり',
          romaji: 'soundproof',
        },
        {
          code: 'B08',
          name: '男女別トイレ',
          romaji: 'separatewc',
        },
        {
          code: 'O08',
          name: 'エレベーター',
          romaji: 'elevator',
        },
        {
          code: 'O36',
          name: '給湯',
          romaji: 'boiler',
        },
        {
          code: 'R29',
          name: '水道メーター口径25mm以上',
          romaji: 'over25mmbore',
        },
      ],
    },
    {
      name: 'セキュリティ',
      romaji: 'security',
      conditions: [
        {
          code: 'S04',
          name: '24時間セキュリティ',
          romaji: '24security',
        },
        {
          code: 'S16',
          name: '電動シャッター',
          romaji: 'autoshutter',
        },
        {
          code: 'S07',
          name: '防犯カメラ',
          romaji: 'securitycam',
        },
        {
          code: 'S11',
          name: '防犯用ガラス',
          romaji: 'securityglass',
        },
      ],
    },
    {
      name: '条件',
      romaji: 'joken',
      conditions: [
        {
          code: 'R01',
          name: '原状回復義務なし',
          romaji: 'norestoration',
        },
        {
          code: 'C01',
          name: '即引渡し可',
          romaji: 'sokuhikiwatashi',
        },
        {
          code: 'C11',
          name: 'フリーレント',
          romaji: 'freerent',
        },
      ],
    },
    {
      name: '特徴',
      romaji: 'tokucho',
      conditions: [
        {
          code: 'R10',
          name: 'デザイナーズ',
          romaji: 'designers',
        },
        {
          code: 'R05',
          name: '演奏可能',
          romaji: 'concert',
        },
        {
          code: 'R06',
          name: '深夜営業可能',
          romaji: 'latenight',
        },
        {
          code: 'C02',
          name: '飲食店可',
          romaji: 'restaurant',
        },
        {
          code: 'C18',
          name: '24時間利用可',
          romaji: '24hours',
        },
      ],
    },
    {
      name: '駐車場',
      romaji: 'chusyajo',
      conditions: [
        {
          code: 'R28',
          name: '複数台駐車可',
          romaji: 'parkingspace',
        },
        {
          code: 'R30',
          name: '駐車場(近隣含む)',
          romaji: 'parking',
        },
      ],
    },
    {
      name: '立地',
      romaji: 'ritchi',
      conditions: [
        {
          code: 'R19',
          name: '駅前立地',
          romaji: 'nearstation',
        },
        {
          code: 'R20',
          name: '商店街',
          romaji: 'shoppingarcade',
        },
        {
          code: 'R21',
          name: '繁華街',
          romaji: 'downtown',
        },
        {
          code: 'R22',
          name: '駅または駅ビル',
          romaji: 'stationbuilding',
        },
        {
          code: 'R23',
          name: 'ロードサイド',
          romaji: 'roadside',
        },
        {
          code: 'R24',
          name: '路面店',
          romaji: 'roadsurfaceshop',
        },
        {
          code: 'R26',
          name: '角地',
          romaji: 'corner',
        },
        {
          code: 'P02',
          name: '2階以上',
          romaji: '2ndfloor',
        },
        {
          code: 'P03',
          name: '最上階',
          romaji: 'topfloor',
        },
        {
          code: 'P01',
          name: '1階',
          romaji: '1stfloor',
        },
        {
          code: 'P08',
          name: '地下階',
          romaji: 'basement',
        },
      ],
    },
  ];

  public static readonly allConditions = [
    { name: 'その他', conditions: SelectConditionsConstant.otherCategory },
    ...SelectConditionsConstant.categories,
  ];

  public static readonly flatAllConditions =
    SelectConditionsConstant.allConditions.reduce(
      (prev, curr) => [...prev, ...(curr.conditions || [])],
      [] as SelectCondition[]
    );
}
