import { Question } from 'src/questionnaire/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'questionnaires',
})
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
    comment: '问卷标题',
  })
  title: string;

  @Column({
    length: 200,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Question)
  @JoinTable({
    name: 'questionnaire_questions',
  })
  questions: Question[];
}
