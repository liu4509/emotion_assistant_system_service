import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'moods',
})
export class Mood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    comment: '情绪名',
  })
  name: string;

  @Column({
    comment: '对应分值',
  })
  score: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
