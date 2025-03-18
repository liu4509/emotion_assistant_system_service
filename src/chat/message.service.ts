import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Chat } from './entities/chat.entity';
import { CreateMessageDto, GetAIResponseDto } from './dto/message.dto';
import { DeepseekService } from './deepseek.config';
import { ChatService } from './chat.service';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private deepseekService: DeepseekService,
    private chatService: ChatService,
  ) {}

  async findAll(chatId: string, userId: number): Promise<Message[]> {
    // 验证聊天是否属于该用户
    const chat = await this.chatRepository.findOne({
      where: { id: chatId, userId: String(userId) },
    });

    if (!chat) {
      throw new NotFoundException(`ID为 ${chatId} 的对话未找到或不属于该用户`);
    }

    return this.messageRepository.find({
      where: { chatId },
      order: { timestamp: 'ASC' },
    });
  }

  async create(
    chatId: string,
    userId: number,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    // 验证聊天是否属于该用户
    const chat = await this.chatRepository.findOne({
      where: { id: chatId, userId: String(userId) },
    });

    if (!chat) {
      throw new NotFoundException(`ID为 ${chatId} 的对话未找到或不属于该用户`);
    }

    const message = this.messageRepository.create({
      ...createMessageDto,
      chatId,
      chat,
    });

    const savedMessage = await this.messageRepository.save(message);

    // 如果是用户发送的第一条消息，更新聊天标题
    if (createMessageDto.sender === 'user') {
      const messagesCount = await this.messageRepository.count({
        where: { chatId },
      });

      if (messagesCount === 1) {
        await this.chatService.updateChatTitle(
          chatId,
          createMessageDto.content,
        );
      }
    }

    return savedMessage;
  }

  async getAIResponse(
    userId: number,
    getAIResponseDto: GetAIResponseDto,
  ): Promise<Message> {
    const { content, chatId } = getAIResponseDto;

    // 验证聊天是否属于该用户
    const chat = await this.chatRepository.findOne({
      where: { id: chatId, userId: String(userId) },
    });

    if (!chat) {
      throw new NotFoundException(`ID为 ${chatId} 的对话未找到或不属于该用户`);
    }

    // 创建用户消息
    const userMessage = this.messageRepository.create({
      content,
      sender: 'user',
      chatId,
      chat,
    });
    await this.messageRepository.save(userMessage);

    // 创建AI响应（状态为loading）
    const aiMessage = this.messageRepository.create({
      content: '正在思考...',
      sender: 'ai',
      status: 'loading',
      chatId,
      chat,
    });
    const savedAiMessage = await this.messageRepository.save(aiMessage);

    try {
      this.logger.log(`开始请求DeepSeek API，用户问题: ${content}`);
      // 获取AI响应
      const aiResponse = await this.deepseekService.generateResponse(content);
      this.logger.log(
        `DeepSeek API响应成功: ${aiResponse.substring(0, 50)}...`,
      );

      // 更新AI消息
      savedAiMessage.content = aiResponse;
      savedAiMessage.status = 'done';
      return this.messageRepository.save(savedAiMessage);
    } catch (error) {
      // 记录详细错误信息
      this.logger.error(`DeepSeek API错误: ${error.message}`);
      if (error.response) {
        this.logger.error(
          `错误响应数据: ${JSON.stringify(error.response.data)}`,
        );
      }

      // 如果出错，更新状态
      savedAiMessage.content =
        '抱歉，我无法回答这个问题。请检查服务器日志获取详细错误信息。';
      savedAiMessage.status = 'error';
      return this.messageRepository.save(savedAiMessage);
    }
  }
}
