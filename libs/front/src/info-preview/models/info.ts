export interface Info {
  title: string;
  shousai: string;
  gazou: {
    file: File;
    name: string;
    src: string;
    path: string;
  };
  pdf: {
    file: File;
    path: string;
    name: string;
  };
  juuyouHyouji: number;
  keisaiStartData: string;
  keisaiEndDate: string;
  koukaiJoutai: string;
  previousId?: number;
  nextId?: number;
  updatedDate: string;
}
