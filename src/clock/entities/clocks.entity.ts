import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/User.entity';
import { Category } from 'src/attraction/entities/category.entity';

@Entity({
  name: 'clocks',
})
export class Clock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    comment: '打卡图片地址',
  })
  image: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => User, (user) => user.clocks)
  user: User;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'clock_categorys',
  })
  categorys: Category[];
}
