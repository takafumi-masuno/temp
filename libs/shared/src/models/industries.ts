export class IndustriesConstant {
  public static readonly undeterminedIndustryCd = 'tp999';
  // public static readonly industries: IIndustry[] = [
  //   {
  //     code: 'tp005',
  //     name: '美容・医療・介護',
  //     romaji: 'beauty_medical',
  //     subcategories: [
  //       {
  //         code: 'tp115',
  //         name: '美容室・理容室',
  //         romaji: 'barber'
  //       },
  //       {
  //         code: 'tp116',
  //         name: 'エステサロン',
  //         romaji: 'esthetic'
  //       },
  //       {
  //         code: 'tp117',
  //         name: 'その他サロン',
  //         romaji: 'else_salon'
  //       },
  //       {
  //         code: 'tp118',
  //         name: 'マッサージ・整体院',
  //         romaji: 'massage'
  //       },
  //       {
  //         code: 'tp119',
  //         name: '歯科',
  //         romaji: 'dental'
  //       },
  //       {
  //         code: 'tp120',
  //         name: '病院・クリニック',
  //         romaji: 'clinic'
  //       },
  //       {
  //         code: 'tp121',
  //         name: '美容・医療・介護その他',
  //         romaji: 'else_health'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp001',
  //     name: '重飲食を含む飲食店',
  //     romaji: 'juinshoku',
  //     subcategories: [
  //       {
  //         code: 'tp101',
  //         name: 'ラーメン・中華料理',
  //         romaji: 'chinese'
  //       },
  //       {
  //         code: 'tp102',
  //         name: '焼肉・韓国料理',
  //         romaji: 'korean'
  //       },
  //       {
  //         code: 'tp103',
  //         name: 'カレー・多国籍料理',
  //         romaji: 'curry'
  //       },
  //       {
  //         code: 'tp104',
  //         name: '和食・寿司',
  //         romaji: 'japanese'
  //       },
  //       {
  //         code: 'tp105',
  //         name: 'うどん・そば',
  //         romaji: 'noodle'
  //       },
  //       {
  //         code: 'tp106',
  //         name: '焼き鳥',
  //         romaji: 'yakitori'
  //       },
  //       {
  //         code: 'tp107',
  //         name: '鉄板焼き・お好み焼き',
  //         romaji: 'iron_plate'
  //       },
  //       {
  //         code: 'tp108',
  //         name: '洋食・レストラン',
  //         romaji: 'yoshoku'
  //       },
  //       {
  //         code: 'tp109',
  //         name: '居酒屋・ダイニングバー',
  //         romaji: 'izakaya'
  //       },
  //       {
  //         code: 'tp110',
  //         name: 'パン屋・ケーキ屋',
  //         romaji: 'bakery'
  //       },
  //       {
  //         code: 'tp111',
  //         name: 'テイクアウト・デリバリー',
  //         romaji: 'takeout'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp002',
  //     name: '軽飲食(カフェ・喫茶店など)',
  //     romaji: 'keiinsyoku',
  //     subcategories: [
  //       {
  //         code: 'tp112',
  //         name: 'カフェ・喫茶店など',
  //         romaji: 'cafe'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp003',
  //     name: 'バー・クラブ・スナックなど',
  //     romaji: 'bar',
  //     subcategories: [
  //       {
  //         code: 'tp113',
  //         name: 'バー・クラブ・スナックなど',
  //         romaji: 'bar'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp004',
  //     name: 'その他飲食店',
  //     romaji: 'else_restaurant',
  //     subcategories: [
  //       {
  //         code: 'tp114',
  //         name: 'その他飲食店',
  //         romaji: 'else_restaurant'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp006',
  //     name: '小売・物販',
  //     romaji: 'retailshops',
  //     subcategories: [
  //       {
  //         code: 'tp122',
  //         name: 'ファッション・雑貨',
  //         romaji: 'fashion'
  //       },
  //       {
  //         code: 'tp123',
  //         name: 'コンビニ・ドラッグストア',
  //         romaji: 'pharmacy'
  //       },
  //       {
  //         code: 'tp124',
  //         name: 'スーパーマーケット',
  //         romaji: 'supermarket'
  //       },
  //       {
  //         code: 'tp125',
  //         name: '小売・物販その他',
  //         romaji: 'else_retail'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp007',
  //     name: 'アミューズメント',
  //     romaji: 'amusement',
  //     subcategories: [
  //       {
  //         code: 'tp126',
  //         name: 'ゲーム・パチンコ',
  //         romaji: 'arcade'
  //       },
  //       {
  //         code: 'tp127',
  //         name: 'カラオケ',
  //         romaji: 'karaoke'
  //       },
  //       {
  //         code: 'tp128',
  //         name: 'ネットカフェ・漫画喫茶',
  //         romaji: 'netcafe'
  //       },
  //       {
  //         code: 'tp129',
  //         name: 'スタジオ・ホール',
  //         romaji: 'studio'
  //       },
  //       {
  //         code: 'tp130',
  //         name: 'アミューズメントその他',
  //         romaji: 'else_amusement'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp008',
  //     name: '塾・スクール',
  //     romaji: 'academy',
  //     subcategories: [
  //       {
  //         code: 'tp131',
  //         name: '塾・スクール',
  //         romaji: 'academy'
  //       }
  //     ]
  //   },
  //   {
  //     code: 'tp009',
  //     name: 'その他',
  //     romaji: 'other_stores',
  //     subcategories: [
  //       {
  //         code: 'tp132',
  //         name: 'その他',
  //         romaji: 'other_stores'
  //       }
  //     ]
  //   }
  // ];

  // 業種の並び順を定義
  public static readonly industyrGroupSort = {
    tp005: 0,
    tp001: 1,
    tp002: 2,
    tp003: 2,
    tp004: 2,
    tp006: 3,
    tp007: 4,
    tp008: 5,
    tp009: 5,
  };
}
