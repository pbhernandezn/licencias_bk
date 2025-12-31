import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_pruebas', { schema: 'public' })
export class CatPruebasEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'prueba' })
  prueba: string;

  @Column('character varying', { name: 'descripcion' })
  descripcion: string;

  @Column('boolean', { name: 'presencial' })
  presencial: boolean;
  
  @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;
	
}