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
    comment: '情绪中文值',
  })
  label: string;

  @Column({
    length: 20,
    comment: '情绪 value',
  })
  value: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
