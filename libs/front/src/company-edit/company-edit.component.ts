import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyEditStore } from './company-edit.store';
import { StoreAppFacade } from '../shared/stores/app';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PartModalPageTransitionConfirmComponent } from '../components/part-modal-page-transition-confirm';
import {
  ConvertToHalfWidthService,
  DateService,
  PrefectureService,
  PublicStatusService,
  ValidationService,
} from '../shared/services';
import { Router } from '@angular/router';
import { CompanyEditService } from './services/company-edit.service';
import { PartFixedFooterComponent } from '../components/part-fixed-footer';
import { Message, SegmentType, SegmentValueMst } from '../shared/constants';
import { FileData, IChangeFileData, IPrefecture } from '../shared/models';
import {
  IRegisterCompanyRequest,
  ISelectedArea,
  ISelectedCityInfo,
  ITokuchouType,
} from './models/company-edit.model';
import { filter, map } from 'rxjs';
import { PartModalChangeConfirmComponent } from '../components/part-modal-change-confirm';

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
  animations: [
    trigger('accordion', [
      state('close', style({ height: '0' })),
      state('open', style({ height: '*' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
    trigger('modal', [
      state('close', style({ opacity: 0, visibility: 'hidden' })),
      state('open', style({ opacity: 1, visibility: 'visible' })),
      transition('close => open', [animate('200ms')]),
      transition('open => close', [animate('200ms')]),
    ]),
  ],
  providers: [CompanyEditStore],
})
export class CompanyEditComponent implements OnInit {
  constructor(
    private _builder: FormBuilder,
    public store: CompanyEditStore,
    public storeAppFacade: StoreAppFacade,
    private prefectureService: PrefectureService,
    private companyEditService: CompanyEditService,
    private dateService: DateService,
    private publicStatusService: PublicStatusService,
    private validationService: ValidationService,
    private convertToHalfWidthService: ConvertToHalfWidthService,
    public router: Router
  ) {}
  /** ページ遷移確認モーダル */
  @ViewChild('pageTransitionConfirmModal')
  pageTransitionConfirmModal: PartModalPageTransitionConfirmComponent;

  /** 変更確認モーダル */
  @ViewChild('editModal') editModal: PartModalChangeConfirmComponent;

  /** 固定フッター */
  @ViewChild('fixedFotter') fixedFotter: PartFixedFooterComponent;

  // 施工対応エリア選択モーダル高さ調整用
  @ViewChild('scrollContents') scrollContents: ElementRef;
  @ViewChild('modalWrapper') modalWrapper: ElementRef;

  // **************************************************************************
  // ******************** フォーム用設定 ここから *******************************
  // **************************************************************************
  /**
   * 会社概要
   */
  public companyProfileForm = this._builder.group({
    kaishaType: [0, [Validators.required]],
    toriatsukaiKubun: this._builder.array(
      [],
      [this.companyEditService.checkAtLeastOneChecked]
    ),
    areaTodouhukenCd: this._builder.array<string>(
      [],
      [this.companyEditService.checkAtLeastOneAreaSelected]
    ),
    areaSikugunCd: this._builder.array<FormArray<FormControl<string>>>(
      [],
      [this.companyEditService.checkAtLeastOneAreaSelected]
    ),
    areaBikou: ['', [Validators.required]],
    tsubotankaFrom: [
      '',
      [Validators.required, this.validationService.checkDecimalNumber(50)],
    ],
    tsubotankaTo: [
      '',
      [Validators.required, this.validationService.checkDecimalNumber(50)],
    ],
    hontaikakakuFrom: [
      '',
      [Validators.required, this.validationService.checkDecimalNumber(50)],
    ],
    hontaikakakuTo: [
      '',
      [Validators.required, this.validationService.checkDecimalNumber(50)],
    ],
    afterServiceTeikiTenken: [''],
    kanseiHoshou: [''],
    kasiHoshou: [''],
    sonotaHoshou: [''],
    sekouJisseki: [''],
    sikakusya: [''],
    uriagedaka: [''],
    homePage: [''],
    kensetsuKyokaKubun: [null],
    kensetsuKyokaNo: [''],
    zimusyoTourokuNo: [''],
    tokuchouType: this._builder.array([] as number[]),
    setsumeiTitle: [''],
    setsumeiShousai: [''],
    setumeiSelection: ['noSample'],
    setumeiSample: this._builder.group({
      sample1: [''],
      sample2: [''],
      sample3: [''],
    }),
  });
  /**
   * 会社画像
   */
  public companyImageForm = this._builder.group({
    kaishaGazou1: [''],
    kaishaGazou2: [''],
    kaishaGazou3: [''],
    kaishaGazou4: [''],
    kaishaGazou5: [''],
  });
  /**
   * 会社紹介・メッセージ動画
   */
  public companyMovieForm = this._builder.group({
    kaishaDouga: [''],
  });
  /**
   * 会社のつよみ
   */
  public companyAdvantageForm = this._builder.group({
    kodawari1: this._builder.group({
      title: [''],
      shousai: [''],
      gazou: [''],
    }),
    kodawari2: this._builder.group({
      title: [''],
      shousai: [''],
      gazou: [''],
    }),
    kodawari3: this._builder.group({
      title: [''],
      shousai: [''],
      gazou: [''],
    }),
  });
  /**
   * 公開設定
   */
  public visibilitySettingsForm = this._builder.group({
    openStart: [this.dateService.getNowDate(), [Validators.required]],
    openEndSelection: [false, [this.companyEditService.startEndValidator]],
    openEnd: ['', [this.companyEditService.startEndValidator]],
    koukaiJoutai: [1, [Validators.required]],
  });

  /**
   * 建築会社登録フォーム
   */
  public companyEditForm = this._builder.group({
    companyProfile: this.companyProfileForm,
    companyImage: this.companyImageForm,
    companyMovie: this.companyMovieForm,
    companyAdvantage: this.companyAdvantageForm,
    visibilitySettings: this.visibilitySettingsForm,
  });

  /**
   * 施工対応エリア都道府県
   */
  public selectedPrefectureList = this._builder.group({
    selectPrefecture: this._builder.control(''),
  });

  /**
   * フォーム取得用設定
   */
  get toriatsukaiKubunForm() {
    return this.companyProfileForm.controls.toriatsukaiKubun as FormArray;
  }
  get tsubotankaFrom() {
    return this.companyProfileForm.controls.tsubotankaFrom as FormControl;
  }
  get tsubotankaTo() {
    return this.companyProfileForm.controls.tsubotankaTo as FormControl;
  }
  get hontaikakakuFrom() {
    return this.companyProfileForm.controls.hontaikakakuFrom as FormControl;
  }
  get hontaikakakuTo() {
    return this.companyProfileForm.controls.hontaikakakuTo as FormControl;
  }
  get tokuchouTypeForm() {
    return this.companyProfileForm.controls.tokuchouType as FormArray;
  }
  get areaTodouhukenCdForm() {
    return this.companyProfileForm.controls.areaTodouhukenCd as FormArray;
  }
  get areaShikugunCdForm() {
    return this.companyProfileForm.controls.areaSikugunCd as FormArray;
  }
  get selectPrefecture() {
    return this.selectedPrefectureList.controls.selectPrefecture as FormControl;
  }
  // **************************************************************************
  // ******************** フォーム用設定 ここまで *******************************
  // **************************************************************************

  /** プレビューフラグ */
  previewed = false;

  /** アットユーザーかどうか */
  isAtUser = false;

  /** 建築会社ユーザーかどうか */
  isKenchikuKaishaUser = false;

  /** 会員検索条件 */
  searchKaiinNo = '';

  /** 会社種別ラジオボタン選択肢 */
  kaishaTypeRadioOptions: SegmentType[] =
    SegmentValueMst.SegmentValue.KAISHA_TYPE;

  /** 取扱い工法区分チェックボックス選択肢 */
  toriatsukaiKubunCheckboxOptions: SegmentType[] = [];

  /** 建築業許可番号区分プルダウン選択肢 */
  kensetsuKyokaKubunOptions: SegmentType[] = [];

  /** サービスの特徴タグ */
  tokuchouTypeTags: ITokuchouType[] =
    SegmentValueMst.SegmentValue.TOKUCHOU_TYPE.map((type) => {
      return { isChecked: false, ...type };
    });

  /** 会社説明タイトルサンプル */
  setumeiSample = [
    {
      id: 'sample1',
      title: '〇〇（会社名）の注文住宅は、お客様の要望に合わせた完全自由設計。',
    },
    {
      id: 'sample2',
      title: '〇〇（会社名）は業界トップクラスの○○（会社のウリなど）',
    },
    {
      id: 'sample3',
      title: '○○（性能など）をいかし、○○な暮らしを実現。',
    },
  ];

  // 施工対応エリアを選択モーダル用
  // TODO: 画面デザイン変更の可能性有のため、確定まで仮実装
  // 施工対応エリア選択モーダル高さ調整用
  /** ウィンドウの高さ */
  windowHeight: number = window.innerHeight;
  /** モーダルの高さ */
  modalHeight: number = this.windowHeight - 246;

  /** 施工対応エリア選択モーダル開閉フラグ */
  selectConstructionAreaModal = false;

  /** 施工対応エリア選択モーダル高さ調整用フラグ */
  contentOver = false;

  /** 都道府県一覧 */
  prefectureList = [];

  /** 選択中の施工対応エリア都道府県 */
  selectedAreaPrefecture: IPrefecture = <IPrefecture>{};

  /** 施工対応エリア選択モーダルで選択中のエリア情報 */
  selectingAreaData: ISelectedArea[] = [];

  /** 施工対応エリア選択モーダルで選択したエリア情報 */
  selectedAreaData: ISelectedArea[] = [];

  /** 公開状態プルダウン選択肢 */
  koukaiJoutaiOptions: SegmentType[] = [];

  companyImageList: FileData[] = [];

  ngOnInit() {
    // 公開状態プルダウン選択肢を設定
    this.koukaiJoutaiOptions =
      this.publicStatusService.createKoukaiJoutaiOptions(false);

    // 取扱い工法区分チェックボックス選択肢を設定
    this.toriatsukaiKubunCheckboxOptions =
      this.companyEditService.createToriatsukaiKubunCheckboxOptions(
        SegmentValueMst.SegmentValue.TORIATSUKAI_KUBUN
      );
    // 取扱い工法区分チェックボックス用のフォームコントロールの追加
    this.toriatsukaiKubunCheckboxOptions.forEach(() => {
      this.toriatsukaiKubunForm.push(this._builder.control(false));
    });

    // 建築業許可番号区分区分プルダウン選択肢を設定
    this.kensetsuKyokaKubunOptions =
      this.companyEditService.createKensetsuKyokaKubunOptions();

    // ユーザー権限取得
    this.storeAppFacade.user$.pipe(filter((x) => !!x)).subscribe((data) => {
      this.isAtUser = Boolean(data.permissions.atUser);
      this.isKenchikuKaishaUser = Boolean(data.permissions.kenchikuKaishaUser);
    });

    this.store.kenchikuKaishaInfo$
      .pipe(filter((x) => !!x))
      .subscribe((data) => {
        this.companyProfileForm.patchValue({
          kaishaType: data.kaishaType,
          toriatsukaiKubun: data.toriatsukaiKubun,
          areaTodouhukenCd: data.areaTodouhukenCd,
          areaBikou: data.areaBikou,
          tsubotankaFrom: data.tsubotankaFrom,
          tsubotankaTo: data.tsubotankaTo,
          hontaikakakuFrom: data.hontaikakakuFrom,
          hontaikakakuTo: data.hontaikakakuTo,
          afterServiceTeikiTenken: data.afterServiceTeikiTenken,
          kanseiHoshou: data.kanseiHoshou,
          kasiHoshou: data.kasiHoshou,
          sonotaHoshou: data.sonotaHoshou,
          sekouJisseki: data.sekouJisseki,
          sikakusya: data.sikakusya,
          uriagedaka: data.uriagedaka,
          homePage: data.homePage,
          kensetsuKyokaKubun: data.kensetsuKyokaKubun,
          kensetsuKyokaNo: data.kensetsuKyokaNo,
          zimusyoTourokuNo: data.zimusyoTourokuNo,
          tokuchouType: data.tokuchouType,
          setsumeiTitle: data.setsumeiTitle,
          setsumeiShousai: data.setsumeiShousai,
        });
        this.companyImageForm.patchValue({
          kaishaGazou1: data.kaishaGazou1,
          kaishaGazou2: data.kaishaGazou2,
          kaishaGazou3: data.kaishaGazou3,
          kaishaGazou4: data.kaishaGazou4,
          kaishaGazou5: data.kaishaGazou5,
        });
        this.companyMovieForm.patchValue({
          kaishaDouga: data.kaishaDouga,
        });
        this.companyAdvantageForm.patchValue({
          kodawari1: {
            title: data.kodawariTitle1,
            shousai: data.kodawariShousai1,
            gazou: data.kodawariGazou1,
          },
          kodawari2: {
            title: data.kodawariTitle2,
            shousai: data.kodawariShousai2,
            gazou: data.kodawariGazou2,
          },
          kodawari3: {
            title: data.kodawariTitle3,
            shousai: data.kodawariShousai3,
            gazou: data.kodawariGazou3,
          },
        });
        // 施工対応エリア設定
        const prefectures = data.areaTodouhukenCd.map((code) =>
          this.prefectureService.getPrefecture(code)
        );
        this.selectingAreaData = prefectures.map((prefecture, index) => {
          return {
            prefecture: prefecture,
            cities: data.areaSikugunCd[index].map((city) => {
              return { isChecked: true, ...city };
            }),
          };
        });
        this.selectedArea();
        // サービスの特徴設定
        data.tokuchouType.map((typeValue) =>
          this.changeTokuchouTypeTag(typeValue)
        );
        // 会社画像設定
        [...Array(5)]
          .map((_, i) => i + 1)
          .map((num) => {
            this.companyImageList.push({
              fileName: data[`kaishaGazou${num}FileName`],
              fileSrc: data[`kaishaGazou${num}`],
            });
          });
      });
  }

  /**
   * 入力文字を変換する
   * @param control フォームコントロール
   */
  convertInputValue(control: FormControl) {
    const halfWidthStr = this.convertToHalfWidthService.convertToHalfWidth(
      control.value
    );
    control.setValue(halfWidthStr);
  }

  /**
   * 画像URLをフォーム値に設定する
   * @param url 画像のURL
   * @param control 設定するフォームコントロール
   */
  setImageUrl(url: string, control: FormControl) {
    if (control.value) {
      this.store.deleteImage(control.value);
    }
    control.setValue(url);
  }

  /**
   * 一括アップロード時の画像URLをフォーム値に設定する
   * @param data 画像のURL一覧
   */
  setImageUrlList(data: string[]) {
    const control = this.companyImageForm.controls;
    data.forEach((url, index) => {
      control[`kaishaGazou${index + 1}`].setValue(url);
    });
    console.log('会社画像情報', control);
  }

  /**
   * ファイルを削除する
   * @param control 削除するフォームコントロール
   */
  deleteFile(control: FormControl) {
    this.store.deleteImage(control.value);
    control.setValue('');
  }

  /**
   * 会社画像の画像削除処理
   * @param index 削除ボタン押下した画像のインデックス
   */
  deleteCompanyImage(index: number) {
    const formControls = this.companyImageForm.controls;
    this.store.deleteImage(formControls[`kaishaGazou${index + 1}`].value);
    formControls[`kaishaGazou${index + 1}`].setValue('');

    // 削除した画像を除いて、フォーム値を再設定
    const fileUrlList = [];
    for (const key in formControls) {
      if (formControls[key]) {
        const value = formControls[key].value;
        if (value) {
          fileUrlList.push(value);
        }
      }
    }

    this.companyImageForm.setValue({
      kaishaGazou1: '',
      kaishaGazou2: '',
      kaishaGazou3: '',
      kaishaGazou4: '',
      kaishaGazou5: '',
    });

    fileUrlList.forEach((url, index) => {
      formControls[`kaishaGazou${index + 1}`].setValue(url);
    });
  }

  changeCompanyImage(fileData: IChangeFileData) {
    if (fileData.url) {
      const control = this.companyImageForm.controls;
      if (control[`kaishaGazou${fileData.index + 1}`].value) {
        this.store.deleteImage(
          control[`kaishaGazou${fileData.index + 1}`].value
        );
      }
      control[`kaishaGazou${fileData.index + 1}`].setValue(fileData.url);
    } else {
      this.deleteCompanyImage(fileData.index);
    }
  }

  /**
   * 動画登録
   * @param event
   */
  registerMovie(event: Event) {
    this.store.setKaishaDougaError('');
    const uploadedFile = (event.target as HTMLInputElement).files[0];

    // キャンセルボタン押下時
    if (!uploadedFile) {
      return;
    }

    // バリデーションチェック
    const checkResult =
      this.companyEditService.checkMovieFileValidation(uploadedFile);
    if (checkResult) {
      this.store.setKaishaDougaError(checkResult);
      return;
    }

    this.store.setIsUpload(true);
    this.store.uploadVideo(uploadedFile);
    this.companyMovieForm.markAsTouched();
  }

  /**
   * 動画削除
   */
  deleteMovie() {
    this.store.deleteVideo();
  }

  /**
   * TODO: 画面デザイン変更の可能性有のため、確定まで仮実装
   * 施工対応エリアを選択モーダルを開く
   */
  openAreaModal() {
    this.prefectureList = this.prefectureService.getAreaPrefectures();
    this.selectingAreaData = structuredClone(this.selectedAreaData);
    this.selectConstructionAreaModal = true;
    if (
      this.scrollContents.nativeElement.offsetHeight >
      this.modalHeight - 120
    ) {
      this.contentOver = true;
    } else {
      this.contentOver = false;
    }
    this.selectedPrefecture(this.selectedAreaPrefecture);
    this.areaTodouhukenCdForm.markAsTouched();
    this.areaShikugunCdForm.markAsTouched();
  }

  /**
   * TODO: 画面デザイン変更の可能性有のため、確定まで仮実装
   * 施工対応エリアを選択モーダル選択するボタン押下
   */
  selectedArea() {
    this.closeAreaModal();
    this.selectedAreaData = structuredClone(this.selectingAreaData);
    this.areaTodouhukenCdForm.clear();
    this.areaShikugunCdForm.clear();
    this.selectedAreaData.map((selectedPrefecture) => {
      this.areaTodouhukenCdForm.push(
        this._builder.control(selectedPrefecture.prefecture.prefCd)
      );
      const selectedCities = selectedPrefecture.cities.map((city) => city.code);
      this.areaShikugunCdForm.push(this._builder.control(selectedCities));
    });
  }

  /**
   * TODO: 画面デザイン変更の可能性有のため、確定まで仮実装
   * 施工対応エリアを選択モーダルを閉じる
   */
  closeAreaModal() {
    this.selectConstructionAreaModal = false;
  }

  /**
   * 施工対応エリアを選択モーダルの高さを調整
   */
  isContentOver() {
    setTimeout(() => {
      const scrollContentsHeight =
        this.scrollContents.nativeElement.offsetHeight;
      const modalWrapperHeight = this.modalWrapper.nativeElement.offsetHeight;
      if (scrollContentsHeight > modalWrapperHeight - 284) {
        this.contentOver = true;
      } else {
        this.contentOver = false;
      }
    }, 190);
  }

  /**
   * TODO: 画面デザイン変更の可能性有のため、確定まで仮実装
   * 施工対応エリアの選択モーダル都道府県選択
   * @param selectedPrefectureInfo 選択した都道府県情報
   */
  selectedPrefecture(selectedPrefectureInfo: IPrefecture) {
    this.selectedAreaPrefecture = selectedPrefectureInfo;
    const matchingIndex = this.selectingAreaData.findIndex(
      (areaData) =>
        areaData.prefecture.prefCd === this.selectedAreaPrefecture.prefCd
    );
    const selectedCityCodeList =
      matchingIndex !== -1
        ? this.selectingAreaData[matchingIndex].cities.map((city) => city.code)
        : [];
    this.store.getCity({
      prefCd: selectedPrefectureInfo.prefCd,
      selectedList: selectedCityCodeList,
    });
  }

  /**
   * TODO: 画面デザイン変更の可能性有のため、確定まで仮実装
   * 施工対応エリアを選択したモーダル市区郡選択チェックボックス変更
   * @param changedCityInfo 変更した市区郡情報
   */
  cityCheckboxChange(changedCityInfo: ISelectedCityInfo) {
    // チェック状態を反転
    changedCityInfo.isChecked = !changedCityInfo.isChecked;

    // チェックしている市区郡を取得
    let checkedCities: ISelectedCityInfo[] = [];
    this.store.cityInfo$
      .pipe(map((city) => city.filter((info) => info.isChecked)))
      .subscribe((selectedCitiesInfo) => {
        checkedCities = selectedCitiesInfo;
      });

    // 選択中の施工対応エリアデータに設定
    const index = this.selectingAreaData.findIndex(
      (areaData) =>
        areaData.prefecture.prefCd === this.selectedAreaPrefecture.prefCd
    );
    // 都道府県・市区郡が選択済みかどうか判定
    if (index !== -1) {
      this.selectingAreaData[index].cities = checkedCities;
    } else {
      this.selectingAreaData.push({
        prefecture: this.selectedAreaPrefecture,
        cities: checkedCities,
      });
    }

    // 選択済みの市区郡が存在しない場合、選択中の施工対応エリアデータの都道府県情報を削除する
    if (!checkedCities.length) {
      this.selectingAreaData.splice(index, 1);
    }
  }

  /**
   * TODO: 画面デザイン変更の可能性有のため、確定まで仮実装
   * 施工対応エリアを選択モーダル全域選択チェックボックス状態変更
   * @param isChecked
   */
  changeSelectedAll(newCheckedState: boolean) {
    let changedCityInfos: ISelectedCityInfo[] = [];
    this.store.cityInfo$
      .pipe(
        map((city) => city.filter((info) => info.isChecked !== newCheckedState))
      )
      .subscribe((cities) => {
        changedCityInfos = cities;
      });
    changedCityInfos.map((differentSelectedCity) =>
      this.cityCheckboxChange(differentSelectedCity)
    );
  }

  /**
   * 取扱い工法区分チェックボックス状態変更
   */
  changeToriatsukaiKubunCheckbox() {
    this.toriatsukaiKubunForm.markAllAsTouched();
  }

  /**
   * サービスの特徴タグ変更
   * @param value 変更したタグの値
   */
  changeTokuchouTypeTag(value: number) {
    this.tokuchouTypeTags[value - 1].isChecked =
      !this.tokuchouTypeTags[value - 1].isChecked;
    this.tokuchouTypeForm.markAllAsTouched();
    const array = this.tokuchouTypeForm.getRawValue();
    array.includes(value)
      ? this.tokuchouTypeForm.removeAt(array.indexOf(value))
      : this.tokuchouTypeForm.push(this._builder.control(value));
  }

  /**
   * 公開終了日ラジオボタン変更
   */
  changeStartEndSelection() {
    if (!this.visibilitySettingsForm.controls.openEndSelection.value) {
      this.visibilitySettingsForm.controls.openEnd.setValue('');
    }
    this.visibilitySettingsForm.controls.openEndSelection.markAsTouched();
    this.visibilitySettingsForm.controls.openEndSelection.updateValueAndValidity();
    this.visibilitySettingsForm.controls.openEnd.updateValueAndValidity();
  }

  /**
   * 戻るボタン押下
   */
  onBackPressed() {
    if (
      this.companyEditForm.pristine &&
      !this.areaTodouhukenCdForm.touched &&
      !this.tokuchouTypeForm.touched
    ) {
      this.router.navigate(['/']);
    } else {
      this.pageTransitionConfirmModal.open();
    }
  }

  /**
   * ページ遷移処理
   */
  pageTransition() {
    this.pageTransitionConfirmModal.close();
    this.store.deleteFile();
  }

  /**
   * TODO: プレビュー表示
   * プレビュー
   */
  public previewData() {
    this.previewed = true;
  }

  /**
   * 登録ボタン押下
   */
  onEditButtonClick() {
    if (this.isKenchikuKaishaUser && this.companyEditForm.invalid) {
      this.store.setError([Message.Error.E0017]);
      this.companyEditForm.markAllAsTouched();
      this.fixedFotter.toPageTop();
      return;
    }
    if (!this.isKenchikuKaishaUser && this.visibilitySettingsForm.invalid) {
      this.store.setError([Message.Error.E0017]);
      this.visibilitySettingsForm.markAllAsTouched();
      this.fixedFotter.toPageTop();
      return;
    }
    this.editModal.open();
  }

  /**
   * 登録処理
   */
  editCompany() {
    this.editModal.close();
    const visibilitySettingsFormControls = this.visibilitySettingsForm.controls;
    const registerCompanyRequest: IRegisterCompanyRequest = {
      ...this.companyEditForm.value,
      companyProfile: {
        ...this.companyProfileForm.value,
        toriatsukaiKubun:
          this.companyEditService.createSelectedToriatsukaiKubunCode(
            this.toriatsukaiKubunForm.value,
            this.toriatsukaiKubunCheckboxOptions
          ),
        tsubotankaFrom: parseFloat(this.tsubotankaFrom.value),
        tsubotankaTo: parseFloat(this.tsubotankaTo.value),
        hontaikakakuFrom: parseFloat(this.hontaikakakuFrom.value),
        hontaikakakuTo: parseFloat(this.hontaikakakuTo.value),
      },
      visibilitySettings: {
        openStart: visibilitySettingsFormControls.openStart.value,
        openEndSelection: visibilitySettingsFormControls.openEndSelection.value,
        openEnd: visibilitySettingsFormControls.openEnd.value,
        koukaiJoutai: visibilitySettingsFormControls.koukaiJoutai.value,
      },
    };
    this.store.registerCompany(registerCompanyRequest);
  }

  /**
   * 公開設定フォーム更新
   * @param formGroup フォームグループ
   */
  updateForm(formGroup: FormGroup) {
    this.visibilitySettingsForm = formGroup;
  }
}
