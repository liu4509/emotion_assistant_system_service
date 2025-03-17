import { Chat } from 'src/chat/entities/chat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column({ length: 10 })
  sender: string; // 'user' 或 'ai'

  @CreateDateColumn()
  timestamp: Date;

  @Column({ length: 20, default: 'done' })
  status: string; // 'done' 或 'loading'

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat: Chat;

  @Column()
  chatId: string;
}
