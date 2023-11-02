import { Inject, Injectable } from '@angular/core';
import { APP_ENV, EnvModel } from '@shared/models';

/**
 * Environment#assetsPathの値をurlの先頭に付け加えます
 */
@Injectable({
  providedIn: 'root',
})
export class CfdAssetsService {
  constructor(@Inject(APP_ENV) private appEnv: EnvModel) {}

  transform(url: string, absolutePath = false): string {
    if (this.appEnv.isLocal) return url;

    // @see https://www.30secondsofcode.org/js/s/url-join
    const URLJoin = (...args) =>
      args
        .join('/')
        .replace(/[/]+/g, '/')
        .replace(/^(.+):\//, '$1://')
        .replace(/^file:/, 'file:/')
        .replace(/\/(\?|&|#[^!])/g, '$1')
        .replace(/\?/g, '&')
        .replace('&', '?');

    return (
      (absolutePath ? this.appEnv.siteConfig.siteDomain : '') +
      URLJoin(this.appEnv.assetsPath, url)
    );
  }
}
