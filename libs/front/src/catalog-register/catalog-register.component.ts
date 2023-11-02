import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HTMLEvent } from '../shared/models/events';
import { CatalogRegisterStore } from './catalog-register.store';
import { Catalog as CatalogRegisterRequest } from './models';
import { StoreAppFacade } from '../shared/stores/app';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { PartModalPageTransitionConfirmComponent } from '../components/part-modal-page-transition-confirm';
import { PartModalRegisterConfirmComponent } from '../components/part-modal-register-confirm';

@Component({
  selector: 'athome-customhouse-catalog-edit',
  templateUrl: './catalog-register.component.html',
  styleUrls: ['./catalog-register.component.scss'],
  providers: [CatalogRegisterStore],
})
/**
 * カタログ登録component
 */
export class CatalogRegisterComponent implements OnInit {
  // 表示切替
  error = false;
  errorList: string[];

  // カタログタグ選択後の表示切替
  catalogTag: string[];
  setCatalogTag(tag: string[]) {
    this.catalogTag = tag;
  }

  // 商号選択後の表示切り替え
  shougou: string;
  setShougou(shougou: string) {
    this.shougou = shougou;
  }

  // フォーム
  public registrationForm: FormGroup;
  public previewed = false;
  public catalogType: FormControl;
  public catalogMedia: FormControl;
  public catalogName: FormControl;
  public catalogGaiyou: FormControl;
  public status: FormControl;

  constructor(
    private _builder: FormBuilder,
    public store: CatalogRegisterStore,
    public storeAppFacade: StoreAppFacade,
    public router: Router
  ) {
    this.catalogType = new FormControl('', [Validators.required]);
    this.catalogMedia = new FormControl('', [Validators.required]);
    this.catalogName = new FormControl('');
    this.catalogGaiyou = new FormControl('', [Validators.required]);
    this.status = new FormControl('下書き', [Validators.required]);

    this.registrationForm = this._builder.group({
      catalogType: this.catalogType,
      catalogMedia: this.catalogMedia,
      catalogName: this.catalogName,
      catalogGaiyou: this.catalogGaiyou,
      status: this.status,
    });
  }
  userInfo$ = this.storeAppFacade.user$.pipe(map((value) => value.info));
  permissions$ = this.storeAppFacade.user$.pipe(
    map((value) => value.permissions)
  );

  ngOnInit() {
    this.storeAppFacade.user$.subscribe((value) => {
      if (value.permissions.kenchikuKaishaUser) {
        this.shougou = value.info.shougou;
      }
    });
  }

  isKana = true;

  /**
   * 商号を検索する
   * @param shougou 商号（商号, 商号カナ）
   */
  searchShougou(shougou: { memberName: string; memberNameKana: string }) {
    const regex = /^[ァ-ヶー]+$/;
    if (regex.test(shougou.memberNameKana)) {
      this.store.searchShougou({
        shougou: shougou.memberName,
        shougouKana: shougou.memberNameKana,
      });
      this.isKana = true;
    } else {
      this.isKana = false;
    }
  }

  // TODO: プレビュー実装
  public previewData() {
    this.previewed = true;
  }

  shougouError = false;
  catalogTypeError = false;
  catalogNameError = false;
  catalogGaiyouError = false;
  @ViewChild('registerModal') registerModal: PartModalRegisterConfirmComponent;
  public onClickRegister() {
    let errorFlg = false;
    if (!this.shougou) {
      this.shougouError = true;
      errorFlg = true;
    }
    if (!this.catalogType.value) {
      this.catalogTypeError = true;
      errorFlg = true;
    }
    if (!this.catalogName.value) {
      this.catalogNameError = true;
      errorFlg = true;
    }
    if (!this.catalogGaiyou.value) {
      this.catalogGaiyouError = true;
      errorFlg = true;
    }

    if (errorFlg) {
      this.errorList = [
        '入力内容に誤りがあります。エラー箇所をご確認の上、入力してください。',
      ];
      document.querySelector('body').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      this.registerModal.open();
    }
  }

  /**
   * カタログ登録処理
   */
  public sendData() {
    const request: CatalogRegisterRequest = {
      shougou: this.shougou,
      catalogType: this.catalogType.value,
      catalogMedia: this.catalogMedia.value,
      catalogNm: this.catalogName.value,
      catalogGaiyou: this.catalogGaiyou.value,
      catalogTag: this.catalogTag,
      catalogGazou: {
        file: this.imgFile,
        path: this.imgFilePath,
        name: this.imgFileName,
        src: this.imgSrc,
      },
      koukaiJoutai: this.status.value,
    };

    this.store.register(request);
  }

  @ViewChild('pageTransitionModal')
  pageTransitionModal: PartModalPageTransitionConfirmComponent;
  /**
   * 戻るボタン押下処理
   */
  public onClickPageTransition() {
    if (
      this.shougou ||
      this.catalogType.value ||
      this.catalogMedia.value ||
      this.catalogName.value ||
      this.catalogGaiyou.value ||
      this.catalogTag ||
      this.imgFileName ||
      this.imgSrc ||
      this.imgFilePath ||
      this.imgFile
    ) {
      this.pageTransitionModal.open();
    } else {
      this.router.navigate(['/catalog']);
    }
  }

  // 画像アップロード
  imgFile: File;
  imgFilePath: string;
  imgFileName: string;
  imgSrc: string | ArrayBuffer;

  /**
   * カタログ画像選択処理
   * @param event 画像情報
   * @returns
   */
  onChangeImgFileInput(event: HTMLEvent<HTMLInputElement>) {
    //imgFileが選択されていなければリセット
    if (!event.target.files.length) {
      this.imgFile = null;
      this.imgSrc = null;
      this.imgFilePath = null;
      this.imgFileName = null;

      return;
    }

    //ファイルの情報をimgFileとimgSrcに保存
    const reader = new FileReader();
    this.imgFile = event.target.files[0];
    this.imgFilePath = event.target.value;
    this.imgFileName = this.imgFilePath.match(/[^\\]+$/)[0];

    reader.onload = () => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.imgFile);
  }
}
