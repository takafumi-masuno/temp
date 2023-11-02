/**
 * 築年数が何年何ヶ月かを割り出すロジック
 * @param year 誕生年
 * @param month 誕生月
 * @return [年: number ,月: number]
 */
export function getBuildAge(year, month): [number, number] {
  try {
    //築年日を Date クラスに変換する
    const birthdayDate = new Date(year, month - 1);

    //Date クラスは不正の値で初期化したとき、初期化に利用した数値と同じ数値にならないので、そこで正しい数値であるかを判定する
    if (
      year != birthdayDate.getFullYear() ||
      month - 1 != birthdayDate.getMonth()
    ) {
      return null;
    }

    //今日の日付けを取得する
    const todayDate = new Date();
    const yearToMonth = 12;

    //築年数を計算する
    let buildAgeYear = todayDate.getFullYear() - birthdayDate.getFullYear();
    const buildAgeMonth =
      todayDate.getMonth() - birthdayDate.getMonth() < 0
        ? yearToMonth + todayDate.getMonth() - birthdayDate.getMonth()
        : todayDate.getMonth() - birthdayDate.getMonth();
    //築年数が当年込みの計算のため、もし今年の誕生月（築年数は日まで想定していないため）を迎えていない場合は1歳年を減らす
    const currentYearDate = new Date(
      todayDate.getFullYear(),
      birthdayDate.getMonth(),
      birthdayDate.getDate()
    );
    if (currentYearDate > todayDate) {
      buildAgeYear = buildAgeYear - 1;
    }
    return [buildAgeYear, buildAgeMonth];
  } catch (e) {
    //TODO: エラー時入れる値を考える。
    return [0, 0];
  }
}

/**
 * 坪単価の計算
 */
export function getUnitPrice(kakaku: number, tsubo: string) {
  return +kakaku / +tsubo || 0;
}

export function getDecimalPointLength(nb: number | string) {
  return String(nb).split('.')[1]?.length || 0;
}

/**
 * 任意のカンマ区切り表示を行う
 * @param {number|string} num 数字
 * @param {number} decimals 強制的に表示したい少数の位
 * @param {boolean} isFloor 切り捨ての場合 true
 * @param {boolean} optionalDecimal 固定な少数数が任意の場合 true
 * @returns カンマ区切り数字
 */
export function formatDecimal(
  num: number | string,
  decimals: number,
  isFloor = false,
  optionalDecimal: boolean | ((no) => boolean) = false
) {
  const optional = (
    optionalDecimal?.constructor === Function
      ? optionalDecimal
      : () => !!optionalDecimal
  ) as (no) => boolean;
  const no = isFloor
    ? Math.floor(calcMultiplication(+num, Math.pow(10, decimals))) /
      Math.pow(10, decimals)
    : +num;
  return no.toLocaleString(undefined, {
    minimumFractionDigits: optional(no) ? 0 : decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * 掛け算による 桁落ち、桁上がりを防ぐ
 * ①両方の変数の小数点をのぞき、整数とする
 * ②量変数の少数の位置をたしあわせる 変数A
 * ③ ①の整数を掛け合わせた結果/10の変数A乗
 **/
export function calcMultiplication(value1: number, value2: number) {
  const integerValue1 = +(value1 + '').replace('.', '');
  const integerValue2 = +(value2 + '').replace('.', '');
  const decimalLength = getDecimalLength(value1) + getDecimalLength(value2);
  const result = (integerValue1 * integerValue2) / Math.pow(10, decimalLength);
  return result;
}

// dot 位置を返す
function getDecimalLength(value: number) {
  const list = (value + '').split('.');
  let result = 0;
  if (list[1] !== undefined && list[1].length > 0) {
    result = list[1].length;
  }
  return result;
}
