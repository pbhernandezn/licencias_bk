import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_vigencia', { schema: 'public' })
export class CatVigenciaEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'vigencia' })
  vigencia: string;

  @Column('character varying', { name: 'descripcion' })
  descripcion: string;

  @Column({ type: 'integer', name: 'anios' })
  anios: number;
  
  @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;

}