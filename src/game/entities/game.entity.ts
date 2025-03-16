import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from 'src/attraction/entities/category.entity';

@Entity({
  name: 'games',
})
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '游戏标题',
  })
  title: string;

  @Column({
    length: 100,
    comment: '游戏链接地址',
  })
  url: string;

  @Column({
    length: 100,
    comment: '标题图片',
  })
  image: string;

  @Column({
    length: 100,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
  //TODO: vo 数据转发时 数组扁平化 名字改为category 需不需要扁平看结构
  @ManyToMany(() => Category)
  @JoinTable({
    name: 'game_categorys',
  })
  categorys: Category[];
}
