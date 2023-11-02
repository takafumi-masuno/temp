import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  ICompanyEditResponse,
  ICompanyInfo,
  IKaiinInfo,
  IRegisterCompanyRequest,
  ISelectedCityInfo,
} from './models/company-edit.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EMPTY,
  Observable,
  catchError,
  filter,
  map,
  mergeMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CompanyEditService } from './services/company-edit.service';
import { Message } from '../shared/constants';
import { IError } from '@shared/models';

interface CompanyEditState {
  basicInfo: IKaiinInfo;
  kenchikuKaishaInfo: ICompanyInfo;
  updatedDate: string;
  kaishaDougaFileName: string;
  kaishaDougaPath: string;
  kaishaDougaError: string;
  deleteFileList: string[];
  kaiinSearchError: boolean;
  uploadProgress: number;
  isUpload: boolean;
  selectedPrefecture?: string;
  cityInfo: ISelectedCityInfo[];
  isPageTransitionModalOpen: boolean;
  error: string[];
}

@Injectable()
export class CompanyEditStore extends ComponentStore<CompanyEditState> {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyEditService: CompanyEditService
  ) {
    super({
      basicInfo: null,
      kenchikuKaishaInfo: null,
      updatedDate: null,
      kaishaDougaFileName: '',
      kaishaDougaPath: '',
      deleteFileList: [],
      kaiinSearchError: false,
      uploadProgress: 0,
      isUpload: false,
      kaishaDougaError: '',
      isPageTransitionModalOpen: false,
      cityInfo: [
        {
          isChecked: false,
          name: '全域',
          roman: 'zeniki',
          code: '000',
        },
      ],
      error: [],
    });

    this.route.data
      .pipe(
        map(({ data }) => data),
        takeUntil(this.destroy$)
      )
      .subscribe((data: ICompanyEditResponse) => {
        console.log('storeレスポンス', data);
        this.setBasicInfo(data.basicInfo);
        this.setKenchikuKaishaInfo(
          this.companyEditService.createCompanyInfo(data.companyInfo)
        );
      });

    this.selectedPrefecture$.pipe(filter((x) => !!x)).subscribe((x) => {
      this.getCity({ prefCd: x, selectedList: [] });
    });
  }

  readonly basicInfo$: Observable<IKaiinInfo> = this.select(
    ({ basicInfo }) => basicInfo
  );

  readonly kenchikuKaishaInfo$: Observable<ICompanyInfo> = this.select(
    ({ kenchikuKaishaInfo }) => kenchikuKaishaInfo
  );

  readonly kaishaDougaFileName$: Observable<string> = this.select(
    ({ kaishaDougaFileName }) => kaishaDougaFileName
  );

  readonly kaishaDougaPath$: Observable<string> = this.select(
    ({ kaishaDougaPath }) => kaishaDougaPath
  );

  readonly deleteFileList$: Observable<string[]> = this.select(
    ({ deleteFileList }) => deleteFileList
  );

  readonly kaishaDougaError$: Observable<string> = this.select(
    ({ kaishaDougaError }) => kaishaDougaError
  );

  readonly updatedDate$: Observable<string> = this.select(
    ({ updatedDate }) => updatedDate
  );

  readonly kaiinSearchError$: Observable<boolean> = this.select(
    ({ kaiinSearchError }) => kaiinSearchError
  );

  readonly uploadProgress$: Observable<number> = this.select(
    ({ uploadProgress }) => uploadProgress
  );

  readonly isUpload$: Observable<boolean> = this.select(
    ({ isUpload }) => isUpload
  );

  readonly selectedPrefecture$: Observable<string> = this.select(
    ({ selectedPrefecture }) => selectedPrefecture
  );

  readonly cityInfo$: Observable<ISelectedCityInfo[]> = this.select(
    ({ cityInfo }) => cityInfo
  );

  readonly isPageTransitionModalOpen$: Observable<boolean> = this.select(
    ({ isPageTransitionModalOpen }) => isPageTransitionModalOpen
  );

  readonly error$: Observable<string[]> = this.select(({ error }) => error);

  readonly setBasicInfo = this.updater<IKaiinInfo>((state, basicInfo) => {
    return { ...state, basicInfo };
  });

  readonly setKenchikuKaishaInfo = this.updater<ICompanyInfo>(
    (state, kenchikuKaishaInfo) => {
      return { ...state, kenchikuKaishaInfo };
    }
  );

  readonly setKaishaDougaFileName = this.updater<string>(
    (state, kaishaDougaFileName) => ({
      ...state,
      kaishaDougaFileName,
    })
  );

  readonly setKaishaDougaPath = this.updater<string>(
    (state, kaishaDougaPath) => ({
      ...state,
      kaishaDougaPath,
    })
  );

  readonly setDeleteFileList = this.updater<string>((state, deleteFileUrl) => ({
    ...state,
    deleteFileList: [...state.deleteFileList, deleteFileUrl],
  }));

  readonly setKaishaDougaError = this.updater<string>(
    (state, kaishaDougaError) => ({
      ...state,
      kaishaDougaError,
    })
  );

  readonly setUpdatedDate = this.updater<string>((state, updatedDate) => ({
    ...state,
    updatedDate,
  }));

  readonly setKaiinSearchError = this.updater<boolean>(
    (state, kaiinSearchError) => ({
      ...state,
      kaiinSearchError,
    })
  );

  readonly setUploadProgress = this.updater<number>(
    (state, uploadProgress) => ({
      ...state,
      uploadProgress,
    })
  );

  readonly setIsUpload = this.updater<boolean>((state, isUpload) => ({
    ...state,
    isUpload,
  }));

  readonly setSelectedPrefecture = this.updater<string>(
    (state, selectedPrefecture) => ({
      ...state,
      selectedPrefecture,
    })
  );

  readonly setCityInfo = this.updater<ISelectedCityInfo[]>(
    (state, cityInfo) => ({
      ...state,
      cityInfo,
    })
  );

  readonly setCityInfoSelected = this.updater<string[]>((state, cities) => ({
    ...state,
    cityInfo: state.cityInfo.map((cityInfo) => ({
      ...cityInfo,
      isChecked: cities.includes(cityInfo.code) ? true : cityInfo.isChecked,
    })),
  }));

  readonly setIsPageTransitionModalOpen = this.updater<boolean>(
    (state, isPageTransitionModalOpen) => ({
      ...state,
      isPageTransitionModalOpen,
    })
  );

  readonly setError = this.updater<string[]>((state, error) => ({
    ...state,
    error,
  }));

  /**
   * 市区郡情報取得
   */
  readonly getCity = this.effect(
    (
      selectedPrefectureInfo$: Observable<{
        prefCd: string;
        selectedList: string[];
      }>
    ) =>
      selectedPrefectureInfo$.pipe(
        mergeMap((selectedPrefectureInfo) =>
          this.companyEditService
            .getCityInfo(selectedPrefectureInfo.prefCd)
            .pipe(
              tapResponse(
                (response) => {
                  const cityInfo: ISelectedCityInfo[] = response.map((city) => {
                    return {
                      isChecked: false,
                      ...city,
                    };
                  });
                  const allCity: ISelectedCityInfo = {
                    isChecked: false,
                    name: '全域',
                    roman: 'zeniki',
                    code: '000',
                  };
                  this.setCityInfo([allCity, ...cityInfo]);
                  this.setCityInfoSelected(selectedPrefectureInfo.selectedList);
                },
                (e) => {
                  // TODO: エラー処理
                  console.error('想定外エラー発生', e);
                }
              )
            )
        )
      )
  );

  /**
   * 動画アップロード
   */
  readonly uploadVideo = this.effect((file$: Observable<File>) => {
    return file$.pipe(
      withLatestFrom(this.kaishaDougaPath$),
      tap(([file, videoPath]: [File, string]) => {
        this.companyEditService
          .uploadVideo(file)
          .pipe(
            catchError(() => {
              this.setKaishaDougaError(Message.Error.E0022);
              return EMPTY;
            })
          )
          .subscribe({
            next: (response) => {
              if (videoPath) {
                this.deleteVideo();
              }
              this.setUploadProgress(response.progress);
              this.setKaishaDougaFileName(file.name);
              this.setKaishaDougaPath(response.url);
            },
            error: (error) => {
              this.setIsUpload(false);
              this.setKaishaDougaError(Message.Error.E0021);
            },
            complete: () => {
              this.setIsUpload(false);
            },
          });
      })
    );
  });

  /**
   * 画像削除
   */
  readonly deleteImage = this.effect((imageUrl$: Observable<string>) =>
    imageUrl$.pipe(
      tap((imageUrl: string) => {
        this.setDeleteFileList(imageUrl);
      })
    )
  );

  /**
   * 動画削除
   */
  readonly deleteVideo = this.effect((arg$: Observable<void>) =>
    arg$.pipe(
      withLatestFrom(this.kaishaDougaPath$),
      tap(([_, videoPath]) => {
        this.setDeleteFileList(videoPath);
        this.setKaishaDougaFileName('');
        this.setKaishaDougaPath('');
      })
    )
  );

  /**
   * 画像・動画削除
   */
  readonly deleteFile = this.effect((arg$: Observable<void>) => {
    return arg$.pipe(
      withLatestFrom(this.deleteFileList$, this.kaishaDougaPath$),
      mergeMap(([_, deleteList, videoPath]: [void, string[], string]) => {
        if (deleteList.length > 0 || videoPath) {
          return this.companyEditService
            .deleteFile([...deleteList, videoPath])
            .pipe(
              tapResponse(
                (response) => {
                  if ('message' in response) {
                    this.router.navigate(['/']);
                  } else {
                    this.setError([(response as IError).detail]);
                  }
                },
                (e) => {
                  // TODO: エラー処理
                  console.error('想定外エラー発生', e);
                }
              )
            );
        }
        this.router.navigate(['/']);
      })
    );
  });

  /**
   * 建築会社登録
   */
  readonly registerCompany = this.effect(
    (request$: Observable<IRegisterCompanyRequest>) => {
      return request$.pipe(
        tap(() => this.setError([])),
        withLatestFrom(this.kaishaDougaPath$, this.deleteFileList$),
        mergeMap(([request, kaishaDouga, deleteList]) =>
          this.companyEditService
            .registerCompany(request, kaishaDouga, deleteList)
            .pipe(
              tapResponse(
                (response) => {
                  if ('message' in response) {
                    this.router.navigate(['company']);
                  } else {
                    typeof response.detail === 'string'
                      ? this.setError([response.detail])
                      : this.setError(response.detail);
                  }
                },
                (e) => {
                  // TODO: エラー処理
                  console.error('想定外エラー発生', e);
                }
              )
            )
        )
      );
    }
  );
}
