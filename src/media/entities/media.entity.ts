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
    comment: '音视频标题',
  })
  title: string;

  @Column({
    name: 'title_img',
    length: 100,
    comment: '标题图片',
  })
  titleImg: string;

  @Column({
    name: 'play_url',
    length: 200,
    comment: '资源播放地址',
  })
  playUrl: string;

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
    name: 'media_categorys',
  })
  categorys: Category[];
}
