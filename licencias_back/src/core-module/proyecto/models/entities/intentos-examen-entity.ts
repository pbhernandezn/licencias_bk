import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('intentos_examen', { schema: 'public' })
export class IntentosExamenEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'idsolicitud' })
  idsolicitud: number;

  @Column('integer', { name: 'idprueba', nullable: true })
  idprueba: number;

  @Column('timestamp', { name: 'fecha_inicio', default: () => 'CURRENT_TIMESTAMP' })
  fechaInicio: Date;

  @Column('timestamp', { name: 'fecha_fin', nullable: true })
  fechaFin: Date;

  @Column('integer', { name: 'calificacion', nullable: true })
  calificacion: number;

  @Column('boolean', { name: 'aprobado', nullable: true })
  aprobado: boolean;

  @Column('integer', { name: 'idestatus', default: 20 })
  idestatus: number;

  @Column('timestamp', { name: 'creacion', default: () => 'CURRENT_TIMESTAMP' })
  creacion: Date;

  @Column('timestamp', { name: 'modificacion', default: () => 'CURRENT_TIMESTAMP' })
  modificacion: Date;
}
