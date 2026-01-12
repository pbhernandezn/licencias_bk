import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('solicitudes', { schema: 'public' })
export class SolicitudesEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  
  @Column({ type: 'integer', name: 'idusuario'})
  idusuario: number;
  
/* @Column('date', {name: 'creacion', nullable: true, default: () => 'CURRENT_DATE'})
 creacion: string | null;
   
 @Column('date', {name: 'modificacion', nullable: true, default: () => 'CURRENT_DATE'})
 modificacion: string | null;
 */

  @CreateDateColumn({ name: 'creacion' })
  creacion: Date;
 
  @UpdateDateColumn({ name: 'modificacion' })
  modificacion: Date;
 
  @Column({ type: 'integer', name: 'idtipolicencia' })
  idtipolicencia: number;
  
  @Column('character varying', { name: 'numerolicencia', nullable: true })
   numerolicencia: string | null;
   
   @Column('date', {name: 'expedicion', nullable: true})
   expedicion: string | null;
   
   @Column('date', {name: 'vigencia', nullable: true})
   vigencia: string | null;
   
   @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;

  @Column({ type: 'integer', name: 'idmetodopago' })
  idmetodopago: number;

}