import { Category } from 'src/attraction/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'videos',
})
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    comment: '视频标题',
  })
  title: string;

  @Column({
    length: 200,
    comment: '资源播放地址',
  })
  url: string;

  @Column({
    length: 100,
    comment: '标题图片',
  })
  cover: string;

  @Column({
    length: 500,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'video_categorys',
  })
  categorys: Category[];
}
