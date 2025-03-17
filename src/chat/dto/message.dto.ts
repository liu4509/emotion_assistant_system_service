import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty({ message: '消息内容不能为空' })
  @IsString({ message: '消息内容必须是字符串' })
  content: string;

  @IsNotEmpty({ message: '发送者不能为空' })
  @IsEnum(['user', 'ai'], { message: '发送者必须是 user 或 ai' })
  sender: string;

  @IsOptional()
  @IsString({ message: '状态必须是字符串' })
  status?: string;
}

export class GetAIResponseDto {
  @IsNotEmpty({ message: '消息内容不能为空' })
  @IsString({ message: '消息内容必须是字符串' })
  content: string;

  @IsNotEmpty({ message: '聊天ID不能为空' })
  @IsUUID('4', { message: '聊天ID必须是有效的UUID' })
  chatId: string;
}
