import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Problem } from './problems.entity';

@Entity({
  name: 'scenarios',
})
export class Scenario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
    comment: '情绪调节场景标题',
  })
  title: string;

  @Column({
    length: 500,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Problem)
  @JoinTable({
    name: 'scenario_problems',
  })
  questions: Problem[];
}
