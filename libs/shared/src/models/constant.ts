export class CommonConstant {
  public static readonly siteCd = {
    pc: '00000',
    iphone: '00605',
    android: '00607',
  };

  public static readonly itemArtType: Record<string, unknown> = {
    akiya: {
      key: 'rent_office', //TODO at側で空き家バンクのAPI設定されたらakiyaに変更する
      item: '',
      art: '',
      title: '空き家バンク',
      name: '空き家',
      agreement: '売買',
      bffType: 'business-bff',
      personalType: 'office',
    },
    rent_store: {
      key: 'rent_store',
      item: 'jr',
      art: '03',
      title: '貸店舗・空き店舗',
      modalTitle: '貸店舗・空き店舗',
      name: '貸店舗',
      agreement: '賃貸',
      bffType: 'business-bff',
      personalType: 'store',
    },
    rent_office: {
      key: 'rent_office',
      item: 'jr',
      art: '04',
      title: '貸事務所・賃貸オフィス',
      modalTitle: '貸事務所・賃貸オフィス',
      name: '貸事務所',
      agreement: '賃貸',
      bffType: 'business-bff',
      personalType: 'office',
    },
    rent_parking: {
      key: 'rent_parking',
      item: 'jr',
      art: '02',
      title: '月極駐車場・貸し駐車場',
      modalTitle: '月極駐車場・貸駐車場',
      name: '貸駐車場',
      agreement: '賃貸',
      bffType: 'business-bff',
      personalType: 'office',
    },
    rent_tochi: {
      key: 'rent_tochi',
      item: 'jr',
      art: '05',
      title: '貸土地',
      modalTitle: '貸土地',
      name: '貸土地',
      agreement: '賃貸',
      bffType: 'business-bff',
      personalType: 'office',
    },
    rent_souko: {
      key: 'rent_souko',
      item: 'jr',
      art: '06',
      title: '貸し倉庫',
      modalTitle: '貸倉庫',
      name: '貸倉庫',
      agreement: '賃貸',
      bffType: 'business-bff',
      personalType: 'office',
    },
    rent_other: {
      key: 'rent_other',
      item: 'jr',
      art: '06',
      title: '貸ビル・その他',
      modalTitle: '貸ビル・その他',
      name: '貸その他',
      agreement: '賃貸',
      bffType: 'business-bff',
      personalType: 'office',
    },
    buy_store: {
      key: 'buy_store',
      item: 'js',
      art: '15',
      title: '売店舗',
      modalTitle: '売店舗',
      name: '売店舗',
      agreement: '売買',
      bffType: 'business-bff',
      personalType: 'js',
    },
    buy_office: {
      key: 'buy_office',
      item: 'js',
      art: '16',
      title: '売事務所',
      modalTitle: '売事務所',
      name: '売事務所',
      agreement: '売買',
      bffType: 'business-bff',
      personalType: 'js',
    },
    buy_other: {
      key: 'buy_other',
      item: 'js',
      art: '17',
      title: '売ビル・一棟売マンション・その他',
      modalTitle: '売ビル・一棟売マンション・その他',
      name: '売その他',
      agreement: '売買',
      bffType: 'business-bff',
      personalType: 'js',
    },
    estate: {
      key: 'estate',
      item: 'me',
      art: '20',
      title: 'アットホーム加盟店',
      modalTitle: 'アットホーム加盟店',
      name: '不動産会社',
      agreement: 'アットホーム加盟店',
      bffType: 'business-bff',
      personalType: 'me',
    },
    chintai: {
      key: 'chintai',
      item: 'kr',
      art: '01',
      title: 'アパート・マンション・一戸建て',
      modalTitle: 'アパート・マンション・一戸建て',
      name: '賃貸',
      agreement: '賃貸',
      bffType: 'business-bff',
    },
    'mansion/chuko': {
      key: 'mansion',
      item: 'ks',
      art: '12',
      title: '中古マンション(一部新築含む)',
      modalTitle: '中古マンション(一部新築含む)',
      name: '中古マンション',
      agreement: '売買',
      bffType: 'business-bff',
    },
    'mansion/ownerchange': {
      key: 'mansion',
      item: 'ks',
      art: '22',
      title: 'オーナーチェンジマンション',
      modalTitle: 'オーナーチェンジマンション',
      name: '中古マンション',
      agreement: '売買',
      bffType: 'business-bff',
    },
    mansion: {
      key: 'mansion',
      item: 'ks',
      art: '12',
      title: '土地',
      modalTitle: '土地',
      name: '土地',
      agreement: '売買',
      bffType: 'business-bff',
    },
    kodate: {
      key: 'kodate',
      item: 'ks',
      art: '13',
      title: '一戸建て',
      modalTitle: '一戸建て',
      name: '一戸建て',
      agreement: '売買',
      bffType: 'business-bff',
    },
    tochi: {
      key: 'tochi',
      item: 'ks',
      art: '14',
      title: '土地',
      modalTitle: '土地',
      name: '土地',
      agreement: '売買',
      bffType: 'business-bff',
    },

    resort: {
      key: 'resort',
      item: 'rs',
      art: '20',
      title: 'リゾート',
      modalTitle: 'リゾート',
      name: 'リゾート',
      agreement: 'リゾート',
      bffType: 'business-bff',
    },

    resort_mansion: {
      key: '',
      item: '',
      art: '31',
      title: '',
      modalTitle: '',
      name: '',
      agreement: '',
      bffType: 'business-bff',
    },
    resort_kodate: {
      key: '',
      item: '',
      art: '32',
      title: '',
      modalTitle: '',
      name: '',
      agreement: '',
      bffType: 'business-bff',
    },
    resort_tochi: {
      key: '',
      item: '',
      art: '33',
      title: '',
      modalTitle: '',
      name: '',
      agreement: '',
      bffType: 'business-bff',
    },
  };

  // 特記
  public static readonly feature = {
    デザイナーズ: 'assets/common/icon_rent-designers.svg',
    前面ガラス張り: 'assets/common/icon_rent-glass.svg',
    外装改装相談: 'assets/common/icon_rent-exterior.svg',
    演奏可能: 'assets/common/icon_rent-playable.svg',
    深夜営業可能: 'assets/common/icon_rent-night.svg',
    複数台駐車可: 'assets/common/icon_rent-cars.svg',
    駅前立地: 'assets/common/icon_rent-front-st.svg',
    商店街: 'assets/common/icon_rent-shop.svg',
    繁華街: 'assets/common/icon_rent-downtown.svg',
    駅または駅ビル: 'assets/common/icon_rent-station.svg',
    ロードサイド: 'assets/common/icon_rent-roadside.svg',
    路面店: 'assets/common/icon_rent-rs-store.svg',
    '24時間利用可': 'assets/common/icon_rent-24h.svg',
    '駐車場(近隣含む)': 'assets/common/icon_rent-parking.svg',
    角地: 'assets/common/icon_rent-corner.svg',
  };

  public static readonly japaneseInitials = [
    'あ',
    'か',
    'さ',
    'た',
    'な',
    'は',
    'ま',
    'や',
    'ら',
    'わ',
  ];
}

