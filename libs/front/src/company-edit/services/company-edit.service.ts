import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@shared/services';
import { BffParams } from '@shared/apis';
import {
  RegisterCompanyRequest,
  IVisibilitySettings,
  GetCityInfoRequest,
  ICompanyProfile,
  ICompanyImage,
  ICompanyAdvantage,
  IDeleteFileRequest,
  IUploadVideoResponse,
  ICompanyEditResponse,
  ICompanyInfo,
  ICompanyInfoForCompanyEdit,
} from '../models/company-edit.model';
import { Message, SegmentType, SegmentValueMst } from '../../shared/constants';
import { ICityInfo } from '../../shared/models';
import { FormArray, FormControl } from '@angular/forms';
import { BasicValidResponseType } from '@shared/models';
import { PrefectureService } from '../../shared/services';

/** 動画サイズ上限 */
const MOVIE_FILE_SIZE_LIMIT = 1024 * 1024 * 60;

/**
 * 建築会社登録サービス
 */
@Injectable({ providedIn: 'root' })
export class CompanyEditService {
  constructor(
    private api: ApiService,
    private prefectureService: PrefectureService
  ) {}

  /**
   * 建築会社変更の初期表示-建築会社情報を取得する
   * @param kenchikuKaishaId 建築会社ID
   * @returns 建築会社情報
   */
  getCompanyEditFirstView(
    kenchikuKaishaId: number
  ): Observable<ICompanyEditResponse> {
    const bffParams = new BffParams({
      directory: ['company-edit', `${kenchikuKaishaId}`],
    });
    return this.api.getJSONContent<ICompanyEditResponse>(bffParams, {});
  }

  /**
   * 建築会社詳細画面用の情報を作成
   * @param data 建築会社詳細レスポンス
   * @returns 建築会社詳細画面用の情報
   */
  createCompanyInfo(data: ICompanyInfoForCompanyEdit): ICompanyInfo {
    const companyDetail: ICompanyInfo = {
      kaishaType: data.kaishaType,
      toriatsukaiKubun: data.toriatsukaiKubun,
      area: this.getArea(data.areaTodouhukenCd, data.areaSikugunNm),
      areaTodouhukenCd: data.areaTodouhukenCd,
      areaSikugunCd: data.areaSikugunCd,
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
      setsumeiTitle: data.setsumeiTitle ? data.setsumeiTitle : '',
      setsumeiShousai: data.setsumeiShousai,
      kaishaGazou1: data.kaishaGazou1,
      kaishaGazou1FileName:
        data.kaishaGazou1 && this.getFileName(data.kaishaGazou1),
      kaishaGazou2: data.kaishaGazou2,
      kaishaGazou2FileName:
        data.kaishaGazou2 && this.getFileName(data.kaishaGazou2),
      kaishaGazou3: data.kaishaGazou3,
      kaishaGazou3FileName:
        data.kaishaGazou3 && this.getFileName(data.kaishaGazou3),
      kaishaGazou4: data.kaishaGazou4,
      kaishaGazou4FileName:
        data.kaishaGazou4 && this.getFileName(data.kaishaGazou4),
      kaishaGazou5: data.kaishaGazou5,
      kaishaGazou5FileName:
        data.kaishaGazou5 && this.getFileName(data.kaishaGazou5),
      kaishaDouga: data.kaishaDouga,
      kaishaDougaFileName:
        data.kaishaDouga && this.getFileName(data.kaishaDouga),
      kodawariTitle1: data.kodawariTitle1,
      kodawariTitle2: data.kodawariTitle2,
      kodawariTitle3: data.kodawariTitle3,
      kodawariShousai1: data.kodawariShousai1,
      kodawariShousai2: data.kodawariShousai2,
      kodawariShousai3: data.kodawariShousai3,
      kodawariGazou1: data.kodawariGazou1,
      kodawariGazou1FileName:
        data.kodawariGazou1 && this.getFileName(data.kodawariGazou1),
      kodawariGazou2: data.kodawariGazou2,
      kodawariGazou2FileName:
        data.kodawariGazou2 && this.getFileName(data.kodawariGazou2),
      kodawariGazou3: data.kodawariGazou3,
      kodawariGazou3FileName:
        data.kodawariGazou3 && this.getFileName(data.kodawariGazou3),
      openStart: data.openStart,
      openEnd: data.openEnd,
      koukaiJoutai: data.koukaiJoutai,
    };
    return companyDetail;
  }

