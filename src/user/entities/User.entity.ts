import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './Role.entity';
import { Diarie } from 'src/diarie/entities/diarie.entity';
import { Clock } from 'src/clock/entities/clocks.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    length: 50,
    comment: '邮箱',
  })
  email: string;

  @Column({
    name: 'head_pic',
    length: 100,
    comment: '头像',
    nullable: true,
  })
  headPic: string;

  @Column({
    name: 'is_admin',
    comment: '是否管理员',
    default: false,
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  // TODO: 中间表 user_roles
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];

  @OneToMany(() => Diarie, (diaries) => diaries.user)
  diaries: Diarie[];

  @OneToMany(() => Clock, (clocks) => clocks.user)
  clocks: Clock[];
}
