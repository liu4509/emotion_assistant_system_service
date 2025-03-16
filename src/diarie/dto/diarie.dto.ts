import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiarieDto {
  @IsNotEmpty({ message: '日记内容不能为空' })
  @IsString({ message: '日记内容必须是字符串' })
  content: string;

  @IsNotEmpty({ message: '情绪不能为空' })
  @IsArray({ message: '情绪必须是数组' })
  moodValues: string[];
}

export class UpdateDiarieDto {
  @IsString({ message: '日记内容必须是字符串' })
  content?: string;

  @IsArray({ message: '情绪必须是数组' })
  moodValues?: string[];
}