  /**
   * 市区郡情報取得
   * @param selectedPrefectureCode 都道府県コード
   * @returns 市区郡情報
   */
  getCityInfo(selectedPrefectureCode: string): Observable<ICityInfo[]> {
    const getCityInfoRequest: GetCityInfoRequest = {
      prefectureCode: selectedPrefectureCode,
    };
    const bffParams = new BffParams({
      directory: ['city'],
    });
    return this.api.getJSONContent<ICityInfo[]>(bffParams, getCityInfoRequest);
  }

  /**
   * 動画アップロード
   * @param videoFile 動画ファイル
   * @returns 進捗率とurl
   */
  uploadVideo(videoFile: File) {
    const formData = new FormData();
    formData.append('file', videoFile);
    const bffParams = new BffParams({
      directory: ['file', 'upload-movie'],
    });
    return this.api.postFile<IUploadVideoResponse>(bffParams, formData, {
      successSelector: (res: IUploadVideoResponse) => res,
    });
  }

  /**
   * 画像・動画を削除する
   * @param list 削除する画像・動画パスの一覧
   * @returns レスポンスメッセージ
   */
  deleteFile(list: string[]): Observable<BasicValidResponseType> {
    const deleteFileRequest: IDeleteFileRequest = {
      deleteList: list,
    };
    const bffParams = new BffParams({
      directory: ['file', 'delete-file'],
    });
    return this.api.postJSONContent<BasicValidResponseType>(
      bffParams,
      deleteFileRequest
    );
  }

  /**
   * 動画ファイルバリデーションチェック
   * @param file アップロードする動画ファイル
   * @returns エラー時はエラーメッセージ
   */
  checkMovieFileValidation(file: File) {
    // ファイル形式
    if (file.type !== 'video/mp4' && file.type !== 'video/quicktime') {
      const fileTypeErrorMessage = Message.Error.E0020;
      return fileTypeErrorMessage;
    }

    // ファイルサイズ
    if (file.size > MOVIE_FILE_SIZE_LIMIT) {
      const fileSizeErrorMessage = Message.Error.E0019;
      return fileSizeErrorMessage;
    }

    return '';
  }

  /**
   * 選択している取扱い工法区分コード一覧を作成
   * @param selectedList 取扱い工法区分フォーム値
   * @param optionList 取扱い工法区分チェックボックス選択肢
   * @returns 選択している取扱い工法区分コード一覧
   */
  createSelectedToriatsukaiKubunCode(
    selectedList: boolean[],
    optionList: SegmentType[]
  ) {
    const selectedIndexes = selectedList
      .map((value, index) => (value ? index : -1))
      .filter((index) => index >= 0);
    const selectedToriatsukaiKubunCodeList = selectedIndexes
      .map((index) => optionList[index])
      .map((kubun) => kubun.value)
      .sort();
    return selectedToriatsukaiKubunCodeList;
  }

