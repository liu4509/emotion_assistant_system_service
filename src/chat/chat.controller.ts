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

@Controller('chats')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  // 初始化
  @Get('init-data')
  async initData() {
    return this.chatService.initData();
  }

  @Get()
  @RequireLogin()
  async findAll(@UserInfo('userId') userId: number) {
    return this.chatService.findAll(userId);
  }

  @Get(':id')
  @RequireLogin()
  async findOne(@Param('id') id: string, @UserInfo('userId') userId: number) {
    return this.chatService.findOne(id, userId);
  }

  @Post()
  @RequireLogin()
  async create(
    @UserInfo('userId') userId: number,
    @Body() createChatDto: CreateChatDto,
  ) {
    return this.chatService.create(userId, createChatDto);
  }

  @Post(':id/title')
  @RequireLogin()
  async updateTitle(
    @Param('id') id: string,
    @UserInfo('userId') userId: number,
    @Body() updateChatDto: UpdateChatDto,
  ) {
    return this.chatService.update(id, userId, updateChatDto);
  }

  @Delete(':id')
  @RequireLogin()
  async remove(@Param('id') id: string, @UserInfo('userId') userId: number) {
    return this.chatService.remove(id, userId);
  }
  // messages service
  @Get(':chatId/messages')
  @RequireLogin()
  async findAllMessages(
    @Param('chatId') chatId: string,
    @UserInfo('userId') userId: number,
  ) {
    return this.messageService.findAll(chatId, userId);
  }

  @Post(':chatId/messages')
  @RequireLogin()
  async createMessage(
    @Param('chatId') chatId: string,
    @UserInfo('userId') userId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.create(chatId, userId, createMessageDto);
  }

  @Post('messages/ai-response')
  @RequireLogin()
  async getAIResponse(
    @UserInfo('userId') userId: number,
    @Body() getAIResponseDto: GetAIResponseDto,
  ) {
    return this.messageService.getAIResponse(userId, getAIResponseDto);
  }
}
