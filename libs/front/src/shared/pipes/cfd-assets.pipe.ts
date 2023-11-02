import { Pipe, PipeTransform } from '@angular/core';
import { CfdAssetsService } from '../services';

/**
 * Environment#assetsPathの値をurlの先頭に付け加えます
 */
@Pipe({ name: 'cfdAssets' })
export class CfdAssetsPipe implements PipeTransform {
  constructor(private cfdAssetsService: CfdAssetsService) {}
  v;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(url: any, absolutePath = false) {
    return this.cfdAssetsService.transform(url, absolutePath);
  }
}
