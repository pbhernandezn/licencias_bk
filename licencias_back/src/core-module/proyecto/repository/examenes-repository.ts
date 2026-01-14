import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreguntasExamenEntity } from '../models/entities/preguntas-examen-entity';
import { IntentosExamenEntity } from '../models/entities/intentos-examen-entity';
import { RespuestasUsuarioEntity } from '../models/entities/respuestas-usuario-entity';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';

@Injectable()
export class ExamenesRepository {
  constructor(
    @InjectRepository(PreguntasExamenEntity)
    private preguntasRepository: Repository<PreguntasExamenEntity>,

    @InjectRepository(IntentosExamenEntity)
    private intentosRepository: Repository<IntentosExamenEntity>,

    @InjectRepository(RespuestasUsuarioEntity)
    private respuestasRepository: Repository<RespuestasUsuarioEntity>,
  ) {}

  /**
   * Obtener 10 preguntas aleatorias activas
   */
  async obtenerPreguntasAleatorias(): Promise<PreguntasExamenEntity[]> {
    try {
      const preguntas = await this.preguntasRepository
        .createQueryBuilder('p')
        .where('p.activo = :activo', { activo: true })
        .orderBy('RANDOM()')
        .limit(10)
        .getMany();

      if (preguntas.length < 10) {
        throw new Error('No hay suficientes preguntas activas en el banco (mínimo 10 requeridas)');
      }

      return preguntas;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-examenes-001'
      );
    }
  }

  /**
   * Crear un nuevo intento de examen
   */
  async crearIntentoExamen(idsolicitud: number): Promise<IntentosExamenEntity> {
    try {
      const intento = this.intentosRepository.create({
        idsolicitud,
        idestatus: 20, // En progreso
        fechaInicio: new Date(),
      });

      return await this.intentosRepository.save(intento);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-examenes-002'
      );
    }
  }

  /**
   * Obtener un intento por ID
   */
  async obtenerIntentoPorId(idintento: number): Promise<IntentosExamenEntity> {
    try {
      const intento = await this.intentosRepository.findOne({
        where: { id: idintento }
      });

      if (!intento) {
        throw new Error(`Intento de examen ${idintento} no encontrado`);
      }

      return intento;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-examenes-003'
      );
    }
  }

  /**
   * Guardar respuestas del usuario
   */
  async guardarRespuestas(
    idintento: number,
    respuestas: Array<{ idpregunta: number; respuesta: string; tiempoRespuesta?: number }>
  ): Promise<void> {
    try {
      // Obtener las preguntas para verificar respuestas correctas
      const idsPreguntas = respuestas.map(r => r.idpregunta);
      const preguntas = await this.preguntasRepository
        .createQueryBuilder('p')
        .where('p.id IN (:...ids)', { ids: idsPreguntas })
        .getMany();

      // Crear mapa de respuestas correctas
      const respuestasCorrectas = new Map(
        preguntas.map(p => [p.id, p.respuestaCorrecta])
      );

      // Crear las respuestas del usuario
      const respuestasEntities = respuestas.map(r => {
        const respuestaCorrecta = respuestasCorrectas.get(r.idpregunta);
        return this.respuestasRepository.create({
          idintento,
          idpregunta: r.idpregunta,
          respuestaUsuario: r.respuesta,
          esCorrecta: r.respuesta === respuestaCorrecta,
          tiempoRespuesta: r.tiempoRespuesta || null,
        });
      });

      await this.respuestasRepository.save(respuestasEntities);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-examenes-004'
      );
    }
  }

  /**
   * Calificar examen y actualizar intento
   */
  async calificarExamen(idintento: number): Promise<{
    calificacion: number;
    aprobado: boolean;
    detalles: any[];
  }> {
    try {
      // Obtener todas las respuestas del intento con las preguntas
      const respuestas = await this.respuestasRepository
        .createQueryBuilder('r')
        .leftJoinAndSelect('r.idpregunta', 'p')
        .where('r.idintento = :idintento', { idintento })
        .getMany();

      if (respuestas.length !== 10) {
        throw new Error('El examen debe tener exactamente 10 respuestas');
      }

      // Contar correctas
      const correctas = respuestas.filter(r => r.esCorrecta).length;
      const aprobado = correctas >= 7;

      // Actualizar el intento
      await this.intentosRepository.update(idintento, {
        calificacion: correctas,
        aprobado,
        fechaFin: new Date(),
        idestatus: 24, // Completado
        modificacion: new Date(),
      });

      // Obtener detalles de las preguntas
      const idsPreguntas = respuestas.map(r => r.idpregunta);
      const preguntas = await this.preguntasRepository
        .createQueryBuilder('p')
        .where('p.id IN (:...ids)', { ids: idsPreguntas })
        .getMany();

      const preguntasMap = new Map(preguntas.map(p => [p.id, p]));

      const detalles = respuestas.map(r => {
        const pregunta = preguntasMap.get(r.idpregunta);
        return {
          idpregunta: r.idpregunta,
          pregunta: pregunta?.pregunta,
          respuestaUsuario: r.respuestaUsuario,
          respuestaCorrecta: pregunta?.respuestaCorrecta,
          esCorrecta: r.esCorrecta,
        };
      });

      return {
        calificacion: correctas,
        aprobado,
        detalles,
      };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-examenes-005'
      );
    }
  }

  /**
   * Verificar si una solicitud ya tiene un intento aprobado
   */
  async tieneExamenAprobado(idsolicitud: number): Promise<boolean> {
    try {
      const count = await this.intentosRepository
        .createQueryBuilder('i')
        .where('i.idsolicitud = :idsolicitud', { idsolicitud })
        .andWhere('i.aprobado = :aprobado', { aprobado: true })
        .getCount();

      return count > 0;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-examenes-006'
      );
    }
  }

  /**
   * Obtener todos los intentos de una solicitud
   */
  async obtenerIntentosPorSolicitud(idsolicitud: number): Promise<IntentosExamenEntity[]> {
    try {
      return await this.intentosRepository
        .createQueryBuilder('i')
        .where('i.idsolicitud = :idsolicitud', { idsolicitud })
        .orderBy('i.creacion', 'DESC')
        .getMany();
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-examenes-007'
      );
    }
  }
}
