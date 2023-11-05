import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PartImagePickerService } from './services/part-image-picker.service';
import { Message } from '../../shared/constants';
import { tap } from 'rxjs';
import { FileData, IChangeFileData } from '../../shared/models';

@Component({
  selector: 'athome-customhouse-part-image-picker',
  templateUrl: './part-image-picker.component.html',
  styleUrls: ['./part-image-picker.component.scss'],
})
export class PartImagePickerComponent implements OnInit {
  constructor(
    private readonly partImagePickerService: PartImagePickerService
  ) {}
  /** 回転表示するかどうか */
  @Input() showRotate: boolean;
  /** 形式表示するかどうか */
  @Input() showFormat: boolean;
  /** 件数表示するかどうか */
  @Input() showNumber: boolean;
  /** 選択件数 */
  @Input() number: number;
  /** pdfアップロードかどうか */
  @Input() pdfUpload: boolean;
  /** ファイル情報 */
  @Input() fileData: FileData[];

  /** ファイルURL */
  @Output() fileUrl = new EventEmitter<string | string[]>();
  /** 画像削除 */
  @Output() deleteImage = new EventEmitter();
  /** 回転角度 */
  @Output() rotationAngle = new EventEmitter<number>();
  @Output() changeFile = new EventEmitter<IChangeFileData>();

  /** エラー */
  error: string;
  /** ファイル名 */
  imgFileName: RegExpMatchArray | string;
  /** 画像ソース */
  imgSrc: string | ArrayBuffer;
  /** 選択ファイル一覧（一括アップロード用） */
  selectedFiles: FileData[] = [];
  /** 回転角度 */
  rotate = 0;

  ngOnInit() {
    if (this.fileData && this.number === 1) {
      this.imgFileName = this.fileData[0].fileName;
      this.imgSrc = this.fileData[0].fileSrc;
    }
    if (this.fileData && this.number > 1) {
      this.selectedFiles = this.fileData;
    }
  }

  resetImgFileInput() {
    this.imgFileName = null;
    this.imgSrc = '';
    this.deleteImage.emit();
    return;
  }

  onChangeImgFileInput(event: Event) {
    const target = <HTMLInputElement>event.target;
    const uploadedFile = target.files[0];
    const reader = new FileReader();
    //imgFileが選択されていなければリセット
    if (target.files.length === 0) {
      this.resetImgFileInput();
      return;
    }

    this.partImagePickerService
      .uploadFile(uploadedFile)
      .pipe(tap(() => (this.error = '')))
      .subscribe({
        next: (response) => {
          switch (response.code) {
            case 200:
              if (this.imgSrc) {
                this.resetImgFileInput();
              }

              //ファイルの情報をimgFileとimgSrcに保存
              this.imgFileName = target.value.match(/[^\\]+$/);
              reader.onload = () => {
                this.imgSrc = reader.result;
              };
              reader.readAsDataURL(target.files[0]);
              this.fileUrl.emit(response.body.url);
              break;
            default:
              this.error = Message.Error.E0021;
          }
        },
        error: () => {
          this.error = Message.Error.E0022;
        },
      });
  }

  /**
   * ファイル一括選択
   * FileReaderが非同期処理のため、ファイルサイズによって順番が変わるため同期処理にしている
   * @param event イベント
   */
  async onSelectedFiles(event: Event) {
    const target = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    const filesLength = files.length > this.number ? this.number : files.length;

    this.partImagePickerService.uploadMultiFile(files).subscribe({
      next: (response) => {
        console.log(response);
        this.fileUrl.emit(response.body.urlList);
      },
      error: (error) => {
        console.log(error);
      },
    });

    for (let i = 0; i < filesLength; i++) {
      const file: File = files.item(i);
      const fileSrc = await this.partImagePickerService.readFileAsDataURL(file);
      this.selectedFiles.push({
        fileName: file.name,
        fileSrc: fileSrc,
      });
    }
  }

  //画像一括アップロード 削除ボタン
  onFileReset(targetIndex: number) {
    //削除ボタン押した以外のindexで配列作り直し
    this.selectedFiles = this.selectedFiles.filter(
      (fileData, index) => index !== targetIndex
    );
    this.changeFile.emit({ index: targetIndex });
  }

  //画像一括アップロード 変更ボタン
  onFileChange(event: Event, targetIndex: number) {
    const target = <HTMLInputElement>event.target;
    const files: FileList = target.files;

    //imgFileが選択されていなければリセット
    if (files.length === 0) {
      this.selectedFiles[targetIndex] = {
        fileName: null,
        fileSrc: null,
      };
      this.changeFile.emit({ index: targetIndex });
      return;
    }

    if (files.length) {
      const uploadedFile = files.item(0);
      this.partImagePickerService
        .uploadFile(uploadedFile)
        .pipe(tap(() => (this.error = '')))
        .subscribe({
          next: (response) => {
            switch (response.code) {
              case 200: {
                if (this.imgSrc) {
                  this.selectedFiles[targetIndex] = {
                    fileName: null,
                    fileSrc: null,
                  };
                }

                //ファイルの情報をimgFileとimgSrcに保存
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                  this.selectedFiles[targetIndex] = {
                    fileName: uploadedFile.name,
                    fileSrc: e.target.result,
                  };
                };
                reader.readAsDataURL(uploadedFile);
                this.changeFile.emit({
                  index: targetIndex,
                  url: response.body.url,
                });
                break;
              }
              default:
                this.error = Message.Error.E0021;
            }
          },
          error: () => {
            this.error = Message.Error.E0022;
          },
        });
    }
  }

  /**
   * 画像を回転する
   * @param degree 回転したい角度
   */
  rotateImage(degree: number) {
    this.rotate = (this.rotate + degree) % 360;
    const image: HTMLElement = document.getElementById(
      `selectedFileImage-${this.imgFileName}`
    );
    image.style.transform = 'rotate(' + this.rotate + 'deg)';
    const imageBox = image.parentElement;
    if (this.rotate === 90 || this.rotate === 270) {
      imageBox.style.height = '120px';
    } else {
      imageBox.style.height = 'auto';
    }
    this.rotationAngle.emit(this.rotate);
  }
}
