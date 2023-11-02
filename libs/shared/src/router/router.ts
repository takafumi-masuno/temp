import {
  DefaultUrlSerializer,
  Route,
  UrlMatcher,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import at from 'lodash/at';

const internetNoPattern = /^\d{6,11}$/;
const staffNoPattern = /^\d{8,11}$/;

export function matcherFeatureTop(url: UrlSegment[]) {
  if (url[0]?.path === 'theme' && url[1]?.path && !url[2]) {
    return {
      consumed: url,
      posParams: {
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}
export function matcherFeaturePrefectureTop(url: UrlSegment[]) {
  if (url[0]?.path === 'theme' && url[1]?.path && url[2]?.path && !url[3]) {
    return {
      consumed: url,
      posParams: {
        featureRoman: new UrlSegment(url[1]?.path, {}),
        prefNm: new UrlSegment(url[2]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherMap(url: UrlSegment[]) {
  if (
    url[0]?.path === 'map' &&
    url[1]?.path === 'bklist' &&
    checkBukkenList(url, 'bklist')
  ) {
    return {
      consumed: url,
      posParams: {
        param: new UrlSegment('list', {}),
      },
    };
  } else if (url[0]?.path === 'current' && url[1]?.path === 'bklist') {
    return {
      consumed: url,
      posParams: {
        current: new UrlSegment(
          url[0]?.path === 'current' ? url[0]?.path : '',
          {}
        ),
      },
    };
  }
  return null;
}

export function matcherFreeWordMap(url: UrlSegment[]) {
  if (url[0]?.path === 'freewords' && url[1]?.path === 'bklist') {
    return {
      consumed: url,
    };
  }
  return null;
}

export function matcherFeatureStation(url: UrlSegment[]) {
  if (url[0]?.path === 'theme' && url[3]?.path.match(/-st/) && !url[4]) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[2]?.path, {}),
        st: new UrlSegment(url[3]?.path, {}),
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherFeatureCity(url: UrlSegment[]) {
  if (url[0]?.path === 'theme' && url[3]?.path.match(/-city/) && !url[4]) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[2]?.path, {}),
        city: new UrlSegment(url[3]?.path, {}),
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherFeatureLocation(url: UrlSegment[]) {
  if (url[0]?.path === 'theme' && url[3]?.path.match(/-locate/) && !url[4]) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[2]?.path, {}),
        locate: new UrlSegment(url[3]?.path, {}),
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherMapList(url: UrlSegment[]) {
  if (
    (url[0]?.path === 'current' && url[1]?.path === 'list') ||
    (!url[2] && url[0]?.path === 'map' && url[1]?.path === 'list')
  ) {
    return {
      consumed: url,
      posParams: {
        current: new UrlSegment(
          url[0]?.path === 'current' ? url[0]?.path : '',
          {}
        ),
      },
    };
  } else if (
    url[0]?.path === 'hankagai' &&
    url[2]?.path === 'map' &&
    url[3]?.path === 'list'
  ) {
    return {
      consumed: url,
    };
  }
  return null;
}

/**
 * 会員の物件一覧 matcher
 * 以下のURLに対応させる
 * /[種目]/estate/:インターネット番号/:スタッフ番号/list
 * /[種目]/estate/:インターネット番号/list
 * @param url {UrlSegment}
 * @returns
 */
export function matcherEstateBukkenList(url: UrlSegment[]) {
  if (
    url[0]?.path === 'estate' &&
    url[1]?.path?.match(internetNoPattern) &&
    url[2]?.path === 'list' &&
    (!url[3]?.path || checkBukkenList(url, 'list'))
  ) {
    return {
      consumed: url,
      posParams: {
        param: new UrlSegment('list', {}),
        kaiinBukkenType: new UrlSegment('estate', {}),
        internetNo: new UrlSegment(url[1]?.path, {}),
      },
    };
  } else if (
    url[0]?.path === 'estate' &&
    url[1]?.path?.match(internetNoPattern) &&
    url[2]?.path?.match(staffNoPattern) &&
    url[3]?.path === 'list' &&
    (!url[4]?.path || checkBukkenList(url, 'list'))
  ) {
    return {
      consumed: url,
      posParams: {
        param: new UrlSegment('list', {}),
        kaiinBukkenType: new UrlSegment('estate', {}),
        internetNo: new UrlSegment(url[1]?.path, {}),
        staffNo: new UrlSegment(url[2]?.path, {}),
      },
    };
  }
  return null;
}

/**
 * リゾート物件一覧 matcher
 * 以下のURLに対応させる
 * /resort/estate/:インターネット番号/:スタッフ番号/list
 * /resort/estate/:インターネット番号/list
 * @param url {UrlSegment}
 * @returns
 */
export function matcherResortList(url: UrlSegment[]) {
  if (
    url[0]?.path === 'estate' &&
    url[1]?.path?.match(internetNoPattern) &&
    url[2]?.path === 'list' &&
    (!url[3]?.path || checkBukkenList(url, 'list'))
  ) {
    return {
      consumed: url,
      posParams: {
        param: new UrlSegment('list', {}),
        kaiinBukkenType: new UrlSegment('resort', {}),
        internetNo: new UrlSegment(url[1]?.path, {}),
      },
    };
  } else if (
    url[0]?.path === 'estate' &&
    url[1]?.path?.match(internetNoPattern) &&
    url[2]?.path?.match(staffNoPattern) &&
    url[3]?.path === 'list' &&
    (!url[4]?.path || checkBukkenList(url, 'list'))
  ) {
    return {
      consumed: url,
      posParams: {
        param: new UrlSegment('list', {}),
        kaiinBukkenType: new UrlSegment('resort', {}),
        internetNo: new UrlSegment(url[1]?.path, {}),
        staffNo: new UrlSegment(url[2]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherPostStation(url: UrlSegment[]) {
  if (url[0]?.path.match('line') && url[1]?.path.match('station') && !url[2]) {
    return {
      consumed: url,
      posParams: {
        line: new UrlSegment(null, {}),
        isPost: new UrlSegment('true', {}),
        featureRoman: new UrlSegment(null, {}),
      },
    };
  }
  return null;
}

export function matcherLine(url: UrlSegment[]) {
  if (url[0]?.path.match(/-line/) && !url[1]) {
    return {
      consumed: url,
      posParams: {
        line: new UrlSegment(url[0]?.path, {}),
        isPost: new UrlSegment('false', {}),
        featureRoman: new UrlSegment(null, {}),
      },
    };
  }
  return null;
}

export function matcherPostFeatureStation(url: UrlSegment[]) {
  if (
    url[0]?.path.match('theme') &&
    url[3]?.path.match('line') &&
    url[4]?.path.match('station') &&
    !url[5]
  ) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[2]?.path, {}),
        line: new UrlSegment(null, {}),
        isPost: new UrlSegment('true', {}),
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherFeatureLine(url: UrlSegment[]) {
  if (url[0]?.path.match('theme') && url[3]?.path.match(/-line/) && !url[4]) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[2]?.path, {}),
        line: new UrlSegment(url[3]?.path, {}),
        isPost: new UrlSegment('false', {}),
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherFeatureTown(url: UrlSegment[]) {
  if (
    url[0]?.path === 'theme' &&
    url[3]?.path.match(/-city/) &&
    url[4]?.path === 'choson' &&
    !url[5]
  ) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[2]?.path, {}),
        city: new UrlSegment(url[3]?.path, {}),
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherEstateDetail(url: UrlSegment[]) {
  const match = url[0]?.path.match(
    /^(mrgs|mrgk|ahsp|ahsd|ahst|ahch|ahto|ahka|ahcb|ahki|ahks|ahtb|msk|ahkh|ahho|ahcs)(2)?$/
  );
  if (match && url[1]?.path.match(/.html/)) {
    return {
      consumed: url,
      posParams: {
        kaiinType: new UrlSegment(match[1], {}),
        kaiinName: new UrlSegment(url[1]?.path?.slice(0, -5), {}), // 末尾の".html"を削除
        isProofreadingUrl: new UrlSegment(match[2] ? '1' : '0', {}),
      },
    };
  }
  return null;
}

/**
 * ネットワーク店一覧 matcher
 *
 * /netlist/estate/{他店舗コード}/
 * /netlist/estate/{他店舗コード}/page{ページ数}
 * @param url
 * @returns
 */
export function matcherEstateNetworkList(url: UrlSegment[]) {
  if (
    url[0]?.path === 'netlist' &&
    url[1]?.path === 'estate' &&
    url[2]?.path.match(/^([0-9]{3})$/) &&
    (!url[3]?.path || url[3]?.path.match(/^page[1-9][0-9]?/))
  ) {
    return {
      consumed: url,
      posParams: {
        tatenpo: new UrlSegment(url[2]?.path, {}),
        pageNo: new UrlSegment(url[3]?.path?.split('page')?.[1], {}),
      },
    };
  }
  return null;
}

/**
 * 売却事例一覧 matcher
 * /buy/jirei/{インターネット番号}_{ページ数}/
 */
export function matcherSaleExampleList(url: UrlSegment[]) {
  if (
    url[0]?.path === 'buy' &&
    url[1]?.path === 'jirei' &&
    url[2]?.path.match(/^[0-9]{6}_[1-9][0-9]?/)
  ) {
    return {
      consumed: url,
      posParams: {
        kaiLinkno: new UrlSegment(url[2]?.path?.split('_')?.[0], {}),
        pageNo: new UrlSegment(url[2]?.path?.split('_')?.[1], {}),
      },
    };
  }
  return null;
}

export function matcherBycDetail(url: UrlSegment[]) {
  if (
    url[0]?.path === 'buy' &&
    url[1]?.path.match(
      /mrgs|mrgk|ahsp|ahsd|ahst|ahch|ahto|ahka|ahcb|ahki|ahks|ahtb|msk|ahkh|ahho|ahcs/
    ) &&
    url[2]?.path.match(/.html/)
  ) {
    return {
      consumed: url,
      posParams: {
        kaiinType: new UrlSegment(url[1]?.path, {}),
        kaiinName: new UrlSegment(url[2]?.path?.slice(0, -5), {}), // 末尾の".html"を削除
      },
    };
  }
  return null;
}
export function matcherEstateStaffDetail(url: UrlSegment[]) {
  if (url[0]?.path.length === 6 && url[1]?.path.length === 10) {
    return {
      consumed: url,
      posParams: {
        kaiLinkNo: new UrlSegment(url[0]?.path, {}),
        recNo: new UrlSegment(url[1]?.path, {}),
      },
    };
  }

  return null;
}

export function matcherRentBusinessBukkenList(url: UrlSegment[]) {
  if (url[0]?.path === 'theme') {
    return null;
  }
  if (url[0]?.path === 'commute_time' && checkBukkenList(url)) {
    return {
      consumed: url,
      posParams: {
        param: new UrlSegment('commute_time', {}),
        param2: new UrlSegment('list', {}),
      },
    };
  } else if (checkBukkenList(url)) {
    return {
      consumed: url,
      posParams: {
        param: new UrlSegment(url[0]?.path, {}),
        param2: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

export function matcherBaseList(url: UrlSegment[]) {
  if (checkBukkenList(url)) {
    return {
      consumed: url,
    };
  }
  return null;
}

export function matcherTop(url: UrlSegment[]) {
  if (!url?.length) {
    return {
      consumed: url,
    };
  }
  return null;
}

export function matcherPostFeatureLine(url: UrlSegment[]) {
  if (
    url[0]?.path.match('theme') &&
    url[3]?.path.match('line') &&
    url[4]?.path.match('station') &&
    !url[5]
  ) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[0]?.path, {}),
        line: new UrlSegment(null, {}),
        isPost: new UrlSegment('true', {}),
        featureRoman: new UrlSegment(null, {}),
      },
    };
  }
  return null;
}

export function matcherFeatureBukkenList(url: UrlSegment[]) {
  if (url[0]?.path.match('theme') && checkBukkenList(url)) {
    return {
      consumed: url,
      posParams: {
        prefNm: new UrlSegment(url[2]?.path, {}),
        param: new UrlSegment(url[3]?.path, {}),
        param2: new UrlSegment(url[4]?.path, {}),
        featureRoman: new UrlSegment(url[1]?.path, {}),
      },
    };
  }
  return null;
}

/**
 * @param list リスト
 * @param pathKeys 対象のデータにアクセスするキー
 * @param posKey pathkey で取得したデータからでデータを取得するさいのキー
 * @param propName プロパティ名
 * @param partial 部分マッチの有無
 * @param suffix 接尾辞 -gy など
 * @returns UrlSegment[] => {}
 */
export const listMatcher =
  <T>(
    list: T[],
    pathKeys: (keyof T)[],
    posKey: keyof T,
    propName = 'propNm',
    partial = true,
    suffix = ''
  ) =>
  (url: UrlSegment[]) => {
    if (url[0]?.path?.endsWith(suffix) && (partial || !url[1])) {
      const item = list.find((obj) =>
        at(obj, pathKeys).includes(
          suffix ? url[0].path.slice(0, -suffix.length) : url[0].path
        )
      );
      if (item) {
        return {
          matcher: listMatcher,
          consumed: url,
          posParams: {
            [propName]: new UrlSegment(item[posKey] as unknown as string, {}),
            [propName + '-path']: new UrlSegment(
              url[0].path as unknown as string,
              {}
            ),
          },
        };
      }
    }
    return null;
  };

export const matcherJobConditions = (
  list: { code: string; romaji: string }[],
  propName = 'propNm',
  partial = true,
  suffix = ''
) => listMatcher(list, ['code', 'romaji'], 'code', propName, partial, suffix);
export const matcherJob = (
  list: { code: string; romaji: string }[],
  partial = true
) => matcherJobConditions(list, 'industryNm', partial, '-gy');
export const matcherConditions = (
  list: { code: string; romaji: string }[],
  partial = true
) => matcherJobConditions(list, 'conditionNm', partial, '-kd');

export const matcherHankagai = (
  list: { areaName: string; areaRoma: string; lat: number; lon: number }[],
  propName = 'propNm',
  partial = true
) =>
  combineMatchers(
    nameMatcher('hankagai'),
    listMatcher(list, ['areaRoma'], 'areaRoma', propName, partial)
  )(false);

export const matcherPrefecture = (
  prefectures: { prefRomaji: string }[],
  partial = true
) => listMatcher(prefectures, ['prefRomaji'], 'prefRomaji', 'prefNm', partial);

export const nameMatcher =
  (
    name: string | RegExp | (string | RegExp)[],
    partial = true,
    posName = 'path'
  ) =>
  (url: UrlSegment[]) => {
    name = Array.isArray(name) ? name : [name];
    if (
      name.every((name, idx) =>
        typeof name === 'string'
          ? url[idx]?.path === name
          : url[idx]?.path.match(name)
      ) &&
      (partial || !url[name.length])
    ) {
      return {
        matcher: name.length,
        consumed: url,
        posParams: {
          [posName]: new UrlSegment(url[name.length - 1]?.path, {}),
        },
      };
    }
  };

export const optionalNameMatcher =
  (name: string | RegExp, partial = true, posName = 'path') =>
  (url: UrlSegment[]) => {
    if (
      !url[0]?.path ||
      ((typeof name === 'string'
        ? url[0]?.path === name
        : url[0]?.path.match(name)) &&
        (partial || !url[1]))
    ) {
      return {
        matcher: nameMatcher,
        consumed: url,
        posParams: {
          [posName]: new UrlSegment(url[0]?.path, {}),
        },
      };
    }
  };
export const bukkenDetailMatcher = (partial = true) =>
  nameMatcher(/^\d{8,11}$/, partial, 'bukkenCd');
export const matcherFeature = (partial = true) =>
  nameMatcher(['theme', /.*/], partial, 'featureRoman');
const basicMatchers = (prefectures, industries, conditions, hankagaiList) => ({
  matcherPrefecture: matcherPrefecture(prefectures),
  matcherJob: matcherJob(industries),
  matcherConditions: matcherConditions(conditions),
  matcherHankagai: matcherHankagai(hankagaiList, 'hankagai'),
  matcherFeature,
  partialMatcher: (...matchers: UrlMatcher[]) =>
    combineMatchers(
      composeMatchers(matcherJob(industries), matcherConditions(conditions)),
      matcherPrefecture(prefectures),
      ...matchers
    )(),
  partialWithFeatureMatcher:
    (allowCurrent = true) =>
    (...matchers: UrlMatcher[]) =>
      combineMatchers(
        composeMatchers(
          matcherFeature(),
          matcherJob(industries),
          matcherConditions(conditions)
        ),
        matcherPrefecture(prefectures),
        ...(allowCurrent ? [nameMatcher('current', true, 'current')] : []),
        ...matchers
      )(),
});

/**
 * @param prefectures 都道府県情報のリスト
 * @param industries 業種情報のリスト（貸店舗）
 * @param conditions こだわり条件のリスト（貸店舗）
 * @param hankagaiList 繁華街情報のリスト（貸店舗）
 * @returns ReturnType<typeof basicMatchers> => {}
 */
export const matchers = (prefectures, industries, conditions, hankagaiList) =>
  /**
   * @param ReturnType<typeof basicMatchers> 基本的なマッチャー（都道府県マッチャー、コンディションマッチャーなど）
   */
  ((baseMatchers: ReturnType<typeof basicMatchers>) => ({
    ...baseMatchers,
    matcherNewList: combineMatchers(
      nameMatcher('newmail', true),
      nameMatcher('list', true),
      nameMatcher(/_match_(new|all)/, true, 'ticketNo'),
      optionalNameMatcher(/^page[1-9][0-9]?/, false)
    )(),
    matcherFeatureBukkenList,
    matcherPostFeatureLine,
    matcherPrefectureTop: combineMatchers(
      composeMatchers(baseMatchers.matcherJob, baseMatchers.matcherConditions),
      matcherPrefecture(prefectures, false)
    )(),
    matcherTop,
    matcherRentBusinessBukkenDetail: bukkenDetailMatcher(),
    matcherBycDetail: baseMatchers.partialMatcher(matcherBycDetail),
    matcherEstateDetail: baseMatchers.partialMatcher(matcherEstateDetail),
    matcherEstateNetworkList: baseMatchers.partialMatcher(
      matcherEstateNetworkList
    ),
    matcherEstateAreaMap: combineMatchers(
      nameMatcher(/^([0-9]{6})$/, true, 'kaiinLinkNo'),
      nameMatcher('map')
    )(false),
    matcherEstateStaffDetail: baseMatchers.partialMatcher(
      matcherEstateStaffDetail
    ),
    matcherBukkenDetailPrint: combineMatchers(
      bukkenDetailMatcher(true),
      nameMatcher('print')
    )(false),

    matcherRentBusinessBukkenList: composeMatchers(
      combineMatchers(baseMatchers.matcherHankagai, matcherBaseList)(false),
      baseMatchers.partialMatcher(matcherRentBusinessBukkenList)
    ),
    // リゾート物件一覧
    matcherResortBukkenList: baseMatchers.partialMatcher(matcherResortList),

    matcherEstateBukkenList: baseMatchers.partialMatcher(
      matcherEstateBukkenList
    ),

    matcherSaleExampleList: baseMatchers.partialMatcher(matcherSaleExampleList),
    matcherFeatureTown,
    matcherTown: baseMatchers.partialMatcher(
      nameMatcher(/-city/, true, 'city'),
      nameMatcher('choson')
    ),
    matcherFeatureLine,
    matcherPostFeatureStation,
    matcherLine: baseMatchers.partialMatcher(matcherLine),
    matcherPostStation: baseMatchers.partialMatcher(matcherPostStation),
    matcherMapList: baseMatchers.partialMatcher(matcherMapList),
    matcherFeatureLocation,
    matcherFeatureCity,
    matcherFeatureStation,
    matcherLocation: baseMatchers.partialMatcher(
      nameMatcher(/-locate/, false, 'locate')
    ),
    matcherMap: baseMatchers.partialMatcher(matcherMap),
    matcherJoken: baseMatchers.partialWithFeatureMatcher()(
      nameMatcher('joken', false)
    ),
    matcherCityTop: baseMatchers.partialMatcher(
      nameMatcher(/-city/, false, 'city')
    ),
    matcherStationTop: baseMatchers.partialMatcher(
      nameMatcher(/-st/, false, 'st')
    ),
    matcherRentBukkenDetail: combineMatchers(
      bukkenDetailMatcher(true),
      nameMatcher('map')
    )(false),
    matcherFreeWordMap,
    matcherJobPage: matcherJob(industries, false),
    matcherConditionsPage: matcherConditions(conditions, false),
    matcherFeaturePrefectureTop,
    matcherFeatureTop,
    matcherThemeTop: baseMatchers.partialMatcher(nameMatcher('theme', false)),
    matcherCitySelect: baseMatchers.partialMatcher(nameMatcher('city', false)),
    matcherLineSelect: baseMatchers.partialMatcher(nameMatcher('line', false)),
    matcherMapSelect: baseMatchers.partialMatcher(nameMatcher('map', false)),
    matcherRosenMapSelect: baseMatchers.partialMatcher(
      nameMatcher('rosen_map', false)
    ),
  }))(basicMatchers(prefectures, industries, conditions, hankagaiList));

const matcherLength = {
  [listMatcher.name]: 1,
  [nameMatcher.name]: 1,
};

export const combineMatchers =
  (...matchers: UrlMatcher[]) =>
  (partial = true) =>
  (url: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
    let currentUrl = url;
    let posParams = {};
    let matched = false;
    matchers.some((matcher, idx) => {
      const match = matcher(currentUrl, group, route);
      if (!partial && !match) {
        return true;
      } else if (match) {
        currentUrl = currentUrl.slice(
          matcherLength[match['matcher']?.name] || match['matcher'] || 0
        );
        posParams = { ...posParams, ...match.posParams };
        matched = idx === matchers.length - 1;
      }
    });
    return matched ? { consumed: url, posParams } : null;
  };

export const composeMatchers =
  (...matchers: UrlMatcher[]) =>
  (url: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
    for (const matcher of matchers) {
      const match = matcher(url, group, route);
      if (match) {
        return match;
      }
    }
    return null;
  };

export function noMatch(url: UrlSegment[]) {
  return !Object.values(matchers).some((matcher) => matcher(url))
    ? { consumed: url }
    : null;
}

export function withTrailingSlash(url: string): string {
  const splitOn = url.indexOf('?') > -1 ? '?' : '#';
  const pathArr = url.split(splitOn);

  if (!pathArr[0].endsWith('/')) {
    const fileName = pathArr[0].substring(pathArr[0].lastIndexOf('/') + 1);
    if (fileName.indexOf('.') === -1) {
      pathArr[0] += '/';
    }
  }
  return pathArr.join(splitOn);
}

const checkBukkenList = (url: UrlSegment[], name = 'list'): boolean => {
  const index = url.findIndex((x) => x.path === name);
  return (
    index !== -1 &&
    (!url[index + 1] ||
      (url[index + 1]?.path.match(/^page[1-9][0-9]?/) && !url[index + 2]))
  );
};

/**
 * URLの最後に/をつける
 * @see https://github.com/angular/angular/issues/16051
 */
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  serialize(tree: UrlTree): string {
    return withTrailingSlash(super.serialize(tree));
  }
}
