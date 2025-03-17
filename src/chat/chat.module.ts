import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/User.entity';
import { DeepseekService } from './deepseek.config';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, User])],
  controllers: [ChatController],
  providers: [ChatService, MessageService, DeepseekService],
})
export class ChatModule {}
