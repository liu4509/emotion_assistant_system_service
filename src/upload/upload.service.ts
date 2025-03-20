import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as qiniu from 'qiniu';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly qiniuConfig: {
    accessKey: string;
    secretKey: string;
    bucket: string;
    domain: string;
  };

  constructor(private readonly configService: ConfigService) {
    this.qiniuConfig = {
      accessKey: this.configService.get('QINIU_ACCESS_KEY'),
      secretKey: this.configService.get('QINIU_SECRET_KEY'),
      bucket: this.configService.get('QINIU_BUCKET'),
      domain: this.configService.get('QINIU_DOMAIN'),
    };

    // 初始化时验证七牛云配置
    this.validateQiniuConfig();
  }

  private validateQiniuConfig() {
    const { accessKey, secretKey, bucket, domain } = this.qiniuConfig;
    if (!accessKey || !secretKey || !bucket || !domain) {
      this.logger.error('七牛云配置不完整');
      throw new Error('七牛云配置不完整');
    }
  }

  /**
   * 上传文件到图床（原有方法）
   * @param file 上传的文件
   * @returns 上传后的URL
   */
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

  /**
   * 生成随机文件名
   * @param originalFilename 原始文件名
   * @returns 随机生成的文件名
   */
  private generateRandomFilename(originalFilename: string): string {
    const ext = path.extname(originalFilename);
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    return `${timestamp}-${randomString}${ext}`;
  }

  /**
   * 获取文件类型分类
   * @param mimetype 文件的MIME类型
   * @returns 文件类型分类
   */
  private getFileCategory(mimetype: string): string {
    if (mimetype.startsWith('image/')) {
      return 'images';
    } else if (mimetype.startsWith('audio/')) {
      return 'audios';
    } else if (mimetype.startsWith('video/')) {
      return 'videos';
    } else {
      return 'files';
    }
  }

  /**
   * 验证文件类型是否允许上传
   * @param mimetype 文件的MIME类型
   * @returns 是否允许上传
   */
  private isAllowedFileType(mimetype: string): boolean {
    // 允许的文件类型
    const allowedTypes = [
      // 图片
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      // 音频
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/mp4',
      'audio/webm',
      // 视频
      'video/mp4',
      'video/webm',
      'video/ogg',
    ];

    return allowedTypes.includes(mimetype);
  }

  /**
   * 上传文件到七牛云
   * @param file 上传的文件
   * @returns 上传后的完整URL
   */
  async uploadToQiniu(file: Express.Multer.File): Promise<string> {
    try {
      // 验证文件是否存在
      if (!file || !file.buffer) {
        throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST);
      }

      // 验证文件类型
      if (!this.isAllowedFileType(file.mimetype)) {
        throw new HttpException('不支持的文件类型', HttpStatus.BAD_REQUEST);
      }

      // 验证文件大小（限制为10MB）
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new HttpException(
          '文件大小超过限制（最大10MB）',
          HttpStatus.BAD_REQUEST,
        );
      }

      // 获取文件分类和生成随机文件名
      const category = this.getFileCategory(file.mimetype);
      const randomFilename = this.generateRandomFilename(file.originalname);

      // 构建七牛云文件路径 - 格式：category/年月/随机文件名
      const date = new Date();
      const yearMonth = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      const key = `${category}/${yearMonth}/${randomFilename}`;

      // 配置七牛云上传凭证
      const mac = new qiniu.auth.digest.Mac(
        this.qiniuConfig.accessKey,
        this.qiniuConfig.secretKey,
      );

      const putPolicy = new qiniu.rs.PutPolicy({
        scope: this.qiniuConfig.bucket,
      });

      const uploadToken = putPolicy.uploadToken(mac);

      // 配置上传
      const config = new qiniu.conf.Config();
      // 空间对应的机房 - 自动判断
      config.zone = qiniu.zone.Zone_z0;

      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();

      // 执行上传
      return new Promise((resolve, reject) => {
        formUploader.put(
          uploadToken,
          key,
          file.buffer,
          putExtra,
          (err, body, info) => {
            if (err) {
              this.logger.error(`七牛云上传错误: ${err.message}`);
              return reject(new Error('文件上传失败'));
            }

            if (info.statusCode === 200) {
              // 上传成功，返回完整URL
              const fullUrl = `${this.qiniuConfig.domain}/${key}`;
              this.logger.log(`文件上传成功: ${fullUrl}`);
              return resolve(fullUrl);
            } else {
              this.logger.error(
                `七牛云上传返回非200状态: ${info.statusCode}, ${JSON.stringify(body)}`,
              );
              return reject(new Error('文件上传失败'));
            }
          },
        );
      });
    } catch (error) {
      this.logger.error(`上传到七牛云出错: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || '文件上传失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
