import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_lugares', { schema: 'public' })
export class CatLugaresEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'lugar' })
  lugar: string;

  @Column('character varying', { name: 'direccion' })
  direccion: string;

  @Column('character varying', { name: 'horario' })
  horario: number;
  
  @Column('character varying', { name: 'telefono' })
  telefono: number;
	
  @Column({ type: 'integer', name: 'idestatus' })
  idestatus: string;
}