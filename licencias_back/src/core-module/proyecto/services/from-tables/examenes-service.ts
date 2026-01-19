import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ExamenesRepository } from '@principal/core-module/proyecto/repository/examenes-repository';
import { PruebasRepository } from '@principal/core-module/proyecto/repository/pruebas-repository';
import {
  ObtenerPreguntasExamenReq,
  ObtenerPreguntasExamenRes,
  EnviarRespuestasExamenReq,
  ResultadoExamenDTO,
  VerificarResultadoExamenReq,
  VerificarAprobacionExamenReq,
  VerificarAprobacionExamenRes,
  PreguntaExamenDTO,
} from '@principal/core-module/proyecto/models/from-tables/pruebas-dto';

@Injectable()
export class ExamenesService {
  constructor(
    private examenesRepository: ExamenesRepository,
    private pruebasRepository: PruebasRepository
  ) {}

  /**
   * Verificar si una solicitud tiene examen teórico aprobado
   */
  async verificarAprobacionExamen(request: VerificarAprobacionExamenReq): Promise<VerificarAprobacionExamenRes> {
    try {
      const intentoAprobado = await this.examenesRepository.obtenerExamenAprobado(request.idsolicitud);

      if (intentoAprobado) {
        return {
          aprobo: true,
          mensaje: 'El examen teórico ha sido aprobado exitosamente',
          calificacion: intentoAprobado.calificacion,
          fechaExamen: intentoAprobado.creacion,
        };
      }

      return {
        aprobo: false,
        mensaje: 'El examen teórico aún no ha sido aprobado',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtener 10 preguntas aleatorias para iniciar el examen
   */
  async obtenerPreguntasExamen(request: ObtenerPreguntasExamenReq): Promise<ObtenerPreguntasExamenRes> {
    try {
      // Verificar que la prueba no tenga ya un examen aprobado
      const tieneAprobado = await this.examenesRepository.tieneExamenAprobado(request.idsolicitud);
      
      if (tieneAprobado) {
        throw new BadRequestException(
          'Esta solicitud ya tiene un examen teórico aprobado'
        );
      }

      // Buscar o crear prueba de examen teórico
      let prueba = await this.pruebasRepository.obtenerPruebaExamenTeorico(request.idsolicitud);
      
      if (!prueba) {
        // Si no existe, crear automáticamente el registro de prueba teórica
        prueba = await this.pruebasRepository.crearPruebaExamenTeorico(request.idsolicitud);
      }

      // Crear un nuevo intento con el idprueba
      const intento = await this.examenesRepository.crearIntentoExamen(request.idsolicitud, prueba.id);

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
      console.log('=== DEBUG enviarRespuestasExamen ===');
      console.log('Request completo:', JSON.stringify(request, null, 2));
      console.log('Tipo de respuestas:', typeof request.respuestas);
      console.log('Es array:', Array.isArray(request.respuestas));
      console.log('Longitud:', request.respuestas?.length);
      
      // Verificar que el intento existe
      const intento = await this.examenesRepository.obtenerIntentoPorId(request.idintento);

      // Verificar si ya está completado (26=Aprobada o 27=Reprobada)
      if (intento.idestatus === 26 || intento.idestatus === 27) {
        throw new BadRequestException('Este examen ya fue completado');
      }

      // Verificar que se enviaron exactamente 10 respuestas
      if (!request.respuestas || !Array.isArray(request.respuestas) || request.respuestas.length !== 10) {
        throw new BadRequestException(
          `Debe enviar exactamente 10 respuestas. Recibidas: ${request.respuestas ? request.respuestas.length : 0}`
        );
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

      // Actualizar estatus de la prueba (26=Aprobada, 27=Reprobada)
      if (intento.idprueba) {
        const estatusPrueba = resultado.aprobado ? 26 : 27;
        await this.pruebasRepository.actualizarEstatusPrueba(intento.idprueba, estatusPrueba);
      }

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
