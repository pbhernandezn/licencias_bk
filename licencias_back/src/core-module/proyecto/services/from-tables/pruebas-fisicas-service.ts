import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PruebasRepository } from '@principal/core-module/proyecto/repository/pruebas-repository';
import { ExamenesRepository } from '@principal/core-module/proyecto/repository/examenes-repository';
import {
  ObtenerHorariosDisponiblesReq,
  ObtenerHorariosDisponiblesRes,
  AgendarPruebaFisicaReq,
  AgendarPruebaFisicaRes,
  ObtenerPruebasPorSolicitudReq,
  ObtenerPruebasPorSolicitudRes,
  CancelarPruebaReq,
  HorarioDisponibleDTO,
} from '@principal/core-module/proyecto/models/from-tables/pruebas-dto';

@Injectable()
export class PruebasFisicasService {
  constructor(
    private pruebasRepository: PruebasRepository,
    private examenesRepository: ExamenesRepository,
  ) {}

  // Configuración de horarios y capacidad
  private readonly HORARIOS_DISPONIBLES = [
    { horaInicio: '08:00', horaFin: '09:00' },
    { horaInicio: '09:00', horaFin: '10:00' },
    { horaInicio: '10:00', horaFin: '11:00' },
    { horaInicio: '11:00', horaFin: '12:00' },
    { horaInicio: '14:00', horaFin: '15:00' },
    { horaInicio: '15:00', horaFin: '16:00' },
    { horaInicio: '16:00', horaFin: '17:00' },
    { horaInicio: '17:00', horaFin: '18:00' },
  ];

  private readonly CAPACIDAD_POR_HORARIO = 5; // 5 personas por hora

