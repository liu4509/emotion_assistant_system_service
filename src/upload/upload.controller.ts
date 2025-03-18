import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('没有上传文件', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.uploadService.uploadImage(file);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: {
            message: error.message || '上传失败',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
