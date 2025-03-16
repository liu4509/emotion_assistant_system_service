import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateSolutionDto, UpdateSolutionDto } from './solution.dto';

export class CreateProblemDto {
  @IsNotEmpty({ message: '问题内容不能为空' })
  @IsString({ message: '问题内容必须是字符串' })
  content: string;

  @IsNotEmpty({ message: '问题顺序不能为空' })
  @IsInt({ message: '问题顺序必须是整数' })
  @Min(1, { message: '问题顺序最小为1' })
  @Max(5, { message: '问题顺序最大为5' })
  order: number;

  @IsArray({ message: '解决方案必须是数组' })
  @ArrayMinSize(2, { message: '至少需要2个解决方案' })
  @ValidateNested({ each: true })
  @Type(() => CreateSolutionDto)
  options: CreateSolutionDto[];
}

export class UpdateProblemDto {
  @IsString({ message: '问题内容必须是字符串' })
  content?: string;

  @IsInt({ message: '问题顺序必须是整数' })
  @Min(1, { message: '问题顺序最小为1' })
  @Max(5, { message: '问题顺序最大为5' })
  order?: number;

  @IsArray({ message: '解决方案必须是数组' })
  @ValidateNested({ each: true })
  @Type(() => UpdateSolutionDto)
  options?: UpdateSolutionDto[];
}
