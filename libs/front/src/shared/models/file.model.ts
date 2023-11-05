export interface IUploadFileBodyResponse {
  url: string;
}

export interface FileData {
  fileName: string;
  fileSrc: string | ArrayBuffer;
}

export interface IChangeFileData {
  index: number;
  url?: string;
}
