import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpUrlEncodingCodec,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig, HttpOptions, APP_ENV, EnvModel } from '../models';
import {
  customEncoding,
  AbstractApiService,
  ApiParamsType,
  ApiType,
} from '../apis';
import { isPlatformServer } from '@angular/common';
import { map } from 'rxjs/operators';

/**
 * ＋の記号をエンコーディングさせないためのパラメータコーデック
 * encode時はcustomEncoding()を使用する
 */
export class CustomCodec extends HttpUrlEncodingCodec {
  encodeKey(k: string): string {
    return customEncoding(k);
  }

  encodeValue(v: string): string {
    return customEncoding(v);
  }

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string) {
    return decodeURIComponent(v);
  }
}

/**
 * studentApiのAPIをコールする為のサービス。
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService extends AbstractApiService {
  /**
   * コンストラクタ
   *
   * @param platformId Server or Client判定をするためのプラットフォームID
   * @param httpClient HttpClientをインジェクションする
   * @param apiConfig API用の環境設定
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) platformId: Object,
    private httpClient: HttpClient,
    apiConfig: ApiConfig,
    @Inject(APP_ENV) private appEnv: EnvModel
  ) {
    super({
      website: apiConfig.siteDomain,
      bff: `${
        isPlatformServer(platformId)
          ? 'http://'
          : apiConfig.isHTTPS.toLowerCase() === 'true'
          ? 'https://'
          : 'http://'
      }${
        isPlatformServer(platformId)
          ? apiConfig.ssrBffDomain
          : apiConfig.csrBffDomain
      }`,
    });
  }

  protected apiGet(
    url: string,
    apiParams: ApiParamsType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    params: {}
  ): Observable<string> {
    const options = {
      // ＋をエスケープさせるために独自コーデックを使用する
      // (参考: https://stackoverflow.com/questions/49438737/how-to-escape-angular-httpparams )
      params: new HttpParams({
        fromObject: {
          ...params,
          AT_TIME: Date.now().toString(),
        },
        encoder: new CustomCodec(),
      }),
      responseType: 'text',
      observe: 'response',
      withCredentials: !this.appEnv.isLocal,
    } as HttpOptions;
    return this.httpClient[
      apiParams.type === ApiType.websiteHeader ? 'head' : 'get'
    ](url, options).pipe(
      map((response) =>
        apiParams.type === ApiType.websiteHeader
          ? response.headers.get(apiParams.options.headerName)
          : response.body
      )
    );
  }
  protected apiPost(
    url: string,
    apiParams: ApiParamsType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    params: {}
  ): Observable<string> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      responseType: 'text' as 'json',
      observe: 'response' as const,
      withCredentials: !this.appEnv.isLocal,
    };
    return this.httpClient
      .post<string>(url, params, options)
      .pipe(
        map((response) =>
          apiParams.type === ApiType.websiteHeader
            ? response.headers.get(apiParams.options.headerName)
            : response.body
        )
      );
  }

  protected apiPostFormData(
    url: string,
    apiParams: ApiParamsType,
    formData: FormData
  ): Observable<string> {
    const options = {
      responseType: 'text' as 'json',
      observe: 'response' as const,
      withCredentials: !this.appEnv.isLocal,
    };
    return this.httpClient
      .post<string>(url, formData, options)
      .pipe(
        map((response) =>
          apiParams.type === ApiType.websiteHeader
            ? response.headers.get(apiParams.options.headerName)
            : response.body
        )
      );
  }
}
