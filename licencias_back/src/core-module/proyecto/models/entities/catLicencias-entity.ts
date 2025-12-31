import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_licencias', { schema: 'public' })
export class CatLicenciasEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'licencia' })
  licencia: string;

  @Column('character varying', { name: 'descripcion' })
  descripcion: string;

  @Column({ type: 'integer', name: 'vigencia' })
  vigencia: number;
  
  @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;
	
  @Column('numeric', { name: 'precio', default: () => 0 })
  precio: string;
}