export function utilsArray(): string {
  return 'utils-array';
}

/**
 * @param array 対象配列
 * @example
 *  reduceNestedArray([['a', 'b'], ['c', 'd']]) => ['a', 'b', 'c', 'd']
 *  reduceNestedArray(null) => []
 */
export function reduceNestedArray<T>(array: T[][]): T[] {
  return (array || [])
    .filter((a) => a !== null && a !== undefined)
    .reduce((prev, curr) => [...prev, ...curr], [] as T[]);
}

/**
 * @param array 対象配列
 * @param key 対象項目名
 * @example
 *  flatten([{a: 'a1', b: 'b1', sub: [{a: 'a2', b: 'b2'}, {a: 'a3', b: 'b3'}] }], 'sub') => [{a: 'a1', b: 'b1'}, {a: 'a2', b: 'b2'}, {a: 'a3', b: 'b3'}]
 *  flatten(null) => []
 */
export function flatten<T>(
  array: T[],
  key: keyof T,
  ignoreSub: (_: T) => boolean = () => false
): T[] {
  return (
    array?.reduce(
      (prev, curr) => [
        ...prev,
        curr,
        ...(((ignoreSub(curr) ? [] : (curr[key] as unknown)) as T[]) || []),
      ],
      [] as T[]
    ) || []
  );
}

/**
 * @param array 対象配列
 * @example
 *  filterDistinct(['a', 'b', 'a', 'd']) => ['a', 'b', 'd']
 *  filterDistinct(
 *      [{code: 'a', name:'name1'}, {code: 'b', name:'name2'}, {code: 'a', name:'name1'}, {code: 'd', name:'name3'}],
 *      val => val.code) => [{code: 'a', name:'name1'}, {code: 'b', name:'name2'}, {code: 'd', name:'name3'}]
 *  filterDistinct(null) => []
 */
export function filterDistinct<T>(
  array: T[],
  idTransform?: (value: T) => unknown
): T[] {
  return (array || []).filter(
    (value, idx, arr) =>
      arr.findIndex(
        (val) =>
          (idTransform ? idTransform(val) : val) ===
          (idTransform ? idTransform(value) : value)
      ) === idx
  );
}

/**
 * @param array 対象配列
 * @param maxSize 保存される上限数
 * @param ellipsis 三点リーダー文言（ディフォルト：...）
 * @example
 *  cutWithEllipsis(['a', 'b', 'c', 'd'], 2) => ['a', 'b', '...']
 *  cutWithEllipsis(['a', 'b', 'c', 'd'], 4) => ['a', 'b', 'c', 'd']
 *  cutWithEllipsis(['a', 'b', 'c', 'd'], 0) => ['a', 'b', 'c', 'd']
 *  cutWithEllipsis(null, 4) => []
 */
export function cutWithEllipsis(
  array: string[],
  maxSize: number,
  ellipsis = '...'
): string[] {
  return [...(array || [])].reduce((list, curr, idx, arr) => {
    if (!maxSize || idx < maxSize) {
      return [...list, curr];
    } else if (idx === maxSize) {
      return [...list, ellipsis];
    } else {
      arr.splice(1);
      return list;
    }
  }, [] as string[]);
}

/**
 * 比較先に存在しない文字列を配列を返す。
 * @param array この配列を比較先と確認する。
 * @param comparisonArray 比較先
 */
export function noExistSearch(array: string[], comparisonArray: string[]) {
  return array.filter(
    (item) => !comparisonArray.find((comparison) => item === comparison)
  );
}
