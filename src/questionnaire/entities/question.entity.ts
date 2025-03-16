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
    length: 200,
    comment: '问卷问题内容',
  })
  content: string;

  @ManyToMany(() => Optionsi)
  @JoinTable({
    name: 'question_options',
  })
  options: Optionsi[];
}
