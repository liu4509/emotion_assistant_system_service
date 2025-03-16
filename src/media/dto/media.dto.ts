import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty({ message: '音频标题不能为空' })
  @IsString({ message: '音频标题必须是字符串' })
  title: string;

  @IsNotEmpty({ message: '艺术家不能为空' })
  @IsString({ message: '艺术家必须是字符串' })
  artist: string;

  @IsNotEmpty({ message: '封面图片不能为空' })
  @IsString({ message: '封面图片必须是字符串' })
  cover: string;

  @IsNotEmpty({ message: '音频链接不能为空' })
  @IsUrl({}, { message: '音频链接必须是有效的URL' })
  url: string;

  @IsNotEmpty({ message: '时长不能为空' })
  @IsNumber({}, { message: '时长必须是数字' })
  duration: number;

  @IsNotEmpty({ message: '描述不能为空' })
  @IsString({ message: '描述必须是字符串' })
  description: string;

  @IsNotEmpty({ message: '分类不能为空' })
  @IsArray({ message: '分类必须是数组' })
  categoryValues: string[];
}

export class UpdateMediaDto {
  @IsString({ message: '音频标题必须是字符串' })
  title?: string;

  @IsString({ message: '艺术家必须是字符串' })
  artist?: string;

  @IsString({ message: '封面图片必须是字符串' })
  cover?: string;

  @IsUrl({}, { message: '音频链接必须是有效的URL' })
  url?: string;

  @IsNumber({}, { message: '时长必须是数字' })
  duration?: number;

  @IsString({ message: '描述必须是字符串' })
  description?: string;

  @IsArray({ message: '分类必须是数组' })
  categoryValues?: string[];
}
