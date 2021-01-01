import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('reset-password')
export default class ResetPassword {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  token: string;

  @Column()
  expires_on: Date;

  @Column('boolean')
  was_used: boolean;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User, user => user.reset_password)
  @JoinColumn({ name: 'user_id' })
  user: User;
}