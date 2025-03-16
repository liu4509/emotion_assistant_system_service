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
  name: 'articles',
})
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '标题',
  })
  title: string;

  @Column({
    length: 10,
    comment: '内容',
  })
  content: string;

  @Column({
    length: 100,
    comment: '标题图片',
  })
  cover: string;

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
    name: 'article_categorys',
  })
  categorys: Category[];
}
