import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mood } from './mood.entity';
import { User } from 'src/user/entities/User.entity';

@Entity({
  name: 'diaries',
})
export class Diarie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
    comment: '日记内容',
  })
  content: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => User, (user) => user.diaries)
  user: User;

  @ManyToMany(() => Mood)
  @JoinTable({
    name: 'diaries_moods',
  })
  moods: Mood[];
}
