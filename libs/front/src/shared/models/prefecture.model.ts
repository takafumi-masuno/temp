/**
 * 都道府県
 */
export interface IPrefecture {
  /** 都道府県コード */
  prefCd: string;

  /** 都道府県名 */
  prefNm: string;

  /** 都道府県名のから県、都、府の文字を抜いたもの */
  name: string;

  /** 都道府県名(ローマ字) */
  prefRomaji: string;

  /** エリアコード */
  areaCd: string;
}

/**
 * エリア
 */
export interface IArea {
  /**
   * エリア名(北海道・東北、首都圏、信越・北陸、東海、近畿、中国・四国、九州・沖縄)
   */
  areaNm: string;

  /**
   * エリアのローマ字
   */
  areaRomaji: string;

  /**
   * 当該エリアの都道府県リスト
   */
  prefData: IPrefecture[];
}
