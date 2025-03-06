import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity({
  name: 'attractions',
})
export class Attraction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '景点标题',
  })
  title: string;

  @Column({
    length: 50,
    comment: '景点描述',
  })
  description: string;

  @Column({
    name: 'title_img',
    length: 100,
    comment: '标题图片',
  })
  titleImg: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'attraction_categorys',
  })
  categorys: Category[];
}
