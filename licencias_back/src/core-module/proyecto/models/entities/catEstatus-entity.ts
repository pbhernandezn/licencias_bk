import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_estatus', { schema: 'public' })
export class CatEstatusEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'estatus' })
  estatus: string;

  @Column('character varying', { name: 'tabla' })
  tabla: string;

  @Column('boolean', { name: 'activo', nullable: true })
  activo: boolean;

}