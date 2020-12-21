import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('reset-password')
export default class ResetPassword {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  expires_on: Date;

  @Column()
  was_used: boolean;

  @Column()
  user_id: number;

  @OneToOne(() => User, user => user.reset_password)
  @JoinColumn({ name: 'user_id' })
  user: User;
}