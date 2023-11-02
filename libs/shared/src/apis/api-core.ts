/* eslint-disable  */
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {
  createDirectory,
  createPostParam,
  deleteNullParams,
  serializeNestedObjects,
} from './api-util';

export enum ApiType {
  website,
  websiteHeader,
  bff,
  microservice,
}

export enum MicroServiceType {
  // 一覧系のAPIドメイン
  search = 'search',
  // 詳細のAPIドメイン
  detail = 'detail',
  // backend情報
  backend = 'backend',
  // マスタ系のAPIドメイン
  base = 'commondate',
}

export const msVersion: Record<MicroServiceType, string> = {
  [MicroServiceType.search]: 'v1',
  [MicroServiceType.detail]: 'v1',
  [MicroServiceType.backend]: 'v1',
  [MicroServiceType.base]: 'v1',
};

export class ApiParams<T> {
  type: ApiType;
  constructor(
    public options: T,
    public rethrow = true,
    public rethrowNotFound = false,
    public defaultValue = null
  ) {}
}

export class WebSiteParams extends ApiParams<{
  directory: string[];
  omitTrailingSlash?: boolean;
}> {
  readonly type = ApiType.website;
}

export class WebSiteHeaderParams extends ApiParams<{
  directory: string[];
  headerName: string;
}> {
  readonly type = ApiType.websiteHeader;
}

export class BffParams extends ApiParams<{ directory: string[] }> {
  readonly type = ApiType.bff;
}

export class MicroserviceParams extends ApiParams<{
  type: MicroServiceType;
  appName?: string;
  serviceName?: string;
  version?: string;
  path: string[];
}> {
  readonly type = ApiType.microservice;
}

export type ApiParamsType =
  | WebSiteParams
  | WebSiteHeaderParams
  | BffParams
  | MicroserviceParams;

export abstract class AbstractApiService {
  constructor(
    protected hosts: {
      website?: string;
      bff?: string;
      msBase?: string;
      msSearch?: string;
      msDetail?: string;
      msBackend?: string;
    }
  ) {}

  private getHost(params: ApiParamsType): string {
    switch (params.type) {
      case ApiType.website:
      case ApiType.websiteHeader:
        return this.hosts.website;
      case ApiType.bff:
        return this.hosts?.bff;
      case ApiType.microservice:
        switch (params.options.type) {
          case MicroServiceType.backend:
            return this.hosts?.msBackend;
          case MicroServiceType.search:
            return this.hosts?.msSearch;
          case MicroServiceType.detail:
            return this.hosts?.msDetail;
          case MicroServiceType.base:
            return this.hosts?.msBase;
        }
    }
  }

  private createMsPath(params: MicroserviceParams): string[] {
    return [
      params.options.type,
      params.options.version || msVersion[params.options.type],
      params.options.serviceName,
      params.options.appName,
      ...params.options.path,
    ].filter((p) => !!p);
  }

  private checkSupport(params: ApiParamsType): boolean {
    return !!this.getHost(params);
  }

  private getUrl(params: ApiParamsType): string {
    const host = this.getHost(params);
    switch (params.type) {
      case ApiType.website:
        return `${host}${createDirectory(params.options.directory)}${
          params.options.omitTrailingSlash ? '' : '/'
        }`;
      case ApiType.websiteHeader:
        return `${host}${createDirectory(params.options.directory)}`;
      case ApiType.bff:
        return `${host}/csite-bff` + createDirectory(params.options.directory);
      default:
        return `${host}${createDirectory(this.createMsPath(params))}/`;
    }
  }

  getMovieUploadUrl(params: ApiParamsType): string {
    const host = this.getHost(params);
    switch (params.type) {
      case ApiType.website:
        return `${host}${createDirectory(params.options.directory)}${
          params.options.omitTrailingSlash ? '' : '/'
        }`;
      case ApiType.websiteHeader:
        return `${host}${createDirectory(params.options.directory)}`;
      case ApiType.bff:
        return `${host}/csite-bff` + createDirectory(params.options.directory);
      default:
        return `${host}${createDirectory(this.createMsPath(params))}/`;
    }
  }

  getParams<T>(params: ApiParamsType, baseParams: T): T & { SERVICE?: string } {
    return { ...baseParams };
  }

