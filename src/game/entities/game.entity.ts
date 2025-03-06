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
    name: 'game_url',
    length: 100,
    comment: '游戏链接地址',
  })
  GameUrl: string;

  @Column({
    name: 'title_img',
    length: 100,
    comment: '标题图片',
  })
  titleImg: string;

  @Column({
    length: 100,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'game_categorys',
  })
  categorys: Category[];
}
