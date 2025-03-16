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
    length: 500,
    comment: '景点描述',
  })
  details: string;

  @Column({
    length: 100,
    comment: '标题图片',
  })
  image: string;

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