  /**
   * 指定されたレスポンス形式でAPIをGETでリクエストする
   * @param params サービスの引数(ServiceNameは必須)
   * @param httpOptions headersなどのHTTPオプション
   * @param isFacade facadeApiの場合true
   * @returns ObservableなAPIの結果
   */
  private get(
    apiParams: ApiParamsType,
    params: Record<string, unknown>
  ): Observable<string> {
    if (!this.checkSupport(apiParams)) {
      throw { msg: 'Unsupported Backend' };
    }

    return this.apiGet(
      this.getUrl(apiParams),
      apiParams,
      serializeNestedObjects(
        deleteNullParams(this.getParams(apiParams, params))
      )
    ).pipe(share());
  }

  protected abstract apiGet(
    url: string,
    apiParams: ApiParamsType,
    params: unknown
  ): Observable<string>;

  /**
   * 指定のサービスへのPOSTリクエストを行う
   * @param params サービスの引数(ServiceNameは必須)
   * @param httpOptions headersなどのHTTPオプション
   */
  private post(
    apiParams: ApiParamsType,
    params: Record<string, unknown>
  ): Observable<string> {
    return this.apiPost(
      this.getUrl(apiParams),
      apiParams,
      createPostParam(
        serializeNestedObjects(
          deleteNullParams(this.getParams(apiParams, params))
        )
      )
    ).pipe(share());
  }

  /**
   * ファイルを指定のサービスへPOSTリクエストを行う
   * @param apiParams - APIに関するパラメータ
   * @param formData - POSTするファイルのFormData
   * @returns Observable<String> - 処理結果のObservable
   */
  private postFormData(
    apiParams: ApiParamsType,
    formData: FormData
  ): Observable<string> {
    return this.apiPostFormData(
      this.getUrl(apiParams),
      apiParams,
      formData
    ).pipe(share());
  }

  protected abstract apiPost<T>(
    url: string,
    apiParams: ApiParamsType,
    params: {}
  ): Observable<string>;

  protected abstract apiPostFormData<T>(
    url: string,
    apiParams: ApiParamsType,
    formData: FormData
  ): Observable<string>;

  /**
   * JSONレスポンス形式のAPIをGetでリクエストする
   * @param params サービスの引数(SERVICE)
   * @param selector {
   *      successSelector APIレスポンスが成功した時にTのオブジェクトを取得するためのSelector(未指定: defaultJSONSelector) ,
   *      errorSelector APIレスポンスがエラーとなった時にApiErrorを取得するためのSelector(未指定: defaultJSONErrorSelector)
   * }
   * @param httpOptions headersなどのHTTPオプション
   * @param isFacade facadeApiの場合true
   * @returns 指定された型<T>のAPIの結果を返す
   */
  getJSONContent<T>(
    apiParams: ApiParamsType,
    query: any,
    selector: {
      successSelector?: (json: Object) => T;
      errorSelector?: (json: Object) => void;
    } = {}
  ): Observable<T> {
    return this.get(apiParams, query).pipe(
      map((resp: string) => {
        const obj =
          typeof resp === 'object' ? resp : resp === '' ? {} : JSON.parse(resp);
        return this.executeSelector(obj, {
          successSelector: this.getDefaultJsonSelector(apiParams) as (
            json: Object
          ) => T,
          errorSelector: this.getDefaultJsonErrorSelector(apiParams) as (
            json: Object
          ) => void,
          ...selector,
        });
      })
    );
  }

