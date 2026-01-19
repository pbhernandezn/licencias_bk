import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pruebas', { schema: 'public' })
export class PruebasEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  
  @Column('date', {name: 'creacion', nullable: true, default: () => 'CURRENT_DATE'})
   creacion: string | null;
   
   @Column('date', {name: 'modificacion', nullable: true, default: () => 'CURRENT_DATE'})
   modificacion: string | null;
  
  @Column({ type: 'integer', name: 'idsolicitud'})
  idsolicitud: number;
  
  @Column({ type: 'integer', name: 'idtipoprueba' })
  idtipoprueba: number;
  
  @Column({ type: 'integer', name: 'idlugar', nullable: true })
   idlugar: number | null;
    
   @Column('date', {name: 'fecha'})
   fecha: string;
   
   @Column('time', {name: 'hora'})
   hora: string;
   
   @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;

}