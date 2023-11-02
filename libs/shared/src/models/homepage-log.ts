/** アクセス元区分 */
export enum AccessKbn {
  /** 会員詳細 */
  kaiinDetail = '1',
  /** 物件詳細*/
  bukkenDetail = '2',
  /** 売却査定詳細 */
  byc = '6',
}

/** ホームページのログのリクエスト */
export interface HomepageLogRequest {
  /** 会員番号 */
  kaiinLinkNo: string;
  /** サイトコード */
  siteCd: string;
  /** ユーザエージェント */
  frontUa?: string;
  /** アクセス元区分 (1: 会員詳細, 2: 物件詳細, 6: 売却査定詳細) */
  accessKbn: AccessKbn;
  /** 会員広告区分 (NULL: コマ広告以外, 1: 不動産会社一覧コマ広告, 2: 47サイトTOPコマ広告) */
  advertiseKbn?: string;
  /** 物件番号: 物件詳細からの遷移時に設定 */
  bukkenNo?: string;
}
