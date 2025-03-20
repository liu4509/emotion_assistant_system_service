import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
import { CreateMessageDto, GetAIResponseDto } from './dto/message.dto';
import { RequireLogin, UserInfo } from 'src/decorator/custom.decorator';
import { DeepseekService } from './deepseek.config';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly deepseekService: DeepseekService,
  ) {}

  @Get('test-deepseek')
  async testDeepseek() {
    try {
      const response =
        await this.deepseekService.generateResponse(
          '你好，请简单介绍一下你自己',
        );
      return {
        success: true,
        message: '测试成功',
        response,
      };
    } catch (error) {
      return {
        success: false,
        message: '测试失败',
        error: error.message,
      };
    }
  }

  // 初始化
  @Get('init-data')
  async initData() {
    return await this.chatService.initData();
  }

  @Get()
  @RequireLogin()
  async findAll(@UserInfo('userId') userId: number) {
    return await this.chatService.findAll(userId);
  }

  @Get(':id')
  @RequireLogin()
  async findOne(@Param('id') id: string, @UserInfo('userId') userId: number) {
    return await this.chatService.findOne(id, userId);
  }

  @Post()
  @RequireLogin()
  async create(
    @UserInfo('userId') userId: number,
    @Body() createChatDto: CreateChatDto,
  ) {
    return await this.chatService.create(userId, createChatDto);
  }

  @Post(':id/title')
  @RequireLogin()
  async updateTitle(
    @Param('id') id: string,
    @UserInfo('userId') userId: number,
    @Body() updateChatDto: UpdateChatDto,
  ) {
    await this.chatService.update(id, userId, updateChatDto);
    return '更新成功';
  }

  @Delete(':id')
  @RequireLogin()
  async remove(@Param('id') id: string, @UserInfo('userId') userId: number) {
    await this.chatService.remove(id, userId);
    return '删除成功';
  }
  // messages service
  @Get(':chatId/messages')
  @RequireLogin()
  async findAllMessages(
    @Param('chatId') chatId: string,
    @UserInfo('userId') userId: number,
  ) {
    return await this.messageService.findAll(chatId, userId);
  }

  @Post(':chatId/messages')
  @RequireLogin()
  async createMessage(
    @Param('chatId') chatId: string,
    @UserInfo('userId') userId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return await this.messageService.create(chatId, userId, createMessageDto);
  }

  @Post('messages/ai-response')
  @RequireLogin()
  async getAIResponse(
    @UserInfo('userId') userId: number,
    @Body() getAIResponseDto: GetAIResponseDto,
  ) {
    return await this.messageService.getAIResponse(userId, getAIResponseDto);
  }
}
