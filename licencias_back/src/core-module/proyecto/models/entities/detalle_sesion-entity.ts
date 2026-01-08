import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('detalle_sesion')
export class DetalleSesionEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ name: 'id_usuario', type: 'int' })
  idUsuario: number;

  @CreateDateColumn({
    name: 'fecha_inicio',
    type: 'timestamp',
  })
  fechaInicio: Date;

  @Column({
    name: 'fecha_fin',
    type: 'timestamp',
    nullable: true,
  })
  fechaFin?: Date;

  @Column({
    type: 'inet',
  })
  ip: string;

  @Column({
    type: 'boolean',
  })
  exitoso: boolean;

  @Column({
    type: 'text',
  })
  token: string;

  @Column({
    name: 'id_status',
    type: 'int',
  })
  idStatus: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  comentarios?: string;
}
