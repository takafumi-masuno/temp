import { Injectable } from '@angular/core';
import { CommonConstant } from '../models';
import { UserAgentService } from './user-agent.service';

@Injectable({
  providedIn: 'root',
})
export class SiteCdService {
  constructor(private userAgentService: UserAgentService) {}

  /**
   * @returns サイトCD
   */
  public getSiteCd(): string {
    const userAgent = this.userAgentService.getUserAgent();
    if (userAgent.includes('iphone')) {
      return CommonConstant.siteCd.iphone;
    } else if (userAgent.includes('android') && userAgent.includes('mobile')) {
      return CommonConstant.siteCd.android;
    } else {
      return CommonConstant.siteCd.pc;
    }
  }
}
