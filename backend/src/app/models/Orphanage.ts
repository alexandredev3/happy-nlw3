import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, RelationId, JoinTable, BaseEntity } from 'typeorm';
// OneToMany: Relacionamento de um orfanato para varias imagens.

import Image from './Image';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('boolean', {
    default: true
  })
  isPending: boolean;

  @Column()
  whatsapp: number;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column('varchar')
  about: string;

  @Column('varchar')
  instructions: string;

  @Column('varchar')
  opening_hours: string;

  @Column('boolean')
  open_on_weekends: boolean;

  @Column('uuid')
  user_id: string;

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