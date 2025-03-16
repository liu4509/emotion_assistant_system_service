import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'solutions',
})
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    comment: '选项内容',
  })
  content: string;

  @Column({
    comment: '是否为最佳答案',
  })
  is_correct: boolean;
}
