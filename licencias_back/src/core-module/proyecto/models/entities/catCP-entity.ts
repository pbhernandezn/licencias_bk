import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_cp', { schema: 'public' })
export class CatCPEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'cp' })
  cp: string;

  @Column('character varying', { name: 'municipio' })
  municipio: string;

  @Column('character varying', { name: 'localidad', nullable: true })
  localidad: string | null;
}