import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/User.entity';

@Entity({
  name: 'clocks',
})
export class Clock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'img_url',
    length: 100,
    comment: '打卡图片地址',
  })
  imgUrl: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => User, (user) => user.clocks)
  user: User;
}
