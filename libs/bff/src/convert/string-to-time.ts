export function stringToTime(time: string): string {
  const hour = time.slice(0, 2);
  const minute = time.slice(2);
  return hour + ':' + minute;
}

/**
 * 営業時間のコロン区切りの共通部品
 * 文字列の「営業開始時間」と「営業終了時間」に「:」を入れて「～」でつなげる
 * @params string, string
 * @return string
 */
export function getEigyoTime(
  eigyoTimeFrom: string,
  eigyoTimeTo: string
): string {
  if (!eigyoTimeFrom || !eigyoTimeTo) {
    return null;
  }

  const transform = (time: string) =>
    time
      .match(/.{1,2}/g)
      .join(':')
      .replace(/^0/, '');
  return `${transform(eigyoTimeFrom)}～${transform(eigyoTimeTo)}`;
}
/**
 * 営業時間のコロン区切りの共通部品(0トリム無し)
 * @param eigyoTimeFrom
 * @param eigyoTimeTo
 * @returns string
 */
export function getEigyoTimeNoTrim(
  eigyoTimeFrom: string,
  eigyoTimeTo: string
): string {
  if (!eigyoTimeFrom || !eigyoTimeTo) {
    return '';
  }

  const transform = (time) => time.match(/.{1,2}/g).join(':');
  return `${transform(eigyoTimeFrom)}～${transform(eigyoTimeTo)}`;
}
