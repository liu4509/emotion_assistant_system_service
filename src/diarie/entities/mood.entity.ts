import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'moods',
})
export class Mood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    comment: '情绪 value',
  })
  value: string;

  @Column({
    length: 20,
    comment: '情绪 中文',
  })
  label: string;

  @Column({
    comment: '对应分值',
  })
  score: number;
}