  /**
   * 建築会社登録
   * @param request 建築会社登録情報
   * @param kaishaDouga 会社動画URL
   * @param deleteFileList 削除ファイル一覧
   * @returns レスポンスメッセージ
   */
  registerCompany(
    request: {
      companyProfile?: ICompanyProfile;
      companyImage?: ICompanyImage;
      companyAdvantage?: ICompanyAdvantage;
      visibilitySettings: IVisibilitySettings;
    },
    kaishaDouga: string,
    deleteFileList: string[]
  ): Observable<BasicValidResponseType> {
    let registerCompanyRequest: RegisterCompanyRequest;
    if (!request.companyProfile) {
      // アットホームユーザーの場合
      registerCompanyRequest = {
        kenchikuKaishaInfo: {
          kaishaType: 0,
          toriatsukaiKubun: [],
          areaTodouhukenCd: [],
          areaSikugunCd: [],
          areaBikou: '',
          tsubotankaFrom: 0,
          tsubotankaTo: 0,
          hontaikakakuFrom: 0,
          hontaikakakuTo: 0,
          openStart: request.visibilitySettings.openStart,
          openEnd: request.visibilitySettings.openEnd,
          koukaiJoutai: request.visibilitySettings.koukaiJoutai,
        },
      };
    } else {
      // 建築会社ユーザーの場合
      registerCompanyRequest = {
        kenchikuKaishaInfo: {
          kaishaType: request.companyProfile.kaishaType,
          toriatsukaiKubun: request.companyProfile.toriatsukaiKubun,
          areaTodouhukenCd: request.companyProfile.areaTodouhukenCd,
          areaSikugunCd: request.companyProfile.areaSikugunCd.map(
            (areaSikugun) => {
              if (areaSikugun.includes('000')) {
                return ['000'];
              } else {
                return areaSikugun;
              }
            }
          ),
          areaBikou: request.companyProfile.areaBikou,
          tsubotankaFrom: request.companyProfile.tsubotankaFrom,
          tsubotankaTo: request.companyProfile.tsubotankaTo,
          hontaikakakuFrom: request.companyProfile.hontaikakakuFrom,
          hontaikakakuTo: request.companyProfile.hontaikakakuTo,
          openStart: request.visibilitySettings.openStart,
          openEnd: request.visibilitySettings.openEnd,
          koukaiJoutai: request.visibilitySettings.koukaiJoutai,
        },
      };
      if (request.companyProfile.afterServiceTeikiTenken) {
        registerCompanyRequest.kenchikuKaishaInfo.afterServiceTeikiTenken =
          request.companyProfile.afterServiceTeikiTenken;
      }
      if (request.companyProfile.kanseiHoshou) {
        registerCompanyRequest.kenchikuKaishaInfo.kanseiHoshou =
          request.companyProfile.kanseiHoshou;
      }
      if (request.companyProfile.kasiHoshou) {
        registerCompanyRequest.kenchikuKaishaInfo.kasiHoshou =
          request.companyProfile.kasiHoshou;
      }
      if (request.companyProfile.sonotaHoshou) {
        registerCompanyRequest.kenchikuKaishaInfo.sonotaHoshou =
          request.companyProfile.sonotaHoshou;
      }
      if (request.companyProfile.sekouJisseki) {
        registerCompanyRequest.kenchikuKaishaInfo.sekouJisseki =
          request.companyProfile.sekouJisseki;
      }
      if (request.companyProfile.sikakusya) {
        registerCompanyRequest.kenchikuKaishaInfo.sikakusya =
          request.companyProfile.sikakusya;
      }
      if (request.companyProfile.uriagedaka) {
        registerCompanyRequest.kenchikuKaishaInfo.uriagedaka =
          request.companyProfile.uriagedaka;
      }
      if (request.companyProfile.homePage) {
        registerCompanyRequest.kenchikuKaishaInfo.homePage =
          request.companyProfile.homePage;
      }
      if (request.companyProfile.kensetsuKyokaKubun) {
        registerCompanyRequest.kenchikuKaishaInfo.kensetsuKyokaKubun =
          request.companyProfile.kensetsuKyokaKubun;
      }
      if (request.companyProfile.kensetsuKyokaNo) {
        registerCompanyRequest.kenchikuKaishaInfo.kensetsuKyokaNo =
          request.companyProfile.kensetsuKyokaNo;
      }
      if (request.companyProfile.zimusyoTourokuNo) {
        registerCompanyRequest.kenchikuKaishaInfo.zimusyoTourokuNo =
          request.companyProfile.zimusyoTourokuNo;
      }
      if (request.companyProfile.tokuchouType.length) {
        registerCompanyRequest.kenchikuKaishaInfo.tokuchouType =
          request.companyProfile.tokuchouType.sort();
      }
      if (request.companyProfile.setsumeiTitle) {
        registerCompanyRequest.kenchikuKaishaInfo.setsumeiTitle =
          request.companyProfile.setsumeiTitle;
      }
      if (request.companyProfile.setsumeiShousai) {
        registerCompanyRequest.kenchikuKaishaInfo.setsumeiShousai =
          request.companyProfile.setsumeiShousai;
      }
      if (request.companyImage.kaishaGazou1) {
        registerCompanyRequest.kenchikuKaishaInfo.kaishaGazou1 =
          request.companyImage.kaishaGazou1;
      }
      if (request.companyImage.kaishaGazou2) {
        registerCompanyRequest.kenchikuKaishaInfo.kaishaGazou2 =
          request.companyImage.kaishaGazou2;
      }
      if (request.companyImage.kaishaGazou3) {
        registerCompanyRequest.kenchikuKaishaInfo.kaishaGazou3 =
          request.companyImage.kaishaGazou3;
      }
      if (request.companyImage.kaishaGazou4) {
        registerCompanyRequest.kenchikuKaishaInfo.kaishaGazou4 =
          request.companyImage.kaishaGazou4;
      }
      if (request.companyImage.kaishaGazou5) {
        registerCompanyRequest.kenchikuKaishaInfo.kaishaGazou5 =
          request.companyImage.kaishaGazou5;
      }
      if (kaishaDouga) {
        registerCompanyRequest.kenchikuKaishaInfo.kaishaDouga = kaishaDouga;
      }
      if (request.companyAdvantage.kodawari1.title) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariTitle1 =
          request.companyAdvantage.kodawari1.title;
      }
      if (request.companyAdvantage.kodawari1.shousai) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariShousai1 =
          request.companyAdvantage.kodawari1.shousai;
      }
      if (request.companyAdvantage.kodawari1.gazou) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariGazou1 =
          request.companyAdvantage.kodawari1.gazou;
      }
      if (request.companyAdvantage.kodawari2.title) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariTitle2 =
          request.companyAdvantage.kodawari2.title;
      }
      if (request.companyAdvantage.kodawari2.shousai) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariShousai2 =
          request.companyAdvantage.kodawari2.shousai;
      }
      if (request.companyAdvantage.kodawari2.gazou) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariGazou2 =
          request.companyAdvantage.kodawari2.gazou;
      }
      if (request.companyAdvantage.kodawari3.title) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariTitle3 =
          request.companyAdvantage.kodawari3.title;
      }
      if (request.companyAdvantage.kodawari3.shousai) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariShousai3 =
          request.companyAdvantage.kodawari3.shousai;
      }
      if (request.companyAdvantage.kodawari3.gazou) {
        registerCompanyRequest.kenchikuKaishaInfo.kodawariGazou3 =
          request.companyAdvantage.kodawari3.gazou;
      }
      if (deleteFileList.length) {
        registerCompanyRequest.deleteFiles = { list: deleteFileList };
      }
    }
    const bffParams = new BffParams({
      directory: ['company-register', 'company'],
    });
    return this.api.postJSONContent<BasicValidResponseType>(
      bffParams,
      registerCompanyRequest
    );
  }

  /**
   * 取扱い工法区分チェックボックスの選択肢を作成する
   */
  createToriatsukaiKubunCheckboxOptions(options: SegmentType[]): SegmentType[] {
    const halfLength = options.length / 2;
    const beforeOptions = options.slice(0, halfLength);
    const afterOptions = options.slice(-halfLength);
    const sortOptions = [];
    for (let i = 0; i < halfLength; i++) {
      sortOptions.push(beforeOptions[i], afterOptions[i]);
    }
    return sortOptions;
  }

  /**
   * 建築業許可番号区分プルダウンの選択肢を作成する
   * @returns 建築業許可番号区分プルダウン選択肢
   */
  createKensetsuKyokaKubunOptions(): SegmentType[] {
    const KENSETSU_KYOKA_KUBUN =
      SegmentValueMst.SegmentValue.KENSETSU_KYOKA_KUBUN;
    const options = [
      { value: null, nm: '区分を選択してください', sort: 0 },
      ...KENSETSU_KYOKA_KUBUN,
    ];
    return options;
  }

  /**
   * ファイル名の取得
   * @param filePath ファイルパス
   * @returns ファイル名
   */
  getFileName(filePath: string): string {
    const url = new URL(filePath);
    const fileName = url.pathname.split('/').pop();
    return fileName;
  }

  /**
   * 施工対応エリア情報取得
   * @param prefectures 施工対応エリア都道府県情報
   * @param cities 施工対応エリア市区郡情報
   * @returns 施工対応エリア情報
   */
  getArea(prefectures: string[], cities: string[][]): string[] {
    const areaData = [];
    prefectures.map((prefecture, index) => {
      areaData.push(`${prefecture}＞${cities[index].join('、')}`);
    });
    return areaData;
  }

  /**
   * 公開終了日のカスタムバリデーション
   */
  startEndValidator(form: FormControl) {
    if (!form.parent || !form.parent.controls) {
      return null;
    }
    return form.parent.get('openEndSelection').value &&
      !form.parent.get('openEnd').value
      ? { required: true }
      : null;
  }

  /**
   * 取扱い工法区分のカスタムバリデーション
   */
  checkAtLeastOneChecked(form: FormArray) {
    const checkList = form.controls.filter((ctrl) => ctrl.value);
    return checkList.length ? null : { required: true };
  }

  /**
   * 施工対応エリアのカスタムバリデーション
   */
  checkAtLeastOneAreaSelected(form: FormArray) {
    if (!form.parent || !form.parent.controls) {
      return null;
    }
    return form.parent.get('areaTodouhukenCd').value.length ||
      form.parent.get('areaSikugunCd').value.length
      ? null
      : { required: true };
  }
}
