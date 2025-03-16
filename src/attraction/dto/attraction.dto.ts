import { IsNotEmpty } from 'class-validator';

export class CreateAttractionDto {
  @IsNotEmpty({
    message: '景点名称不能为空',
  })
  title: string;
  @IsNotEmpty({
    message: '景点详情不能为空',
  })
  details: string;
  @IsNotEmpty({
    message: '景点图片不能为空',
  })
  image: string;
  @IsNotEmpty({
    message: '景点分类不能为空',
  })
  categoryValues: string[];
}

export class UpdateAttractionDto {
  title?: string;
  details?: string;
  image?: string;
  categoryValues?: string[];
}
