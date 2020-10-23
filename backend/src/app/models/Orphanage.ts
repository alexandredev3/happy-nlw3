import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, RelationId, JoinTable, BaseEntity } from 'typeorm';
// OneToMany: Relacionamento de um orfanato para varias imagens.

import Image from './Image';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  isPending: boolean;

  @Column()
  whatsapp: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.orphanages)
  @JoinColumn({ name: 'user_id' })
  users: User;

  // precisamos fazer o relacionamento contrario.
  // image.orphanage e a coluna que tem la no model Image.
  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update'] // cascade = fazer algo automatico.
  })
  @JoinColumn({ name: 'orphanage_id' }) // Esse JoinColumn não e obrigatorio.
  images: Image[] // o tipo dele e uma array de imagens
}