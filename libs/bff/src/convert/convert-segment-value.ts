// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  SegmentNameType,
  SegmentValueMst,
} from '@front/shared/constants/index';

/**
 * 区分値マスタのコード値に紐づくコード名称を取得する
 * @param tgtSegmentNm 取得対象の区分値マスタのコード区分名称
 * @param tgtCodeValue コード名称を取得したいコード値
 * @returns コード名称
 */
export function convertToCodeNm(
  tgtSegmentNm: SegmentNameType,
  tgtCodeValue: number
) {
  try {
    const tgtSegement = SegmentValueMst.SegmentValue[tgtSegmentNm];
    const tgtIndex = tgtSegement.findIndex(
      ({ value }) => value === tgtCodeValue
    );
    if (tgtIndex === -1) {
      throw new Error(
        `コード名称を取得できませんでした。区分値マスタにコード値が${tgtCodeValue}のレコードが存在するか確認してください。`
      );
    } else {
      return tgtSegement[tgtIndex].nm;
    }
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

/**
 * 区分値マスタのコード名称に紐づくコード値を取得する
 * @param tgtSegmentNm 取得対象の区分値マスタのコード区分名称
 * @param tgtCodeNm コード値を取得したいコード名称
 * @returns コード値
 */
export function convertToCodeValue(
  tgtSegmentNm: SegmentNameType,
  tgtCodeNm: string
) {
  try {
    const tgtSegement = SegmentValueMst.SegmentValue[tgtSegmentNm];
    const tgtIndex = tgtSegement.findIndex(({ nm }) => nm === tgtCodeNm);
    if (tgtIndex === -1) {
      throw new Error(
        `コード値を取得できませんでした。区分値マスタにコード名称が${tgtCodeNm}のレコードが存在するか確認してください。`
      );
    } else {
      return tgtSegement[tgtIndex].value;
    }
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

/**
 * 区分値マスタのコード区分一覧を取得する
 * @param tgtSegmentNm 取得対象の区分値マスタのコード区分名称
 * @returns コード区分一覧
 */
export function getSegmentList(tgtSegmentNm: SegmentNameType) {
  try {
    return SegmentValueMst.SegmentValue[tgtSegmentNm];
  } catch (e) {
    console.error(`${tgtSegmentNm}のコード区分値一覧を取得できませんでした。`);
    return null;
  }
}
