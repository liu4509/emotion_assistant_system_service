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

  /**
   * 通用文件上传接口 - 支持图片、音频、视频等文件
   * @param file 上传的文件
   * @returns 上传后的URL
   */
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('没有上传文件', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.uploadService.uploadToQiniu(file);
      // return {
      //   success: true,
      //   url,
      // };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          status:
            error instanceof HttpException
              ? error.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR,
          error: {
            message: error.message || '上传失败',
          },
        },
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
