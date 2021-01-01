import { 
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export default class Notification {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column('uuid')
  user_id: string;

  @Column({
    default: false
  })
  read: boolean;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}