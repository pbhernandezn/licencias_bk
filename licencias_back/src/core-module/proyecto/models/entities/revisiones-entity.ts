import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('revisiones', { schema: 'public' })
export class RevisionesEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  
  @Column('date', {name: 'creacion', nullable: true, default: () => 'CURRENT_DATE'})
   creacion: string | null;
   
   @Column('date', {name: 'modificacion', nullable: true, default: () => 'CURRENT_DATE'})
   modificacion: string | null;
  
  @Column({ type: 'integer', name: 'idsolicitud'})
  idsolicitud: number;
  
  @Column({ type: 'integer', name: 'idrevisor' })
  idrevisor: number;
  
  @Column('character varying', { name: 'comentarios', nullable: true })
   comentarios: string | null;
   
   @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;

}