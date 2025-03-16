import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'options',
})
export class Optionsi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    comment: '问卷选项内容',
  })
  content: string;

  @Column({
    comment: '选项对应分值',
  })
  score: number;
}
