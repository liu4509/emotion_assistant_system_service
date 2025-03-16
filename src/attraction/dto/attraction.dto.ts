import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateAttractionDto {
  @IsNotEmpty({
    message: '景点名称不能为空',
  })
  @IsString({
    message: '景点名称必须是字符串',
  })
  title: string;
  @IsNotEmpty({
    message: '景点详情不能为空',
  })
  @IsString({
    message: '景点详情必须是字符串',
  })
  details: string;
  @IsNotEmpty({
    message: '景点图片不能为空',
  })
  image: string;
  @IsNotEmpty({
    message: '景点分类不能为空',
  })
  @IsArray({
    message: '景点分类必须是数组',
  })
  categoryValues: string[];
}

export class UpdateAttractionDto {
  @IsString({
    message: '景点名称必须是字符串',
  })
  title?: string;
  @IsString({
    message: '景点详情必须是字符串',
  })
  details?: string;
  @IsString({
    message: '景点图片必须是字符串',
  })
  image?: string;
  @IsArray({
    message: '景点分类必须是数组',
  })
  categoryValues?: string[];
}
