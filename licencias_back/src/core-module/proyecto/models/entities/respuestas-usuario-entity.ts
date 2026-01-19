import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('respuestas_usuario', { schema: 'public' })
export class RespuestasUsuarioEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'idintento' })
  idintento: number;

  @Column('integer', { name: 'idpregunta' })
  idpregunta: number;

  @Column('char', { name: 'respuesta_usuario', length: 1 })
  respuestaUsuario: string;

  @Column('boolean', { name: 'es_correcta' })
  esCorrecta: boolean;

  @Column('integer', { name: 'tiempo_respuesta', nullable: true })
  tiempoRespuesta: number;

  @Column('timestamp', { name: 'creacion', default: () => 'CURRENT_TIMESTAMP' })
  creacion: Date;
}
