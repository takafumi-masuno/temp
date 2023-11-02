/**
 * 半角文字から全角に変換
 * @param val: string | number
 * @returns string
 */
export function convertFullSizeToHalfSize(val: string | number): string {
  if (typeof val === 'number') {
    val = String(val);
  }

  return val.replace(/[A-Za-z0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}
