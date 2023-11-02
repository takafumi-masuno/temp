import {
  Component,
  Inject,
  OnInit,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { Title, Meta } from '@angular/platform-browser';
import { CommonConstant } from '@shared/models';
import { StoreAppFacade } from '../shared/stores/app';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  itemArt = CommonConstant.itemArtType;
  constructor(
    public storeAppFacade: StoreAppFacade,
    @Optional()
    @Inject(RESPONSE)
    private response: Response,
    private titleService: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: unknown
  ) {}

  ngOnInit(): void {
    const title =
      'お探しのページが見つかりません【アットホーム】｜不動産・物件・住宅情報';
    this.titleService.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });

    if (isPlatformServer(this.platformId)) {
      this.response.statusCode = 404;
    }
  }
}
