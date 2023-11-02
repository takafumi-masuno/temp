const axios = require('axios');

let arrayUrl = [
  'http://localhost:4000/rent_office',
  'http://localhost:4000/rent_office/tokyo/',
  // 沿線トップ
  'http://localhost:4000/rent_office/kanagawa/line/',
  // 駅選択
  'http://localhost:4000/rent_office/tokyo/line/station/?pref=13&stations=sobu_2199-&q=1',
  // 駅トップ
  'http://localhost:4000/rent_office/kanagawa/yokohama-st/',
  // 路線トップ
  'http://localhost:4000/rent_office/kanagawa/rosen_map/',
  // 神奈川 政令指定都市
  'http://localhost:4000/rent_office/kanagawa/yokohama-locate/',
  // 地図トップ
  'http://localhost:4000/rent_office/tokyo/map/',

  // 通勤通学
  'http://localhost:4000/rent_office/commute_time/',
  // ここから物件一覧
  // 駅選択 複数
  'http://localhost:4000/rent_office/tokyo/list/?pref=14&stations=chuo_2184-2196200&basic=kc501,kc626,kt401,kt201,ke001,kn001,kj001&kod=&q=1',
  // 駅 GET
  'http://localhost:4000/rent_office/kanagawa/yokohama-st/list/',
  // 地図選択
  'http://localhost:4000/rent_office/tokyo/map/list/?LAT=35.69970378888889&LON=139.63627384166693&CRN=suginami',
  // 市区複数
  'http://localhost:4000/rent_office/tokyo/list/?pref=70&cities=chiyoda,bunkyo&basic=kc501,kc626,kt401,kt201,ke001,kn001,kj001&kod=&q=1',
  // 町村単数
  'http://localhost:4000/rent_office/kanagawa/yokohama_tsurumi-city/001-town/list/',
  // 町村複数
  'http://localhost:4000/rent_office/tokyo/chuo-city/choson/?pref=13&cities=chuo&basic=kc501,kc626,kt401,kt201,ke001,kn001,kj001&kod=&q=1',
  // 政令指定都市
  'http://localhost:4000/rent_office/kanagawa/yokohama-locate/list',
  // 路線図
  'http://localhost:4000/rent_office/kanagawa/list/?pref=14&routemap=23258&basic=kc501,kc626,kt401,kt201,ke001,kn001,kj001&kod=&q=1',
  // 通勤通学
  'http://localhost:4000/rent_office/commute_time/list/?comOpt=0,0,0&comFirst=東京,30,3&basic=kc501,kc626,kt401,kt201,ke001,kn001,kj001&kod=&q=1',
  // ここまで物件一覧
  // 物件詳細
  'http://localhost:4000/rent_office/6973340198/',

  // 物件詳細地図
  'http://localhost:4000/rent_office/1081763718/map/',

  // 特集TOP
  'http://localhost:4000/rent_office/theme/24security',

  // 特集都道府県
  'http://localhost:4000/rent_office/theme/24security/tokyo',

  // 特集市区TOP
  'http://localhost:4000/rent_office/theme/24security/tokyo/city/',

  // 特集沿線
  'http://localhost:4000/rent_office/theme/24security/tokyo/line/',

  // 特集駅選択
  'http://localhost:4000/rent_office/theme/24security/tokyo/line/station/?pref=13&stations=yamanote_2172-&q=1',

  // 特集都道府県物件一覧(他割愛)
  'http://localhost:4000/rent_office/theme/24security/tokyo/list',
];

let count = 0;

(async () => {
  try {
    for (var i = 0; i < arrayUrl.length; i++) {
      count++;
      if (arrayUrl[i] != '') {
        const response = await axios.get(encodeURI(arrayUrl[i]), {
          validateStatus: false,
          proxy: false,
          withCredentials: true,
          headers: { Cookie: '' },
        });

        if (response.status != '200') {
          console.log(
            '\x1b[31m',
            i + ' ' + response.status + ' -- ' + arrayUrl[i]
          );
        } else {
          /**
           * 【Mac】
           * console.log('\x1b[30m', response.status + ' -- ' + arrayUrl[i]);
           *
           * 【Windows】
           * console.log('\x1b[31m', response.status + ' -- ' + arrayUrl[i]);
           */
          console.log('\x1b[31m', response.status + ' -- ' + arrayUrl[i]);
        }
      }
    }
  } catch (e) {
    console.log('\x1b[31m', ' -- ' + arrayUrl[count] + 'でシェルがエラー発生');
    console.log(e);
    process.exit();
  }
})();
