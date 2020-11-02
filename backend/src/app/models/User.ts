import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinColumn,
  OneToOne
} from 'typeorm';
import bcrypt from 'bcryptjs';

import Orphanage from './Orphanage';
import ResetPassword from './ResetPassword';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isAdmin: boolean;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @OneToMany(() => Orphanage, orphanage => orphanage.users, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'user_id' })
  orphanages: Orphanage[];

  @OneToOne(() => ResetPassword, reset_password => reset_password.user, {
    cascade: ['insert', 'update']
  })
  reset_password: ResetPassword;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password_hash) {
      this.password_hash = await bcrypt.hash(this.password_hash, 8);
    }
  }

  comparePassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }
}