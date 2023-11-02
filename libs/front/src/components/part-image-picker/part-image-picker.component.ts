import { Component, Input } from '@angular/core';

@Component({
  selector: 'athome-customhouse-part-image-picker',
  templateUrl: './part-image-picker.component.html',
  styleUrls: ['./part-image-picker.component.scss'],
})
export class PartImagePickerComponent {
  @Input() error: boolean;
  @Input() henkou: boolean;
  @Input() btnCenter: boolean;
  @Input() formatShow: boolean;
  @Input() numberShow: boolean;
  @Input() number: number;
  @Input() imageUploadShow: boolean;
  @Input() pdfUpload: boolean;

  imgFile: File = null;
  imgFilePath: string;
  imgFileName: any;
  imgSrc: string | ArrayBuffer = 'https://placehold.jp/120x120.png';

  resetImgFileInput(event) {
    this.imgFile = null;
    this.imgFilePath = null;
    this.imgFileName = null;
    this.imgSrc = 'https://placehold.jp/120x120.png';
    return;
  }

  onChangeImgFileInput(event) {
    //imgFileが選択されていなければリセット
    if (event.target.files.length === 0) {
      this.resetImgFileInput(event);
      return;
    }

    //ファイルの情報をimgFileとimgSrcに保存
    const reader = new FileReader();
    this.imgFile = event.target.files[0];
    this.imgFilePath = event.target.value;
    this.imgFileName = this.imgFilePath.match(/[^\\]+$/);
    reader.onload = () => {
      this.imgSrc = reader.result;
    };
    reader.readAsDataURL(this.imgFile);
  }

  //画像一括アップロード
  selectedFiles: FileData[] = [];
  filesUpload = false;

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.filesUpload = true;

    for (let i = 0; i < this.number; i++) {
      const file: File = files[i];
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles.push({ name: file.name, dataUrl: e.target.result });
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
  onFileChange(event: any, index: number) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file: File = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles[index] = {
          name: file.name,
          dataUrl: e.target.result,
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
    const imageBox: any = document.querySelector('.image-box .image');
    const image: any = document.querySelector('.image-box .image img');
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
  name: string;
  dataUrl: string;
}
