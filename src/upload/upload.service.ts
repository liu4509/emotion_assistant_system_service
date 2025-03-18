import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      // 创建FormData
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      // 上传到图床
      const response = await axios.post(
        this.configService.get('img_api_url'),
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get('img_api_key')}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status) {
        return response.data.data;
      } else {
        throw new Error(response.data.error?.message || '上传失败');
      }
    } catch (error) {
      throw new Error(error.message || '图片处理失败');
    }
  }
}
