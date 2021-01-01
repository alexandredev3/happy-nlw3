import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// ManyToOne: Muitos orfanatos que vai fazer relaciona com uma imagem.
import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  path: string;

  @Column('uuid')
  orphanage_id: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage; // aqui não estamos colocando uma array porque e so um orfanato.
}