import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ExamenesRepository } from '@principal/core-module/proyecto/repository/examenes-repository';
import {
  ObtenerPreguntasExamenReq,
  ObtenerPreguntasExamenRes,
  EnviarRespuestasExamenReq,
  ResultadoExamenDTO,
  VerificarResultadoExamenReq,
  PreguntaExamenDTO,
} from '@principal/core-module/proyecto/models/from-tables/pruebas-dto';

@Injectable()
export class ExamenesService {
  constructor(private examenesRepository: ExamenesRepository) {}

  /**
   * Obtener 10 preguntas aleatorias para iniciar el examen
   */
  async obtenerPreguntasExamen(request: ObtenerPreguntasExamenReq): Promise<ObtenerPreguntasExamenRes> {
    try {
      // Verificar que la solicitud no tenga ya un examen aprobado
      const tieneAprobado = await this.examenesRepository.tieneExamenAprobado(request.idsolicitud);
      
      if (tieneAprobado) {
        throw new BadRequestException(
          'Esta solicitud ya tiene un examen teórico aprobado'
        );
      }

      // Crear un nuevo intento
      const intento = await this.examenesRepository.crearIntentoExamen(request.idsolicitud);

      // Obtener 10 preguntas aleatorias
      const preguntasCompletas = await this.examenesRepository.obtenerPreguntasAleatorias();

      // Mapear a DTO sin incluir la respuesta correcta
      const preguntas: PreguntaExamenDTO[] = preguntasCompletas.map(p => ({
        id: p.id,
        pregunta: p.pregunta,
        opcionA: p.opcionA,
        opcionB: p.opcionB,
        opcionC: p.opcionC,
        opcionD: p.opcionD,
        categoria: p.categoria,
      }));

      return {
        idintento: intento.id,
        preguntas,
        fechaInicio: intento.fechaInicio,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Error al obtener preguntas del examen');
    }
  }

  /**
   * Enviar respuestas del examen y obtener calificación
   */
  async enviarRespuestasExamen(request: EnviarRespuestasExamenReq): Promise<ResultadoExamenDTO> {
    try {
      // Verificar que el intento existe
      const intento = await this.examenesRepository.obtenerIntentoPorId(request.idintento);

      if (intento.idestatus === 24) {
        throw new BadRequestException('Este examen ya fue completado');
      }

      // Verificar que se enviaron exactamente 10 respuestas
      if (request.respuestas.length !== 10) {
        throw new BadRequestException('Debe enviar exactamente 10 respuestas');
      }

      // Validar formato de respuestas
      const respuestasValidas = request.respuestas.every(r => 
        ['A', 'B', 'C', 'D'].includes(r.respuesta.toUpperCase())
      );

      if (!respuestasValidas) {
        throw new BadRequestException('Las respuestas deben ser A, B, C o D');
      }

      // Normalizar respuestas a mayúsculas
      const respuestasNormalizadas = request.respuestas.map(r => ({
        ...r,
        respuesta: r.respuesta.toUpperCase(),
      }));

      // Guardar respuestas
      await this.examenesRepository.guardarRespuestas(
        request.idintento,
        respuestasNormalizadas
      );

      // Calificar examen
      const resultado = await this.examenesRepository.calificarExamen(request.idintento);

      // Obtener intento actualizado
      const intentoActualizado = await this.examenesRepository.obtenerIntentoPorId(request.idintento);

      // Construir respuesta
      const mensaje = resultado.aprobado
        ? '¡Felicidades! Has aprobado el examen teórico de manejo. Ahora puedes agendar tu prueba práctica.'
        : `No aprobaste el examen. Obtuviste ${resultado.calificacion} de 10 respuestas correctas. Necesitas al menos 7 para aprobar. Puedes intentarlo nuevamente.`;

      return {
        idintento: request.idintento,
        calificacion: resultado.calificacion,
        correctas: resultado.calificacion,
        incorrectas: 10 - resultado.calificacion,
        aprobado: resultado.aprobado,
        detalleRespuestas: resultado.detalles,
        fechaInicio: intentoActualizado.fechaInicio,
        fechaFin: intentoActualizado.fechaFin,
        mensaje,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Error al procesar respuestas del examen');
    }
  }

  /**
   * Verificar resultado de un examen previamente completado
   */
  async verificarResultadoExamen(request: VerificarResultadoExamenReq): Promise<ResultadoExamenDTO> {
    try {
      const intento = await this.examenesRepository.obtenerIntentoPorId(request.idintento);

      if (intento.idestatus !== 24) {
        throw new NotFoundException('El examen no ha sido completado');
      }

      // Recalificar para obtener detalles
      const resultado = await this.examenesRepository.calificarExamen(request.idintento);

      const mensaje = resultado.aprobado
        ? '¡Felicidades! Has aprobado el examen teórico de manejo.'
        : `No aprobaste el examen. Obtuviste ${resultado.calificacion} de 10 respuestas correctas.`;

      return {
        idintento: request.idintento,
        calificacion: resultado.calificacion,
        correctas: resultado.calificacion,
        incorrectas: 10 - resultado.calificacion,
        aprobado: resultado.aprobado,
        detalleRespuestas: resultado.detalles,
        fechaInicio: intento.fechaInicio,
        fechaFin: intento.fechaFin,
        mensaje,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Error al verificar resultado del examen');
    }
  }
}
