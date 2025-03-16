import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOptionDto, UpdateOptionDto } from './option.dto';

export class CreateQuestionDto {
  @IsNotEmpty({ message: '问题内容不能为空' })
  @IsString({ message: '问题内容必须是字符串' })
  content: string;

  @IsArray({ message: '选项必须是数组' })
  @ArrayMinSize(2, { message: '至少需要2个选项' })
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}

export class UpdateQuestionDto {
  @IsString({ message: '问题内容必须是字符串' })
  content?: string;

  @IsArray({ message: '选项必须是数组' })
  @ValidateNested({ each: true })
  @Type(() => UpdateOptionDto)
  options?: UpdateOptionDto[];
}
