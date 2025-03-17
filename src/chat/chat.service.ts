import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/user/entities/User.entity';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
import { DeepseekService } from './deepseek.config';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

    private deepseekService: DeepseekService,
  ) {}
  // 初始化数据
  async initData() {
    const user = await this.userRepository.findOne({
      where: { username: 'lzb' },
    });
    if (!user) {
      throw new NotFoundException(`username为 ${'lzb'} 的用户未找到`);
    }

    const chat1 = this.chatRepository.create({
      title: '我常常感觉到焦虑怎么办',
      userId: String(user.id),
      user,
      messages: [],
    });
    const chat2 = this.chatRepository.create({
      title: '我很难控制自己的情绪，经常发脾气怎么办',
      userId: String(user.id),
      user,
      messages: [],
    });
    await this.chatRepository.save([chat1, chat2]);
    const messageUser1 = this.messageRepository.create({
      content: '我常常感觉到焦虑怎么办',
      sender: 'user',
      timestamp: new Date(),
      status: 'done',
      chat: chat1,
    });
    const messageUser3 = this.messageRepository.create({
      content: '我很难控制自己的情绪，经常发脾气怎么办',
      sender: 'user',
      timestamp: new Date(),
      status: 'done',
      chat: chat2,
    });

    const messageUser2 = this.messageRepository.create({
      content:
        '焦虑是一种常见的情绪反应，许多人都会经历。以下是一些可能帮助你缓解焦虑的方法：\n\n1. **深呼吸练习**：慢慢吸气数到4，屏住呼吸数到2，然后慢慢呼气数到6。重复几次可以帮助稳定情绪。\n\n2. **正念冥想**：花几分钟专注于当下，观察自己的呼吸和感受，不加判断。\n\n3. **规律运动**：每天30分钟的温和运动可以减轻焦虑症状。\n\n4. **健康饮食**：减少咖啡因和糖的摄入，增加水果、蔬菜和全谷物的摄入。\n\n5. **充足睡眠**：确保每晚有7-9小时的优质睡眠。\n\n6. **寻求专业帮助**：如果焦虑严重影响你的日常生活，考虑咨询心理医生或治疗师。\n\n记住，处理焦虑是一个过程，找到适合你的方法可能需要时间。你愿意分享是什么具体情况引发你的焦虑吗？这样我可以提供更有针对性的建议。',
      sender: 'ai',
      timestamp: new Date(),
      status: 'done',
      chat: chat1,
    });
    const messageUser4 = this.messageRepository.create({
      content:
        '控制情绪尤其是愤怒情绪确实可能很具挑战性。以下是一些可能对你有帮助的策略：\n\n1. **识别触发因素**：了解什么会引发你的愤怒，提前做好准备。\n\n2. **暂停技术**：当你感到情绪开始上升时，给自己10秒钟的冷静期。深呼吸并数到10。\n\n3. **情绪日记**：记录你的情绪波动，帮助识别模式和触发因素。\n\n4. **练习表达技巧**：学习用"我"为主语的表达方式，例如"我感到沮丧"而不是"你让我沮丧"。\n\n5. **寻求专业帮助**：心理治疗师可以教你认知行为技巧来管理情绪。\n\n6. **规律的自我照顾**：确保充足的睡眠、健康饮食和规律运动，这些都会影响情绪稳定性。\n\n你能否分享一下最近一次你难以控制情绪的具体情况？这样我可以提供更具体的建议。',
      sender: 'ai',
      timestamp: new Date(),
      status: 'done',
      chat: chat2,
    });
    await this.messageRepository.save([
      messageUser1,
      messageUser2,
      messageUser3,
      messageUser4,
    ]);
    chat1.messages.push(messageUser1, messageUser2);
    chat2.messages.push(messageUser3, messageUser4);

    return this.chatRepository.save([chat1, chat2]);
  }

  async findAll(userId: number): Promise<Chat[]> {
    return this.chatRepository.find({
      where: { userId: String(userId) },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id, userId: String(userId) },
      relations: ['messages'],
      order: { messages: { timestamp: 'ASC' } },
    });

    if (!chat) {
      throw new NotFoundException(`ID为 ${id} 的对话未找到或不属于该用户`);
    }

    return chat;
  }

  async create(userId: number, createChatDto: CreateChatDto): Promise<Chat> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`ID为 ${userId} 的用户未找到`);
    }

    // 如果没有提供标题，使用默认标题
    const title = createChatDto.title || '新对话';

    const chat = this.chatRepository.create({
      title,
      userId: String(userId),
      user,
      messages: [],
    });

    return this.chatRepository.save(chat);
  }

  async update(
    id: string,
    userId: number,
    updateChatDto: UpdateChatDto,
  ): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id, userId: String(userId) },
    });

    if (!chat) {
      throw new NotFoundException(`ID为 ${id} 的对话未找到或不属于该用户`);
    }

    chat.title = updateChatDto.title;
    return this.chatRepository.save(chat);
  }

  async remove(id: string, userId: number): Promise<void> {
    const chat = await this.chatRepository.findOne({
      where: { id, userId: String(userId) },
    });

    if (!chat) {
      throw new NotFoundException(`ID为 ${id} 的对话未找到或不属于该用户`);
    }

    await this.chatRepository.remove(chat);
  }

  async updateChatTitle(chatId: string, content: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
    });

    if (!chat) {
      throw new NotFoundException(`ID为 ${chatId} 的对话未找到`);
    }

    // 如果是第一条消息且标题是默认的，则生成新标题
    if (chat.title === '新对话') {
      chat.title = await this.deepseekService.generateChatTitle(content);
      return this.chatRepository.save(chat);
    }

    return chat;
  }
}
