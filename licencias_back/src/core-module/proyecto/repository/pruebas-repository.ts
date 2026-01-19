import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PruebasEntity } from '../models/entities/pruebas-entity';
import { CatLugaresEntity } from '../models/entities/catLugares-entity';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';

@Injectable()
export class PruebasRepository {
  constructor(
    @InjectRepository(PruebasEntity)
    private pruebasRepository: Repository<PruebasEntity>,

    @InjectRepository(CatLugaresEntity)
    private lugaresRepository: Repository<CatLugaresEntity>,

    @InjectRepository(CatEstatusEntity)
    private estatusRepository: Repository<CatEstatusEntity>,
  ) {}

  /**
   * Obtener idestatus para pruebas desde cat_estatus
   */
  async obtenerIdEstatusPrueba(estatus: string): Promise<number> {
    try {
      const estatusEntity = await this.estatusRepository
        .createQueryBuilder('e')
        .where('e.tabla = :tabla', { tabla: 'cat_prueba' })
        .andWhere('e.estatus = :estatus', { estatus })
        .getOne();

      if (!estatusEntity) {
        throw new Error(`No se encontró estatus '${estatus}' para tabla 'cat_prueba'`);
      }

      return estatusEntity.id;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-001b'
      );
    }
  }

  /**
   * Obtener un lugar por ID
   */
  async obtenerLugarPorId(id: number): Promise<CatLugaresEntity | null> {
    try {
      return await this.lugaresRepository.findOne({ where: { id } });
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-001'
      );
    }
  }

  /**
   * Obtener pruebas agendadas en una fecha y lugar específico
   */
  async contarPruebasAgendadas(idlugar: number, fecha: string, hora: string): Promise<number> {
    try {
      const count = await this.pruebasRepository
        .createQueryBuilder('p')
        .where('p.idlugar = :idlugar', { idlugar })
        .andWhere('p.fecha = :fecha', { fecha })
        .andWhere('p.hora = :hora', { hora })
        .andWhere('p.idestatus != :cancelado', { cancelado: 40 }) // Excluir canceladas (40)
        .getCount();

      return count;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-002'
      );
    }
  }

  /**
   * Agendar una prueba física
   */
  async agendarPrueba(data: {
    idsolicitud: number;
    idtipoprueba: number;
    idlugar: number;
    fecha: string;
    hora: string;
  }): Promise<PruebasEntity> {
    try {
      // Estatus 39 = Agendada
      const idestatus = 39;

      const prueba = this.pruebasRepository.create({
        idsolicitud: data.idsolicitud,
        idtipoprueba: data.idtipoprueba,
        idlugar: data.idlugar,
        fecha: data.fecha,
        hora: data.hora,
        idestatus: idestatus,
        creacion: new Date().toISOString().split('T')[0],
        modificacion: new Date().toISOString().split('T')[0],
      });

      return await this.pruebasRepository.save(prueba);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-003'
      );
    }
  }

  /**
   * Obtener pruebas por solicitud
   */
  async obtenerPruebasPorSolicitud(idsolicitud: number): Promise<any[]> {
    try {
      const pruebas = await this.pruebasRepository
        .createQueryBuilder('p')
        .where('p.idsolicitud = :idsolicitud', { idsolicitud })
        .orderBy('p.creacion', 'DESC')
        .getMany();

      return pruebas;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-004'
      );
    }
  }

  /**
   * Cancelar una prueba
   */
  async cancelarPrueba(idprueba: number): Promise<void> {
    try {
      await this.pruebasRepository.update(idprueba, {
        idestatus: 40, // Cancelada
        modificacion: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-005'
      );
    }
  }

  /**
   * Verificar si tiene una prueba física aprobada
   */
  async tienePruebaFisicaAprobada(idsolicitud: number): Promise<boolean> {
    try {
      const count = await this.pruebasRepository
        .createQueryBuilder('p')
        .where('p.idsolicitud = :idsolicitud', { idsolicitud })
        .andWhere('p.idtipoprueba IN (:...tipos)', { tipos: [1, 2] }) // 1 = Automóvil, 2 = Motocicleta
        .andWhere('p.idestatus = :aprobada', { aprobada: 26 }) // Aprobada
        .getCount();

      return count > 0;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-006'
      );
    }
  }

  /**
   * Actualizar estatus de prueba
   */
  async actualizarEstatusPrueba(idprueba: number, idestatus: number): Promise<void> {
    try {
      await this.pruebasRepository.update(idprueba, {
        idestatus,
        modificacion: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-007'
      );
    }
  }

  /**
   * Verificar si existe una prueba de examen teórico agendada para una solicitud
   */
  async obtenerPruebaExamenTeorico(idsolicitud: number): Promise<PruebasEntity | null> {
    try {
      const prueba = await this.pruebasRepository
        .createQueryBuilder('p')
        .where('p.idsolicitud = :idsolicitud', { idsolicitud })
        .andWhere('p.idtipoprueba = :idtipo', { idtipo: 3 }) // 3 = Examen teórico
        .orderBy('p.creacion', 'DESC')
        .getOne();

      return prueba;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-008'
      );
    }
  }

  /**
   * Crear registro de prueba teórica (sin lugar, fecha, hora)
   */
  async crearPruebaExamenTeorico(idsolicitud: number): Promise<PruebasEntity> {
    try {
      // Estatus 39 = Agendada
      const idestatus = 39;

      const prueba = this.pruebasRepository.create({
        idsolicitud,
        idtipoprueba: 3, // 3 = Examen teórico
        idlugar: null, // Sin lugar físico
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
        hora: '00:00:00', // Sin hora específica
        idestatus: idestatus,
        creacion: new Date().toISOString().split('T')[0],
        modificacion: new Date().toISOString().split('T')[0],
      });

      return await this.pruebasRepository.save(prueba);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-pruebas-009'
      );
    }
  }
}
