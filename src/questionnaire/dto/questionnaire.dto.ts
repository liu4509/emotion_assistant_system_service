import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';

export class CreateQuestionnaireDto {
  @IsNotEmpty({ message: '问卷标题不能为空' })
  @IsString({ message: '问卷标题必须是字符串' })
  title: string;

  @IsNotEmpty({ message: '问卷描述不能为空' })
  @IsString({ message: '问卷描述必须是字符串' })
  description: string;

  @IsArray({ message: '问题必须是数组' })
  @ArrayMinSize(1, { message: '至少需要1个问题' })
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

export class UpdateQuestionnaireDto {
  @IsString({ message: '问卷标题必须是字符串' })
  title?: string;

  @IsString({ message: '问卷描述必须是字符串' })
  description?: string;

  @IsArray({ message: '问题必须是数组' })
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions?: UpdateQuestionDto[];
}
