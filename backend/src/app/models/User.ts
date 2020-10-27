import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';

import Orphanage from './Orphanage';

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

  @BeforeInsert()
  async encryptPassword(password: string | null) {
    if (password) {
      this.password_hash = await bcrypt.hash(password, 8);

      password = null;
    }
  }

  comparePassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }
}