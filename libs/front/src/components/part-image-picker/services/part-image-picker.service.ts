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

  uploadMultiFile(fileList: FileList) {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList.item(i));
    }
    const bffParams = new BffParams({
      directory: ['file', 'upload-multi-file'],
    });
    return this.api.postFile<IBasicBffResponse<{ urlList: string[] }>>(
      bffParams,
      formData
    );
  }

  /**
   * ファイルからDataURLを作成
   * FileReaderが非同期処理のため、ファイルサイズによって順番が変わるため同期処理にしている
   * @param file ファイル
   * @returns DataURL
   */
  async readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        resolve(e.target.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
