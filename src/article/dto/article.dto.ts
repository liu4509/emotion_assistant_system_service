import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: '文章标题不能为空' })
  @IsString({ message: '文章标题必须是字符串' })
  title: string;

  @IsNotEmpty({ message: '文章内容不能为空' })
  @IsString({ message: '文章内容必须是字符串' })
  content: string;

  @IsNotEmpty({ message: '封面图片不能为空' })
  @IsString({ message: '封面图片必须是字符串' })
  cover: string;

  @IsNotEmpty({ message: '文章描述不能为空' })
  @IsString({ message: '文章描述必须是字符串' })
  description: string;

  @IsNotEmpty({ message: '分类不能为空' })
  @IsArray({ message: '分类必须是数组' })
  categoryValues: string[];
}

export class UpdateArticleDto {
  @IsString({ message: '文章标题必须是字符串' })
  title?: string;

  @IsString({ message: '文章内容必须是字符串' })
  content?: string;

  @IsString({ message: '封面图片必须是字符串' })
  cover?: string;

  @IsString({ message: '文章描述必须是字符串' })
  description?: string;

  @IsArray({ message: '分类必须是数组' })
  categoryValues?: string[];
}
