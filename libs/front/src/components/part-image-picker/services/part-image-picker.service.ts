import { Injectable } from '@angular/core';
import { IUploadFileBodyResponse } from '../../../shared/models';
import { BffParams } from '@shared/apis';
import { IBasicBffResponse } from '@shared/models';
import { ApiService } from '@shared/services';

@Injectable({ providedIn: 'root' })
export class PartImagePickerService {
  constructor(private api: ApiService) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const bffParams = new BffParams({
      directory: ['file', 'upload-file'],
    });
    return this.api.postFile<IBasicBffResponse<IUploadFileBodyResponse>>(
      bffParams,
      formData
    );
  }
}
