import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PartImagePickerService } from './services/part-image-picker.service';
import { Message } from '../../shared/constants';
import { tap } from 'rxjs';

@Component({
  selector: 'athome-customhouse-part-image-picker',
  templateUrl: './part-image-picker.component.html',
  styleUrls: ['./part-image-picker.component.scss'],
})
export class PartImagePickerComponent implements OnInit {
  constructor(
    private readonly partImagePickerService: PartImagePickerService
  ) {}
  @Input() error: string;
  @Input() btnCenter: boolean;
  @Input() formatShow: boolean;
  @Input() numberShow: boolean;
  @Input() number: number;
  @Input() imageUploadShow: boolean;
  @Input() pdfUpload: boolean;
  @Input() fileData: FileData;

  @Output() fileUrl = new EventEmitter<string>();
  @Output() deleteImage = new EventEmitter();

  imgFile: File = null;
  imgFileName: RegExpMatchArray | string;
  imgSrc: string | ArrayBuffer;

  ngOnInit() {
    if (this.fileData) {
      this.imgFileName = this.fileData.fileName;
      this.imgSrc = this.fileData.fileSrc;
    }
  }

  resetImgFileInput() {
    this.imgFile = null;
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
              this.imgFile = target.files[0];
              this.imgFileName = target.value.match(/[^\\]+$/);
              reader.onload = () => {
                this.imgSrc = reader.result;
              };
              reader.readAsDataURL(this.imgFile);
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

  //画像一括アップロード
  selectedFiles: FileData[] = [];
  filesUpload = false;

  onFileSelected(event: Event) {
    const target = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    this.filesUpload = true;

    for (let i = 0; i < this.number; i++) {
      const file: File = files[i];
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedFiles.push({
          fileName: file.name,
          fileSrc: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  //画像一括アップロード 削除ボタン
  onFileReset(id: number) {
    this.selectedFiles = this.selectedFiles.filter(
      (fileData, index) => index !== id
    ); //削除ボタン押した以外のindexで配列作り直し
    if (this.selectedFiles.length === 0) {
      this.filesUpload = false;
    }
  }

  //画像一括アップロード 変更ボタン
  onFileChange(event: Event, index: number) {
    const target = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    if (files.length > 0) {
      const file: File = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedFiles[index] = {
          fileName: file.name,
          fileSrc: e.target.result,
        };
      };
      reader.readAsDataURL(file);
    }
  }

  //画像回転ボタン
  rotate = 0;
  clickCount = 0;
  imageRotate(x: number) {
    this.rotate = this.rotate + x;
    this.clickCount = this.clickCount + 1;
    const imageBox: HTMLElement = document.querySelector('.image-box .image');
    const image: HTMLElement = document.querySelector('.image-box .image img');
    image.style.transform = 'rotate(' + this.rotate + 'deg)';
    if (this.clickCount % 2 == 1) {
      imageBox.style.height = '120px';
    } else {
      imageBox.style.height = 'auto';
    }
  }
}

// 画像アップロード対応部分
interface FileData {
  fileName: string;
  fileSrc: string | ArrayBuffer;
}
