import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SolutionDto {
  @IsNotEmpty({ message: '解决方案内容不能为空' })
  @IsString({ message: '解决方案内容必须是字符串' })
  content: string;

  @IsNotEmpty({ message: '是否为最佳答案不能为空' })
  @IsBoolean({ message: '是否为最佳答案必须是布尔值' })
  is_correct: boolean;
}

export class CreateSolutionDto extends SolutionDto {}

export class UpdateSolutionDto {
  @IsString({ message: '解决方案内容必须是字符串' })
  content?: string;

  @IsBoolean({ message: '是否为最佳答案必须是布尔值' })
  is_correct?: boolean;
}
