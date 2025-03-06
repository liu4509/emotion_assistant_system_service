import { Optionsi } from 'src/questionnaire/entities/optioni.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'questions',
})
export class Question {
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
  sort: number;

  @ManyToMany(() => Optionsi)
  @JoinTable({
    name: 'question_options',
  })
  options: Optionsi[];
}