export class LineSelectConstant {
  public static readonly maxLineNum = 5;
}

export class UrlConstant {
  public static readonly firstView = 'first-view';

  public static readonly bffType = {
    business: 'business-bff',
  };
}

export enum SearchType {
  station = '沿線・駅から探す',
  city = '地域から探す',
  stationMap = '路線図から探す',
  commute = '通勤通学時間から探す',
}

export type DisplayPattern = {
  tochiMs?: boolean;
  areaMs?: boolean;
  tsuboMs?: boolean;
  newIcon?: boolean;
  type?: boolean;
  shichikuIcon?: boolean;
  photoManyIcon?: boolean;
};

export class PropertyDetailConstant {
  public static readonly facility: {
    [key: string]: { offIcon: string; onIcon: string };
  } = {
    P01: {
      offIcon: 'icon_tag_1st_floor.svg',
      onIcon: 'icon_tag_1st_floor_on.svg',
    },
    P02: {
      offIcon: 'icon_tag_2nd_floor.svg',
      onIcon: 'icon_tag_2nd_floor_on.svg',
    },
    A01: { offIcon: 'icon_tag_air_con.svg', onIcon: 'icon_tag_air_con_on.svg' },
    S01: {
      offIcon: 'icon_tag_autolock.svg',
      onIcon: 'icon_tag_autolock_on.svg',
    },
    5: {
      offIcon: 'icon_tag_bath_toilet.svg',
      onIcon: 'icon_tag_bath_toilet_on.svg',
    },
    O25: {
      offIcon: 'icon_tag_city_gas.svg',
      onIcon: 'icon_tag_city_gas_on.svg',
    },
    G01: {
      offIcon: 'icon_tag_clear_land.svg',
      onIcon: 'icon_tag_clear_land_on.svg',
    },
    O30: {
      offIcon: 'icon_tag_electricity.svg',
      onIcon: 'icon_tag_electricity_on.svg',
    },
    O08: {
      offIcon: 'icon_tag_elevator.svg',
      onIcon: 'icon_tag_elevator_on.svg',
    },
    10: {
      offIcon: 'icon_tag_flooring.svg',
      onIcon: 'icon_tag_flooring_on.svg',
    },
    O52: { offIcon: 'icon_tag_gutter.svg', onIcon: 'icon_tag_gutter_on.svg' },
    C01: {
      offIcon: 'icon_tag_Immediate-delivery.svg',
      onIcon: 'icon_tag_Immediate-delivery_on.svg',
    },
    P06: { offIcon: 'icon_tag_kakuchi.svg', onIcon: 'icon_tag_kakuchi_on.svg' },
    O50: { offIcon: 'icon_tag_oa.svg', onIcon: 'icon_tag_oa_on.svg' },
    C18: {
      offIcon: 'icon_tag_open24hours.svg',
      onIcon: 'icon_tag_open24hours_on.svg',
    },
    T04: {
      offIcon: 'icon_tag_optical-fiber.svg',
      onIcon: 'icon_tag_optical-fiber_on.svg',
    },
    O20: { offIcon: 'icon_tag_parking.svg', onIcon: 'icon_tag_parking_on.svg' },
    18: { offIcon: 'icon_tag_pet.svg', onIcon: 'icon_tag_pet_on.svg' },
    O26: {
      offIcon: 'icon_tag_propane_gas.svg',
      onIcon: 'icon_tag_propane_gas_on.svg',
    },
    O27: {
      offIcon: 'icon_tag_water_supply.svg',
      onIcon: 'icon_tag_water_supply_on.svg',
    },
    jokenCd: {
      offIcon: 'icon_tag_refueling.svg',
      onIcon: 'icon_tag_refueling_on.svg',
    },
    21: {
      offIcon: 'icon_tag_reheating.svg',
      onIcon: 'icon_tag_reheating_on.svg',
    },
    22: {
      offIcon: 'icon_tag_restaurant.svg',
      onIcon: 'icon_tag_restaurant_on.svg',
    },
    B08: {
      offIcon: 'icon_tag_separate-toilets.svg',
      onIcon: 'icon_tag_separate-toilets_on.svg',
    },
    O29: {
      offIcon: 'icon_tag_septic_tank.svg',
      onIcon: 'icon_tag_septic_tank_on.svg',
    },
    O28: { offIcon: 'icon_tag_sewer.svg', onIcon: 'icon_tag_sewer_on.svg' },
    26: { offIcon: 'icon_tag_south.svg', onIcon: 'icon_tag_south_on.svg' },
    27: {
      offIcon: 'icon_tag_staying_out.svg',
      onIcon: 'icon_tag_staying_out_on.svg',
    },
    P03: {
      offIcon: 'icon_tag_top_floor.svg',
      onIcon: 'icon_tag_top_floor_on.svg',
    },
    29: { offIcon: 'icon_tag_washing.svg', onIcon: 'icon_tag_washing_on.svg' },
    O36: {
      offIcon: 'icon_tag_water_supply.svg',
      onIcon: 'icon_tag_water_supply_on.svg',
    },
    C16: {
      offIcon: 'icon_tag_staying_out.svg',
      onIcon: 'icon_tag_staying_out_on.svg',
    },
  };

