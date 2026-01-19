import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('preguntas_examen', { schema: 'public' })
export class PreguntasExamenEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'pregunta' })
  pregunta: string;

  @Column('character varying', { name: 'opcion_a', length: 500 })
  opcionA: string;

  @Column('character varying', { name: 'opcion_b', length: 500 })
  opcionB: string;

  @Column('character varying', { name: 'opcion_c', length: 500 })
  opcionC: string;

  @Column('character varying', { name: 'opcion_d', length: 500 })
  opcionD: string;

  @Column('char', { name: 'respuesta_correcta', length: 1 })
  respuestaCorrecta: string;

  @Column('character varying', { name: 'categoria', length: 100, nullable: true })
  categoria: string;

  @Column('integer', { name: 'dificultad', default: 1 })
  dificultad: number;

  @Column('boolean', { name: 'activo', default: true })
  activo: boolean;

  @Column('timestamp', { name: 'creacion', default: () => 'CURRENT_TIMESTAMP' })
  creacion: Date;

  @Column('timestamp', { name: 'modificacion', default: () => 'CURRENT_TIMESTAMP' })
  modificacion: Date;
}
