import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateProblemDto, UpdateProblemDto } from './problem.dto';

export class CreateScenarioDto {
  @IsNotEmpty({ message: '场景标题不能为空' })
  @IsString({ message: '场景标题必须是字符串' })
  title: string;

  @IsNotEmpty({ message: '场景描述不能为空' })
  @IsString({ message: '场景描述必须是字符串' })
  description: string;

  @IsArray({ message: '问题必须是数组' })
  @ArrayMinSize(1, { message: '至少需要1个问题' })
  @ValidateNested({ each: true })
  @Type(() => CreateProblemDto)
  questions: CreateProblemDto[];
}

export class UpdateScenarioDto {
  @IsString({ message: '场景标题必须是字符串' })
  title?: string;

  @IsString({ message: '场景描述必须是字符串' })
  description?: string;

  @IsArray({ message: '问题必须是数组' })
  @ValidateNested({ each: true })
  @Type(() => UpdateProblemDto)
  questions?: UpdateProblemDto[];
}
