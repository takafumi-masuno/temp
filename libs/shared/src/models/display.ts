export enum DisplayCategory {
  Industries,
  Conditions,
  Hankagai,
  Contents,
  Personal,
  Recommend,
  New,
  Navi,
  Others,
  OtherSearch,
  Neighboring,
  PreviousSearch,
  SearchPrefecture,
  SearchCurrent,
  EstateContents,
}

export class DisplayConstant {
  public static readonly commonCategories = [
    DisplayCategory.Industries,
    DisplayCategory.Conditions,
    DisplayCategory.Hankagai,
    DisplayCategory.Contents,
    DisplayCategory.Personal,
    DisplayCategory.Recommend,
    DisplayCategory.New,
    DisplayCategory.Navi,
    DisplayCategory.Others,
    DisplayCategory.Neighboring,
  ];
  public static readonly workCategories = [
    DisplayCategory.Personal,
    DisplayCategory.New,
    DisplayCategory.Navi,
    DisplayCategory.OtherSearch,
    DisplayCategory.Industries,
    DisplayCategory.Conditions,
    DisplayCategory.Hankagai,
    DisplayCategory.Neighboring,
  ];

  public static readonly categories = {
    common: DisplayConstant.commonCategories,
    work: DisplayConstant.workCategories,
  };
}