  /**
   * JSONレスポンス形式のAPIをPOSTでリクエストする
   * @param params サービスの引数(SERVICE)
   * @param selector {
   *      successSelector APIレスポンスが成功した時にTのオブジェクトを取得するためのSelector(未指定: defaultJSONSelector) ,
   *      errorSelector APIレスポンスがエラーとなった時にApiErrorを取得するためのSelector(未指定: defaultJSONErrorSelector)
   * }
   * @param httpOptions headersなどのHTTPオプション
   * @returns 指定された型<T>のAPIの結果を返す
   */
  postJSONContent<T>(
    apiParams: ApiParamsType,
    query: {},
    selector: {
      successSelector?: (json: Object) => T;
      errorSelector?: (json: Object) => void;
    } = {}
  ): Observable<T> {
    return this.post(apiParams, query).pipe(
      map((resp) =>
        typeof resp === 'object' ? resp : resp === '' ? {} : JSON.parse(resp)
      ),
      map((resp) => {
        /**
         * TODO: 下記をあとで消す。
         * local では戻り値が返ってこないので固定値でレスポンス変数に代入
         */
        if (apiParams.options['directory'][0] === 'psl') {
          resp =
            '<input type="HIDDEN" name="KENTO_REGIST_SITE" id="KENTO_REGIST_SITE" value="00000"/><input type="HIDDEN" name="KENTO_REGIST_ITEM" id="KENTO_REGIST_ITEM" value="me"/><input type="HIDDEN" name="KENTO_REGIST_KENTO_LIST" id="KENTO_REGIST_KENTO_LIST" value="me20046261"/><input type="HIDDEN" name="KENTO_REGIST_MSG" id="KENTO_REGIST_MSG" value=""/><div id="est_kentoWrapError" class="est_kentoWrapFirst" style="display:none"><p class="est_messe"><strong></strong></p><p class="est_btn"><a class="est_close_link" onclick="Common.closeKentoBoxError();"><img width="59" height="24" class="roll" alt="閉じる" src="/static/20220527-140304232/images/std/estate/est_btn_close02.gif"></a></p></div><!--/mWrap --><div id="est_kentoWrapNormal" class="est_kentoWrapFirst" style="display:none"><p class="est_messe"><strong>「お気に入り」に追加しました</strong></p></div><!--/mWrap --><div class="est_kentoWrapFirst" id="est_kentoWrapFirst" style="display:none"><p class="est_messe"><strong>「お気に入り」に追加しました</strong></p><div class="est_innerWrap"><div class="est_messeBox"><div class="est_wrapFirst"><div class="est_wrapSecond"><p>保存した物件を見る場合は、ページ上部の<br>「お気に入り」からご覧いただけます。</p></div><!--/wrapSecond --></div><!--/ wrapFirst--></div><!--/messeBox --><p class="est_checkText"><input type="checkbox" id="est_kento_subwin_first_check" value="" name=""><label for="est_kento_subwin_first_check">次回以降このメッセージを表示しない</label></p><p class="est_btn"><a class="est_close_link" onclick="Common.closeKentoBox();"><img width="59" height="24" class="roll" alt="閉じる" src="/static/20220527-140304232/images/std/estate/est_btn_close02.gif"></a></p></div><!--/innerWrap --></div>';
        }

        return this.executeSelector(resp, {
          successSelector: this.getDefaultJsonSelector(apiParams) as (
            json: Object
          ) => T,
          errorSelector: this.getDefaultJsonErrorSelector(apiParams) as (
            json: Object
          ) => void,
          ...selector,
        });
      })
    );
  }

  /**
   * APIにファイルをPOSTする
   * @param apiParams - APIに関するパラメータ
   * @param formData - POSTするファイルのFormData
   * @param selector - 成功とエラーのレスポンスを処理するセレクタ関数
   * @returns Observable<T> - 処理結果のObservable
   */
  postFile<T>(
    apiParams: ApiParamsType,
    formData: FormData,
    selector: {
      successSelector?: (json: Object) => T;
      errorSelector?: (json: Object) => void;
    } = {}
  ): Observable<T> {
    return this.postFormData(apiParams, formData).pipe(
      map((resp) =>
        typeof resp === 'object' ? resp : resp === '' ? {} : JSON.parse(resp)
      ),
      map((resp) => {
        return this.executeSelector(resp, {
          successSelector: this.getDefaultJsonSelector(apiParams) as (
            json: Object
          ) => T,
          errorSelector: this.getDefaultJsonErrorSelector(apiParams) as (
            json: Object
          ) => void,
          ...selector,
        });
      })
    );
  }

  /**
   * JSONデータに指定されたセレクターを使ってT型のデータを返す
   * @param data jsonデータ
   * @param selector 異常、成功のセレクターを実行
   */
  private executeSelector<T>(
    data: Object,
    selector: {
      successSelector?: (json: Object) => T;
      errorSelector?: (json: Object) => void;
    }
  ): T {
    selector.errorSelector(data);
    return selector.successSelector(data);
  }

  private getDefaultJsonSelector(params: ApiParamsType) {
    switch (params.type) {
      case ApiType.bff:
        return (json) => json['data'];
      default:
        return (json) => json;
    }
  }

  private getDefaultJsonErrorSelector(params: ApiParamsType) {
    return (json) => {
      ('');
    };
  }
}
