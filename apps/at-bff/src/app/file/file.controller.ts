import { MsFileService } from '@bff/microservices';
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';
import { map, of } from 'rxjs';

@Controller('file')
export class FileController {
  constructor(private readonly msFileService: MsFileService) {}
  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const fileUploadedResponse = this.msFileService.uploadFile(
      file.buffer,
      file.originalname
    );
    return fileUploadedResponse.pipe(
      map((data) => {
        if ('message' in data) {
          return {
            data: { code: 200, message: data.message, body: data.body },
          };
        } else {
          return { data: { code: 400, message: data.detail } };
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
