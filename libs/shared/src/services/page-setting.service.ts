import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageSettingService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * @returns サイトCD
   */
  public getPageSetting(
    basePageSetting: string,
    hasIndustryParam: boolean,
    hasConditionParam: boolean
  ): string {
    if (basePageSetting && (hasIndustryParam || hasConditionParam)) {
      return '3' + (hasIndustryParam ? '2' : '3') + basePageSetting.slice(2);
    } else {
      return basePageSetting;
    }
  }
}
