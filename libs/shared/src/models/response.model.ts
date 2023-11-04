/**
 * バリデーション込みの基本のレスポンス型
 */
export type BasicValidResponseType<T = null> =
  | SuccessType<T>
  | IError
  | IValidationError;

/**
 * 基本のレスポンス型
 */
export type BasicResponseType<T = null> = SuccessType<T> | IError;

/**
 * 基本のエラーレスポンス型
 */
export type IBasicErrorResponse = IError | IValidationError;

/**
 * 成功時のレスポンスの型
 */
export type SuccessType<T> = T extends null ? ISuccess : ISuccessResponse<T>;

export interface ISuccessResponse<T> {
  message: string;
  body: T;
}

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
export interface IBasicBffResponse<T> {
  code: number;
  message: string;
  body?: T;
}
