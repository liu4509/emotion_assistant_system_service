import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty({ message: '游戏标题不能为空' })
  @IsString({ message: '游戏标题必须是字符串' })
  title: string;

  @IsNotEmpty({ message: '游戏链接不能为空' })
  @IsUrl({}, { message: '游戏链接必须是有效的URL' })
  url: string;

  @IsNotEmpty({ message: '图片地址不能为空' })
  @IsString({ message: '图片地址必须是字符串' })
  image: string;

  @IsNotEmpty({ message: '描述不能为空' })
  @IsString({ message: '描述必须是字符串' })
  description: string;

  @IsNotEmpty({ message: '分类不能为空' })
  @IsArray({ message: '分类必须是数组' })
  categoryValues: string[];
}

export class UpdateGameDto {
  @IsString({ message: '游戏标题必须是字符串' })
  title?: string;

  @IsUrl({}, { message: '游戏链接必须是有效的URL' })
  url?: string;

  @IsString({ message: '图片地址必须是字符串' })
  image?: string;

  @IsString({ message: '描述必须是字符串' })
  description?: string;

  @IsArray({ message: '分类必须是数组' })
  categoryValues?: string[];
}
