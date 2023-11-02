import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HTMLEvent } from '../shared/models/events';
import { StoreAppFacade } from '../shared/stores/app';
import { skip } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogEditStore } from './catalog-edit.store';
import { CatalogEditRequest } from './models';
import { PartModalPageTransitionConfirmComponent } from '../components/part-modal-page-transition-confirm';
import { PartModalChangeConfirmComponent } from '../components/part-modal-change-confirm';

@Component({
  selector: 'athome-customhouse-catalog-edit',
  templateUrl: './catalog-edit.component.html',
  styleUrls: ['./catalog-edit.component.scss'],
  providers: [CatalogEditStore],
})
/**
 * カタログ変更component
 */
export class CatalogEditComponent implements OnInit {
  // 表示切替
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
  public catalogTypeForm: FormControl;
  public catalogMediaForm: FormControl;
  public catalogNameForm: FormControl;
  public catalogGaiyouForm: FormControl;
  public statusForm: FormControl;

  constructor(
    private _builder: FormBuilder,
    public store: CatalogEditStore,
    public storeAppFacade: StoreAppFacade,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.store.catalog$.subscribe((value) => {
      this.catalogTypeForm = new FormControl(value.catalogType, [
        Validators.required,
      ]);
      this.catalogMediaForm = new FormControl(value.catalogMedia, [
        Validators.required,
      ]);
      this.catalogNameForm = new FormControl(value.catalogNm);
      this.catalogGaiyouForm = new FormControl(value.catalogGaiyou, [
        Validators.required,
      ]);
      this.statusForm = new FormControl(value.koukaiJoutai, [
        Validators.required,
      ]);

      this.registrationForm = this._builder.group({
        catalogType: this.catalogTypeForm,
        catalogMedia: this.catalogMediaForm,
        catalogName: this.catalogNameForm,
        catalogGaiyou: this.catalogGaiyouForm,
        status: this.statusForm,
      });
    });
  }

  catalogId: number;
  updatedDate: string;

  ngOnInit() {
    this.storeAppFacade.user$.subscribe((value) => {
      this.shougou = value.info.shougou;
    });

    this.store.catalog$.subscribe((value) => {
      this.catalogTag = value.catalogTag;
      this.updatedDate = value.updatedDate;
    });

    this.route.params.subscribe((params) => {
      this.catalogId = params['id'];
    });
  }

  // TODO: プレビュー実装
  public previewData() {
    this.previewed = true;
  }

  /**
   * カタログ変更処理
   */
  public editCatalog() {
    const request: CatalogEditRequest = {
      catalogId: this.catalogId,
      shougou: this.shougou,
      catalogType: this.catalogTypeForm.value,
      catalogMedia: this.catalogMediaForm.value,
      catalogNm: this.catalogNameForm.value,
      catalogGaiyou: this.catalogGaiyouForm.value,
      catalogTag: this.catalogTag,
      catalogGazou: {
        file: this.imgFile,
        path: this.imgFilePath,
        name: this.imgFileName,
        src: this.imgSrc,
      },
      koukaiJoutai: this.statusForm.value,
    };

    this.store.edit(request);
  }

  @ViewChild('changeModal') changeModal: PartModalChangeConfirmComponent;
  /**
   * 変更ボタン押下処理
   */
  onClickSubmit() {
    if (
      this.shougou &&
      this.catalogTypeForm.value &&
      this.catalogNameForm.value &&
      this.catalogGaiyouForm.value &&
      this.statusForm.value
    ) {
      this.store.getIsEdit({
        catalogId: this.catalogId,
        updatedDate: this.updatedDate,
      });

      this.store.isEdit$.pipe(skip(1)).subscribe((value) => {
        if (value) {
          this.changeModal.henkou = true;
        } else {
          this.changeModal.sameTime = true;
        }
      });

      this.changeModal.open();
    } else {
      this.errorList = ['必須項目を入力してください'];
      return;
    }
  }

  @ViewChild('pageTransitionModal')
  pageTransitionModal: PartModalPageTransitionConfirmComponent;
  /**
   * 戻るボタン押下処理
   */
  onClickBack() {
    this.store.catalog$.subscribe((value) => {
      if (
        value.shougou !== this.shougou ||
        value.catalogNm !== this.catalogNameForm.value ||
        value.catalogType !== this.catalogTypeForm.value ||
        value.catalogMedia !== this.catalogMediaForm.value ||
        value.catalogGaiyou !== this.catalogGaiyouForm.value ||
        value.catalogTag !== this.catalogTag ||
        value.koukaiJoutai !== this.statusForm.value ||
        value.catalogGazou.file !== this.imgFile ||
        value.catalogGazou.name !== this.imgFileName ||
        value.catalogGazou.path !== this.imgFilePath ||
        value.catalogGazou.src !== this.imgSrc
      ) {
        this.pageTransitionModal.open();
      } else {
        this.router.navigate(['catalog']);
      }
    });
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
