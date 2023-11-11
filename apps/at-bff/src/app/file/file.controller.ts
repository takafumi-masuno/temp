import { MsFileService } from '@bff/microservices';
import { IUploadFileBodyResponse } from '@bff/models';
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BasicResponseType } from '@shared/models';
import { Express } from 'express';
import 'multer';
import { Observable, forkJoin, map, of } from 'rxjs';
import * as sharp from 'sharp';

@Controller('file')
export class FileController {
  constructor(private readonly msFileService: MsFileService) {}
  MAX_FILE_SIZE = 10 * 1024 * 1024;
  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    let fileUploadedResponse: Observable<
      BasicResponseType<IUploadFileBodyResponse>
    >;
    if (file.size > this.MAX_FILE_SIZE) {
      try {
        const { data, info } = await sharp(file.buffer)
          .webp({ lossless: true })
          .toBuffer({ resolveWithObject: true });
        console.log('変換後ファイル情報', info);
        if (info.size > this.MAX_FILE_SIZE) {
          fileUploadedResponse = of({
            detail: `${file.originalname}の画像のサイズがオーバーしています。`,
          });
        } else {
          fileUploadedResponse = this.msFileService.uploadFile(
            data,
            file.originalname.concat('.webp')
          );
        }
      } catch (error) {
        fileUploadedResponse = of({
          detail: '圧縮処理でエラーが発生しました。',
        });
      }
    } else {
      fileUploadedResponse = this.msFileService.uploadFile(
        file.buffer,
        file.originalname
      );
    }

    return forkJoin({ fileUploadedResponse }).pipe(
      map(({ fileUploadedResponse }) => {
        if ('detail' in fileUploadedResponse) {
          return { data: { code: 400, message: fileUploadedResponse.detail } };
        } else {
          return {
            data: {
              code: 200,
              message: fileUploadedResponse.message,
              body: fileUploadedResponse.body,
            },
          };
        }
      })
    );
  }

  @Post('upload-multi-file')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    const mockData = [
      'https://m.media-amazon.com/images/I/61S5wsiSHjL._AC_SY110_.jpg',
      'https://m.media-amazon.com/images/I/71ZMXqrB9XL._AC_SY110_.jpg',
      'https://m.media-amazon.com/images/I/81ku0JFRedL._AC_SY110_.jpg',
      'https://m.media-amazon.com/images/I/81l5YGuBV3L._AC_SY110_.jpg',
      'https://m.media-amazon.com/images/I/51n20MY+0rL._AC_SY145_.jpg',
    ];
    return of({
      data: {
        code: 200,
        message: 'Success',
        body: {
          urlList: mockData.slice(0, files.length),
        },
      },
    });
  }
}
