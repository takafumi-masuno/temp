import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {
  createPostParam,
  AbstractApiService,
  ApiParamsType,
} from '@shared/apis';
import { AtLoggerService } from '@shared/log';

@Injectable()
export class ApiService extends AbstractApiService {
  constructor(
    private httpService: HttpService,
    private logger: AtLoggerService,
    @Inject('msConfig')
    msConfig: {
      microservicesHost: string;
      microservicesSearchHost: string;
      microservicesDetailHost: string;
      microservicesBackendHost: string;
    }
  ) {
    super({
      msBase: msConfig.microservicesHost,
      msBackend: msConfig.microservicesBackendHost,
      msSearch: msConfig.microservicesSearchHost,
      msDetail: msConfig.microservicesDetailHost,
    });
  }
  protected apiGet(
    url: string,
    apiParams: ApiParamsType,
    params: {}
  ): Observable<string> {
    // TODO: proxy: falseに関しては要調査
    url = `${url}?${createPostParam(params)}`;
    return this.httpService
      .get(url, {
        proxy: false,
      })
      .pipe(
        tap(() => this.logger.log('API実行: ' + url)),
        map((x) => x.data),
        catchError((x) => {
          if (x?.response?.status !== 404) {
            this.logger.error(
              `API実行エラー: STATUS:${x?.response?.status} - GET - URL:${url}`,
              x.stack
            );
          }
          return (x?.response?.status === 404 && apiParams.rethrowNotFound) ||
            apiParams.rethrow
            ? throwError(
                new HttpException(
                  '例外処理が発生しました。',
                  x?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
                )
              )
            : of(apiParams.defaultValue);
        })
      );
  }
  protected apiPost(
    url: string,
    apiParams: ApiParamsType,
    params: {}
  ): Observable<string> {
    this.logger.log('API実行: ' + url);
    // TODO: proxy: falseに関しては要調査
    return this.httpService
      .post(url, params, {
        proxy: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map((x) => x.data),
        catchError((x) => {
          if (x?.response?.status !== 404) {
            this.logger.error(
              `API実行エラー: STATUS:${x?.response?.status} - POST - URL:${url}`,
              x.stack
            );
          }
          return apiParams.rethrow
            ? throwError(
                new HttpException(
                  '例外処理が発生しました。',
                  HttpStatus.INTERNAL_SERVER_ERROR
                )
              )
            : of(apiParams.defaultValue);
        })
      );
  }

  protected apiPostFormData(
    url: string,
    apiParams: ApiParamsType,
    formData: FormData
  ): Observable<string> {
    this.logger.log('API実行: ' + url);

    // TODO: proxy: falseに関しては要調査
    return this.httpService
      .post(url, formData, {
        proxy: false,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          if (error?.response?.status !== 404) {
            this.logger.error(
              `API実行エラー: STATUS:${error?.response?.status} - POST - URL:${url}`,
              error.stack
            );
          }
          return apiParams.rethrow
            ? throwError(
                new HttpException(
                  '例外処理が発生しました。',
                  HttpStatus.INTERNAL_SERVER_ERROR
                )
              )
            : of(apiParams.defaultValue);
        })
      );
  }
}
