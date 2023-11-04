import { MsFileService } from '@bff/microservices';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';
import { map } from 'rxjs';

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
}
