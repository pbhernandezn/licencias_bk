import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SolicitudesEntity } from './solicitudes-entity';

@Entity('fotos_rostro')
export class FotosRostroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idsolicitud' })
  idsolicitud: number;

  @Column({ name: 'url_foto', length: 500 })
  urlFoto: string;

  @Column({ name: 'nombre_archivo', length: 255 })
  nombreArchivo: string;

  @Column({ length: 100, default: 'fotos-rostro' })
  contenedor: string;

  @Column({ name: 'fecha_subida', type: 'timestamp', default: () => 'NOW()' })
  fechaSubida: Date;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => SolicitudesEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idsolicitud' })
  solicitud: SolicitudesEntity;
}
