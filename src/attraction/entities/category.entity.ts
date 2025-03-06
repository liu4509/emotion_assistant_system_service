import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'categorys',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    comment: '情绪分类值',
  })
  content: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
