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
  name: 'medias',
})
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '音频标题',
  })
  title: string;

  @Column({
    length: 50,
    comment: '艺术家',
  })
  artist: string;

  @Column({
    length: 100,
    comment: '标题图片',
  })
  cover: string;

  @Column({
    length: 500,
    comment: '资源播放地址',
  })
  url: string;

  @Column({
    comment: '时长(秒)',
  })
  duration: number;

  @Column({
    length: 200,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'media_categorys',
  })
  categorys: Category[];
}
