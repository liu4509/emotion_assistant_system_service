import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateClockDto {
  @IsNotEmpty({ message: '图片地址不能为空' })
  @IsString({ message: '图片地址必须是字符串' })
  image: string;

  @IsNotEmpty({ message: '分类不能为空' })
  @IsArray({ message: '分类必须是数组' })
  categoryValues: string[];

  // 用户ID将从请求中获取，不需要在DTO中定义
}

export class UpdateClockDto {
  @IsString({ message: '图片地址必须是字符串' })
  image?: string;

  @IsArray({ message: '分类必须是数组' })
  categoryValues?: string[];
}
