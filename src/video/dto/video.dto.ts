import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty({ message: '视频标题不能为空' })
  @IsString({ message: '视频标题必须是字符串' })
  title: string;

  @IsNotEmpty({ message: '视频链接不能为空' })
  @IsUrl({}, { message: '视频链接必须是有效的URL' })
  url: string;

  @IsNotEmpty({ message: '封面图片不能为空' })
  @IsString({ message: '封面图片必须是字符串' })
  cover: string;

  @IsNotEmpty({ message: '描述不能为空' })
  @IsString({ message: '描述必须是字符串' })
  description: string;

  @IsNotEmpty({ message: '分类不能为空' })
  @IsArray({ message: '分类必须是数组' })
  categoryValues: string[];
}

export class UpdateVideoDto {
  @IsString({ message: '视频标题必须是字符串' })
  title?: string;

  @IsUrl({}, { message: '视频链接必须是有效的URL' })
  url?: string;

  @IsString({ message: '封面图片必须是字符串' })
  cover?: string;

  @IsString({ message: '描述必须是字符串' })
  description?: string;

  @IsArray({ message: '分类必须是数组' })
  categoryValues?: string[];
}