  public static readonly feature = {
    1: 'assets/pc/property-detail/icon_feature_designers.svg',
    2: 'assets/pc/property-detail/icon_feature_front-glass.svg',
    3: 'assets/pc/property-detail/icon_feature_remodelling.svg',
    4: 'assets/pc/property-detail/icon_feature_performance.svg',
    5: 'assets/pc/property-detail/icon_feature_midnight.svg',
    6: 'assets/pc/property-detail/icon_feature_parking-place.svg',
    7: 'assets/pc/property-detail/icon_feature_front-station.svg',
    8: 'assets/pc/property-detail/icon_feature_shopping-street.svg',
    9: 'assets/pc/property-detail/icon_feature_downtown.svg',
    10: 'assets/pc/property-detail/icon_feature_station-building.svg',
    11: 'assets/pc/property-detail/icon_feature_roadside.svg',
    12: 'assets/pc/property-detail/icon_feature_roadside-store.svg',
    13: 'assets/pc/property-detail/icon_feature_corner.svg',
    14: 'assets/pc/property-detail/icon_feature_24h.svg',
    15: 'assets/pc/property-detail/icon_feature_parking.svg',
  };
}

export class PropertyListConstant {
  public static readonly maxPageEange = 10;

  public static readonly maxMapPageEange = 5;

  public static readonly maxFreewordMapPageEange = 30;

  /** マップにて物件検索許可をするZoomレベル */
  static readonly mapSearchMinZoom = 13;

  // mapの会員のlabelの位置
  static readonly mapKaiinLabelOringPc = { width: 44, height: 28 };
  static readonly mapKaiinLabelOringSp = { width: 20, height: 28 };
  // mapの会員のlabelの位置（estateで利用）
  static readonly mapKaiinEstateLabelOringPc = { width: 33, height: 11 };
  static readonly mapKaiinEstateLabelOringSp = { width: 20, height: 20 };

  public static readonly defaultSort = '95';
  public static readonly defaultCount = '30';
  public static readonly defaultSortList = {
    estate: '41',
    resort: '50',
  };

  public static readonly defaultCountList = {
    estate: '20',
  };
}

export class StorageConstant {
  public static readonly key = {
    search: 'search',
    line: 'line',
    lastSearch: 'lastSearch',
  };
}

export class RoutemapConstant {
  public static readonly initialZoomSize = 17;
  public static readonly isVekiCd = '1';
}

export class TargetTypeConstant {
  public static readonly targetType = {
    station: 'station',
    city: 'city',
    town: 'town',
    commuteTime: 'commute_time',
    map: 'map',
    prefecture: 'prefecture',
  };
}
