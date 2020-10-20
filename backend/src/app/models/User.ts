import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

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

  @BeforeInsert()
  async encryptPassword() {
    if (this.password_hash) {
      this.password_hash = await bcrypt.hash(this.password_hash, 8);
    }
  }
}