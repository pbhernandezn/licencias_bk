import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('documentos', { schema: 'public' })
export class DocumentosEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  
  @Column({ type: 'integer', name: 'idusuario', nullable: true })
  idusuario: number | null;
  
  @Column({ type: 'integer', name: 'idsolicitud', nullable: true })
  idsolicitud: number | null;
  
   @Column('date', {name: 'creacion', nullable: true, default: () => 'CURRENT_DATE'})
   creacion: string | null;
   
   @Column({ type: 'integer', name: 'idtipodocumento' })
   idtipodocumento: number;
   
   @Column('character varying', { name: 'formato' })
   formato: string;
   
   @Column('character varying', { name: 'nombreoriginal' })
   nombreoriginal: string;
   
   @Column({ type: 'integer', name: 'tamanio' })
   tamanio: number;

   @Column('character varying', { name: 'urlarchivo', nullable: true })
   urlarchivo: string | null;

   @Column('character varying', { name: 'nombreblob', nullable: true })
   nombreblob: string | null;

}