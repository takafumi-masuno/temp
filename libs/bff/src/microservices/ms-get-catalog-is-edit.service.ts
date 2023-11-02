import { Injectable } from '@nestjs/common';
import { ApiService } from '..';
import { CatalogIsEditRequest, CatalogIsEditResponse } from '../models';
import { MicroServiceType, MicroserviceParams } from '@shared/apis';
import { Observable, of } from 'rxjs';

@Injectable()
export class MsGetCatalogIsEditService {
  constructor(private apiService: ApiService) {}

  public getIsEdit(
    request: CatalogIsEditRequest
  ): Observable<CatalogIsEditResponse> {
    return of({ isEdit: 0 });
    // return this.apiService.getJSONContent(
    //   new MicroserviceParams({
    //     type: MicroServiceType.base,
    //     path: ['catalog-isEdit'],
    //   }),
    //   request
    // );
  }
}
