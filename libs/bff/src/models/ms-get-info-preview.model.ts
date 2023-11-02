export type GetInfoPreviewRequest = {
  oshiraseId: number;
};

export type GetInfoPreviewResponse<T = number | string> = {
  code: number;
  message: string;
  info?: {
    title: string;
    shousai: string;
    gazou: {
      file: File;
      path: string;
      src: string;
      name: string;
    };
    pdf: {
      file: File;
      path: string;
      name: string;
    };
    juuyouHyouji: number;
    keisaiStartDate: string;
    keisaiEndDate: string;
    koukaiJoutai: T;
    previousId?: number;
    nextId?: number;
    updatedDate: string;
  };
};
