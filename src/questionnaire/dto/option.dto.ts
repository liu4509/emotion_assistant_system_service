import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OptionDto {
  @IsNotEmpty({ message: '选项内容不能为空' })
  @IsString({ message: '选项内容必须是字符串' })
  content: string;

  @IsNotEmpty({ message: '选项分值不能为空' })
  @IsNumber({}, { message: '选项分值必须是数字' })
  score: number;
}

export class CreateOptionDto extends OptionDto {}

export class UpdateOptionDto {
  @IsString({ message: '选项内容必须是字符串' })
  content?: string;

  @IsNumber({}, { message: '选项分值必须是数字' })
  score?: number;
}
