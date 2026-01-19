import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsArray, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// ==================== DTOs BÁSICOS ====================

export class PruebasDTO {
  id: number;
  creacion: string;
  modificacion: string;
  idsolicitud: number;
  idtipoprueba: number;
  idlugar: number;
  fecha: string;
  hora: string;
  idestatus: number;
}

// ==================== EXAMEN TEÓRICO ====================

export class PreguntaExamenDTO {
  id: number;
  pregunta: string;
  opcionA: string;
  opcionB: string;
  opcionC: string;
  opcionD: string;
  categoria: string;
  // NO incluir respuestaCorrecta aquí para no enviarla al frontend
}

export class ObtenerPreguntasExamenReq {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @IsInt()
  idsolicitud: number;
}

export class VerificarAprobacionExamenReq {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @IsInt()
  idsolicitud: number;
}

export class VerificarAprobacionExamenRes {
  @ApiProperty({ description: 'Indica si aprobó el examen teórico', example: true })
  aprobo: boolean;

  @ApiProperty({ description: 'Mensaje descriptivo', example: 'El examen teórico ha sido aprobado' })
  mensaje: string;

  @ApiProperty({ description: 'Calificación obtenida (si aprobó)', example: 8, required: false })
  calificacion?: number;

  @ApiProperty({ description: 'Fecha del examen aprobado', required: false })
  fechaExamen?: Date;
}

export class ObtenerPreguntasExamenRes {
  @ApiProperty({ description: 'ID del intento de examen', example: 1 })
  idintento: number;

  @ApiProperty({ description: 'Lista de 10 preguntas aleatorias', type: [PreguntaExamenDTO] })
  preguntas: PreguntaExamenDTO[];

  @ApiProperty({ description: 'Fecha y hora de inicio del intento' })
  fechaInicio: Date;
}

export class RespuestaUsuarioItem {
  @ApiProperty({ description: 'ID de la pregunta', example: 1 })
  @IsInt()
  idpregunta: number;

  @ApiProperty({ description: 'Respuesta del usuario (A, B, C o D)', example: 'A' })
  @IsString()
  respuesta: string;

  @ApiProperty({ description: 'Tiempo en segundos que tardó en responder', example: 15, required: false })
  @IsInt()
  @IsOptional()
  tiempoRespuesta?: number;
}

export class EnviarRespuestasExamenReq {
  @ApiProperty({ description: 'ID del intento de examen', example: 1 })
  @IsInt()
  idintento: number;

  @ApiProperty({ 
    description: 'Array con las 10 respuestas del usuario',
    type: [RespuestaUsuarioItem],
    example: [
      { idpregunta: 1, respuesta: 'A', tiempoRespuesta: 15 },
      { idpregunta: 2, respuesta: 'B', tiempoRespuesta: 20 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaUsuarioItem)
  respuestas: RespuestaUsuarioItem[];
}

export class ResultadoPreguntaDTO {
  idpregunta: number;
  pregunta: string;
  respuestaUsuario: string;
  respuestaCorrecta: string;
  esCorrecta: boolean;
}

export class ResultadoExamenDTO {
  @ApiProperty({ description: 'ID del intento', example: 1 })
  idintento: number;

  @ApiProperty({ description: 'Calificación obtenida (0-10)', example: 8 })
  calificacion: number;

  @ApiProperty({ description: 'Número de respuestas correctas', example: 8 })
  correctas: number;

  @ApiProperty({ description: 'Número de respuestas incorrectas', example: 2 })
  incorrectas: number;

  @ApiProperty({ description: 'Indica si aprobó el examen (>= 7 correctas)', example: true })
  aprobado: boolean;

  @ApiProperty({ description: 'Detalle de cada pregunta y respuesta' })
  detalleRespuestas: ResultadoPreguntaDTO[];

  @ApiProperty({ description: 'Fecha y hora de inicio' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha y hora de finalización' })
  fechaFin: Date;

  @ApiProperty({ description: 'Mensaje de resultado', example: '¡Felicidades! Has aprobado el examen' })
  mensaje: string;
}

export class VerificarResultadoExamenReq {
  @ApiProperty({ description: 'ID del intento de examen', example: 1 })
  @IsInt()
  idintento: number;
}

// ==================== PRUEBA FÍSICA ====================

export class LugarPruebaDTO {
  id: number;
  lugar: string;
  direccion: string;
  telefono: string;
  horario: string;
  capacidad: number;
  activo: boolean;
}

export class ObtenerLugaresPruebaReq {
  // Sin filtros adicionales por ahora
}

export class ObtenerLugaresPruebaRes {
  lugares: LugarPruebaDTO[];
}

export class HorarioDisponibleDTO {
  fecha: string; // YYYY-MM-DD
  horaInicio: string; // HH:MM
  horaFin: string; // HH:MM
  disponible: boolean;
  cuposDisponibles: number;
}

export class ObtenerHorariosDisponiblesReq {
  @ApiProperty({ description: 'ID del lugar', example: 1 })
  @IsInt()
  idlugar: number;

  @ApiProperty({ description: 'Fecha para consultar disponibilidad (YYYY-MM-DD)', example: '2026-01-20' })
  @IsString()
  fecha: string;
}

export class ObtenerHorariosDisponiblesRes {
  fecha: string;
  lugar: string;
  horarios: HorarioDisponibleDTO[];
}

export class AgendarPruebaFisicaReq {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @IsInt()
  idsolicitud: number;

  @ApiProperty({ description: 'ID del tipo de prueba (física)', example: 2 })
  @IsInt()
  idtipoprueba: number;

  @ApiProperty({ description: 'ID del lugar donde se realizará la prueba', example: 1 })
  @IsInt()
  idlugar: number;

  @ApiProperty({ description: 'Fecha de la prueba (YYYY-MM-DD)', example: '2026-01-20' })
  @IsString()
  fecha: string;

  @ApiProperty({ description: 'Hora de la prueba (HH:MM)', example: '10:00' })
  @IsString()
  hora: string;
}

export class AgendarPruebaFisicaRes {
  @ApiProperty({ description: 'ID de la prueba agendada', example: 1 })
  idprueba: number;

  @ApiProperty({ description: 'Mensaje de confirmación' })
  mensaje: string;

  @ApiProperty({ description: 'Detalles de la cita' })
  detalles: {
    lugar: string;
    direccion: string;
    fecha: string;
    hora: string;
    telefono: string;
  };
}

// ==================== CONSULTAS GENERALES ====================

export class ObtenerPruebasPorSolicitudReq {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @IsInt()
  idsolicitud: number;
}

export class PruebaDTO {
  id: number;
  idsolicitud: number;
  tipoPrueba: string;
  presencial: boolean;
  lugar: string;
  fecha: string;
  hora: string;
  estatus: string;
  calificacion: number;
  aprobado: boolean;
  creacion: Date;
}

export class ObtenerPruebasPorSolicitudRes {
  pruebas: PruebaDTO[];
}

export class CancelarPruebaReq {
  @ApiProperty({ description: 'ID de la prueba a cancelar', example: 1 })
  @IsInt()
  idprueba: number;

  @ApiProperty({ description: 'Motivo de cancelación', example: 'No podré asistir' })
  @IsString()
  motivo: string;
}