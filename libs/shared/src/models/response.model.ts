/**
 * 基本のレスポンス型
 */
export type IBasicResponse = ISuccess | IError | IValidationError;

/**
 * 基本のエラーレスポンス型
 */
export type IBasicErrorResponse = IError | IValidationError;

/**
 * 成功時のレスポンスの型
 */
export interface ISuccess {
  message: string;
}

/**
 * エラー時のレスポンスの型
 */
export interface IError {
  detail: string;
}

/**
 * バリデーションエラー時のレスポンスの型
 */
export interface IValidationError {
  detail: string[];
}

/**
 * BFFからフロントへの基本のレスポンス型
 */
export interface IBasicBffResponse {
  code: number;
  message: string;
}
