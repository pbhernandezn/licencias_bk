import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { RevisionesEntity } from '../models/entities/revisiones-entity';
import { 
  CreateRevisionRequest, 
  getRevisionByIdDTO, 
  getRevisionByIdReq, 
  getRevisionesBySolicitudReq,
  getRevisionesByRevisorReq,
  getRevisionesDTO,
  RevisionesDataDTO,
  UpdateRevisionRequest
} from '../models/from-tables/revisiones-dto';
import { RevisionesMapping } from '../utils/from-tables/revisiones-mapping';

@Injectable()
export class RevisionesRepository {
  constructor(
    @InjectRepository(RevisionesEntity)
    private readonly revisionesRepository: Repository<RevisionesEntity>,
  ) {}

  public async getRevisiones(queryParams: QueryParams): Promise<getRevisionesDTO> {
    try {
      const result: any[] = await this.revisionesRepository
        .createQueryBuilder('revisiones')
        .leftJoin('solicitudes', 'solicitudes', 'revisiones.idsolicitud = solicitudes.id')
        .leftJoin('usuarios', 'usuario_solicitud', 'solicitudes.idusuario = usuario_solicitud.id')
        .leftJoin('usuarios', 'revisor', 'revisiones.idrevisor = revisor.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND revisiones.idestatus = estatus.id', 
          { tabla: 'revisiones' })
        .select([
          'revisiones.id',
          'revisiones.creacion',
          'revisiones.modificacion',
          'revisiones.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'usuario_solicitud.nombres AS usuario_nombres',
          'revisiones.idrevisor',
          'revisor.nombres AS revisor_nombres',
          'revisiones.comentarios',
          'revisiones.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, revisionesData: [] };
      }

      const revisionesData: Array<RevisionesDataDTO> = result.map((r) => ({
        id: r['revisiones_id'],
        creacion: r['revisiones_creacion'],
        modificacion: r['revisiones_modificacion'],
        idsolicitud: r['revisiones_idsolicitud'],
        numerosolicitud: r['solicitudes_numero'],
        nombreusuario: r['usuario_nombres'],
        idrevisor: r['revisiones_idrevisor'],
        nombrerevisor: r['revisor_nombres'],
        comentarios: r['revisiones_comentarios'],
        idestatus: r['revisiones_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return { existe: true, revisionesData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-001',
      );
    }
  }

  public async getRevisionById(request: getRevisionByIdReq): Promise<getRevisionByIdDTO> {
    try {
      const result = await this.revisionesRepository
        .createQueryBuilder('revisiones')
        .leftJoin('solicitudes', 'solicitudes', 'revisiones.idsolicitud = solicitudes.id')
        .leftJoin('usuarios', 'usuario_solicitud', 'solicitudes.idusuario = usuario_solicitud.id')
        .leftJoin('usuarios', 'revisor', 'revisiones.idrevisor = revisor.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND revisiones.idestatus = estatus.id',
          { tabla: 'revisiones' })
        .select([
          'revisiones.id',
          'revisiones.creacion',
          'revisiones.modificacion',
          'revisiones.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'usuario_solicitud.nombres AS usuario_nombres',
          'revisiones.idrevisor',
          'revisor.nombres AS revisor_nombres',
          'revisiones.comentarios',
          'revisiones.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .where('revisiones.id = :id', { id: request.id })
        .getRawOne();

      const revisionDTO: getRevisionByIdDTO = {
        existe: !!result,
        revisionData: result ? {
          id: result['revisiones_id'],
          creacion: result['revisiones_creacion'],
          modificacion: result['revisiones_modificacion'],
          idsolicitud: result['revisiones_idsolicitud'],
          numerosolicitud: result['solicitudes_numero'],
          nombreusuario: result['usuario_nombres'],
          idrevisor: result['revisiones_idrevisor'],
          nombrerevisor: result['revisor_nombres'],
          comentarios: result['revisiones_comentarios'],
          idestatus: result['revisiones_idestatus'],
          estatus: result['estatus_estatus'],
        } : undefined,
      };

      return revisionDTO;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-002',
      );
    }
  }

  public async getRevisionesBySolicitud(request: getRevisionesBySolicitudReq): Promise<getRevisionesDTO> {
    try {
      const result: any[] = await this.revisionesRepository
        .createQueryBuilder('revisiones')
        .leftJoin('solicitudes', 'solicitudes', 'revisiones.idsolicitud = solicitudes.id')
        .leftJoin('usuarios', 'usuario_solicitud', 'solicitudes.idusuario = usuario_solicitud.id')
        .leftJoin('usuarios', 'revisor', 'revisiones.idrevisor = revisor.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND revisiones.idestatus = estatus.id',
          { tabla: 'revisiones' })
        .where('revisiones.idsolicitud = :idsolicitud', { idsolicitud: request.idsolicitud })
        .select([
          'revisiones.id',
          'revisiones.creacion',
          'revisiones.modificacion',
          'revisiones.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'usuario_solicitud.nombres AS usuario_nombres',
          'revisiones.idrevisor',
          'revisor.nombres AS revisor_nombres',
          'revisiones.comentarios',
          'revisiones.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, revisionesData: [] };
      }

      const revisionesData: Array<RevisionesDataDTO> = result.map((r) => ({
        id: r['revisiones_id'],
        creacion: r['revisiones_creacion'],
        modificacion: r['revisiones_modificacion'],
        idsolicitud: r['revisiones_idsolicitud'],
        numerosolicitud: r['solicitudes_numero'],
        nombreusuario: r['usuario_nombres'],
        idrevisor: r['revisiones_idrevisor'],
        nombrerevisor: r['revisor_nombres'],
        comentarios: r['revisiones_comentarios'],
        idestatus: r['revisiones_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return { existe: true, revisionesData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-003',
      );
    }
  }

  public async getRevisionesByRevisor(request: getRevisionesByRevisorReq): Promise<getRevisionesDTO> {
    try {
      const result: any[] = await this.revisionesRepository
        .createQueryBuilder('revisiones')
        .leftJoin('solicitudes', 'solicitudes', 'revisiones.idsolicitud = solicitudes.id')
        .leftJoin('usuarios', 'usuario_solicitud', 'solicitudes.idusuario = usuario_solicitud.id')
        .leftJoin('usuarios', 'revisor', 'revisiones.idrevisor = revisor.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND revisiones.idestatus = estatus.id',
          { tabla: 'revisiones' })
        .where('revisiones.idrevisor = :idrevisor', { idrevisor: request.idrevisor })
        .select([
          'revisiones.id',
          'revisiones.creacion',
          'revisiones.modificacion',
          'revisiones.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'usuario_solicitud.nombres AS usuario_nombres',
          'revisiones.idrevisor',
          'revisor.nombres AS revisor_nombres',
          'revisiones.comentarios',
          'revisiones.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, revisionesData: [] };
      }

      const revisionesData: Array<RevisionesDataDTO> = result.map((r) => ({
        id: r['revisiones_id'],
        creacion: r['revisiones_creacion'],
        modificacion: r['revisiones_modificacion'],
        idsolicitud: r['revisiones_idsolicitud'],
        numerosolicitud: r['solicitudes_numero'],
        nombreusuario: r['usuario_nombres'],
        idrevisor: r['revisiones_idrevisor'],
        nombrerevisor: r['revisor_nombres'],
        comentarios: r['revisiones_comentarios'],
        idestatus: r['revisiones_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return { existe: true, revisionesData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-004',
      );
    }
  }

  public async saveRevision(revision: RevisionesEntity): Promise<RevisionesEntity> {
    try {
      return await this.revisionesRepository.save(revision);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-revisiones-005',
      );
    }
  }

  public async updateRevision(id: number, payload: Partial<RevisionesEntity>): Promise<void> {
    try {
      await this.revisionesRepository.update(id, payload);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-U-revisiones-006',
      );
    }
  }

  public async deleteRevision(id: number): Promise<void> {
    try {
      await this.revisionesRepository.delete(id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-E-revisiones-007',
      );
    }
  }

  public async isExistsRevision(idRow: number): Promise<number> {
    try {
      const query = this.revisionesRepository
        .createQueryBuilder()
        .select('count(*)', 'cuenta')
        .where('id = :idRow', { idRow });
      const unit: any = await query.getRawMany();
      if (!unit) return 0;
      return unit[0].cuenta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-revisiones-008',
      );
    }
  }
}
