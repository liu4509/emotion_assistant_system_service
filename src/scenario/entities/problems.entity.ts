import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Solution } from './solution.entity';

@Entity({
  name: 'problems',
})
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '问卷问题内容',
  })
  content: string;

  @Column({
    comment: '问题顺序1-5',
  })
  order: number;

  @ManyToMany(() => Solution)
  @JoinTable({
    name: 'problem_solutions',
  })
  options: Solution[];
}