  /**
   * Obtener horarios disponibles para un lugar y fecha específica
   */
  async obtenerHorariosDisponibles(
    request: ObtenerHorariosDisponiblesReq
  ): Promise<ObtenerHorariosDisponiblesRes> {
    try {
      // Validar que la fecha no sea pasada
      const fechaSolicitada = new Date(request.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaSolicitada < hoy) {
        throw new BadRequestException('No se pueden agendar citas en fechas pasadas');
      }

      // Validar que la fecha no sea muy lejana (máximo 3 meses)
      const tresMesesAfter = new Date();
      tresMesesAfter.setMonth(tresMesesAfter.getMonth() + 3);

      if (fechaSolicitada > tresMesesAfter) {
        throw new BadRequestException('Solo se pueden agendar citas con máximo 3 meses de anticipación');
      }

      // Verificar disponibilidad para cada horario
      const horariosDisponibles: HorarioDisponibleDTO[] = await Promise.all(
        this.HORARIOS_DISPONIBLES.map(async (horario) => {
          const agendados = await this.pruebasRepository.contarPruebasAgendadas(
            request.idlugar,
            request.fecha,
            horario.horaInicio
          );

          const cuposDisponibles = this.CAPACIDAD_POR_HORARIO - agendados;

          return {
            fecha: request.fecha,
            horaInicio: horario.horaInicio,
            horaFin: horario.horaFin,
            disponible: cuposDisponibles > 0,
            cuposDisponibles,
          };
        })
      );

      return {
        fecha: request.fecha,
        lugar: `Lugar ${request.idlugar}`, // Aquí podrías obtener el nombre del lugar
        horarios: horariosDisponibles,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener horarios disponibles');
    }
  }

  /**
   * Agendar una prueba física
   */
  async agendarPruebaFisica(request: AgendarPruebaFisicaReq): Promise<AgendarPruebaFisicaRes> {
    try {
      // Verificar que la solicitud no tenga ya una prueba física aprobada
      const tieneAprobada = await this.pruebasRepository.tienePruebaFisicaAprobada(request.idsolicitud);

      if (tieneAprobada) {
        throw new BadRequestException(
          'Esta solicitud ya tiene una prueba física aprobada'
        );
      }

      // Validar que la fecha no sea pasada
      const fechaSolicitada = new Date(request.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaSolicitada < hoy) {
        throw new BadRequestException('No se pueden agendar citas en fechas pasadas');
      }

      // Verificar disponibilidad del horario
      const agendados = await this.pruebasRepository.contarPruebasAgendadas(
        request.idlugar,
        request.fecha,
        request.hora
      );

      if (agendados >= this.CAPACIDAD_POR_HORARIO) {
        throw new BadRequestException('No hay cupos disponibles para este horario');
      }

      // Agendar la prueba
      const prueba = await this.pruebasRepository.agendarPrueba({
        idsolicitud: request.idsolicitud,
        idtipoprueba: request.idtipoprueba,
        idlugar: request.idlugar,
        fecha: request.fecha,
        hora: request.hora,
      });

      // Obtener información del lugar desde la relación
      const lugar = await this.pruebasRepository.obtenerLugarPorId(request.idlugar);

      return {
        idprueba: prueba.id,
        mensaje: '¡Prueba física agendada exitosamente!',
        detalles: {
          lugar: lugar?.lugar || 'Centro de pruebas',
          direccion: lugar?.direccion || 'Dirección no disponible',
          fecha: request.fecha,
          hora: request.hora,
          telefono: lugar?.telefono || 'No disponible',
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Error al agendar prueba física');
    }
  }

  /**
   * Obtener todas las pruebas de una solicitud
   */
  async obtenerPruebasPorSolicitud(
    request: ObtenerPruebasPorSolicitudReq
  ): Promise<ObtenerPruebasPorSolicitudRes> {
    try {
      const pruebas = await this.pruebasRepository.obtenerPruebasPorSolicitud(request.idsolicitud);

      const pruebasDTO = pruebas.map(p => {
        // Determinar tipo de prueba basado en idtipoprueba
        let tipoPrueba = '';
        let presencial = false;
        
        switch (p.idtipoprueba) {
          case 1:
            tipoPrueba = 'Prueba Práctica (Automóvil)';
            presencial = true;
            break;
          case 2:
            tipoPrueba = 'Prueba Práctica (Motocicleta)';
            presencial = true;
            break;
          case 3:
            tipoPrueba = 'Prueba Escrita (Teórico)';
            presencial = false;
            break;
          default:
            tipoPrueba = 'Tipo desconocido';
            presencial = false;
        }

        // Determinar estatus y aprobación según idestatus de la prueba
        let estatus = '';
        let aprobado = false;
        let calificacion = 0;

        switch (p.idestatus) {
          case 26: // Aprobada
            estatus = 'Aprobada';
            aprobado = true;
            calificacion = 10;
            break;
          case 27: // Reprobada
            estatus = 'Reprobada';
            aprobado = false;
            calificacion = 0;
            break;
          case 39: // Agendada
            estatus = 'Agendada';
            aprobado = false;
            calificacion = 0;
            break;
          case 40: // Cancelada
            estatus = 'Cancelada';
            aprobado = false;
            calificacion = 0;
            break;
          default:
            estatus = 'Desconocido';
            aprobado = false;
            calificacion = 0;
        }

        return {
          id: p.id,
          idsolicitud: p.idsolicitud,
          tipoPrueba,
          presencial,
          lugar: p.idlugar ? 'Lugar' : 'En línea',
          fecha: p.fecha,
          hora: p.hora,
          estatus,
          calificacion,
          aprobado,
          creacion: new Date(p.creacion),
        };
      });

      return { pruebas: pruebasDTO };
    } catch (error) {
      throw new BadRequestException('Error al obtener pruebas de la solicitud');
    }
  }

  /**
   * Cancelar una prueba agendada
   */
  async cancelarPrueba(request: CancelarPruebaReq): Promise<{ mensaje: string }> {
    try {
      await this.pruebasRepository.cancelarPrueba(request.idprueba);

      return {
        mensaje: `Prueba cancelada exitosamente. Motivo: ${request.motivo}`,
      };
    } catch (error) {
      throw new BadRequestException('Error al cancelar la prueba');
    }
  }
}
