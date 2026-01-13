import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { RevisionesDocumentosEntity } from '../models/entities/revisiones-documentos-entity';
import { 
  getRevisionDocumentoByIdDTO, 
  getRevisionDocumentoByIdReq, 
  getRevisionesDocumentosByRevisionReq,
  getRevisionesDocumentosByDocumentoReq,
  getRevisionesDocumentosDTO,
  RevisionesDocumentosDataDTO,
  RevisionConDocumentosDTO
} from '../models/from-tables/revisiones-documentos-dto';

@Injectable()
export class RevisionesDocumentosRepository {
  constructor(
    @InjectRepository(RevisionesDocumentosEntity)
    private readonly revisionesDocumentosRepository: Repository<RevisionesDocumentosEntity>,
  ) {}

  public async getRevisionesDocumentos(queryParams: QueryParams): Promise<getRevisionesDocumentosDTO> {
    try {
      const result: any[] = await this.revisionesDocumentosRepository
        .createQueryBuilder('rd')
        .leftJoin('revisiones', 'rev', 'rd.idrevision = rev.id')
        .leftJoin('solicitudes', 'sol', 'rev.idsolicitud = sol.id')
        .leftJoin('usuarios', 'revisor', 'rev.idrevisor = revisor.id')
        .leftJoin('usuarios', 'usuario_sol', 'sol.idusuario = usuario_sol.id')
        .leftJoin('documentos', 'doc', 'rd.iddocumento = doc.id')
        .leftJoin('cat_documentos', 'cat_doc', 'doc.idtipodocumento = cat_doc.id')
        .leftJoin('cat_estatus', 'estatus_doc', 'estatus_doc.tabla = :tabla AND rd.idestatus = estatus_doc.id',
          { tabla: 'revisiones_documentos' })
        .select([
          'rd.id',
          'rd.idrevision',
          'rd.iddocumento',
          'sol.numerolicencia AS solicitud_numero',
          'revisor.nombres AS revisor_nombres',
          'usuario_sol.nombres AS usuario_nombres',
          'cat_doc.documento AS tipo_documento',
          'doc.nombreoriginal',
          'doc.urlarchivo',
          'rd.comentarios',
          'rd.idestatus',
          'estatus_doc.estatus AS estatus_documento',
          'rd.creacion',
          'rd.modificacion',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, revisionesDocumentosData: [] };
      }

      const revisionesDocumentosData: Array<RevisionesDocumentosDataDTO> = result.map((r) => ({
        id: r['rd_id'],
        idrevision: r['rd_idrevision'],
        iddocumento: r['rd_iddocumento'],
        numerosolicitud: r['solicitud_numero'],
        nombrerevisor: r['revisor_nombres'],
        nombreusuario: r['usuario_nombres'],
        tipodocumento: r['tipo_documento'],
        nombreoriginal: r['nombreoriginal'],
        urlarchivo: r['urlarchivo'],
        comentarios: r['rd_comentarios'],
        idestatus: r['rd_idestatus'],
        estatusdocumento: r['estatus_documento'],
        creacion: r['rd_creacion'],
        modificacion: r['rd_modificacion'],
      }));

      return { existe: true, revisionesDocumentosData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-documentos-001',
      );
    }
  }

  public async getRevisionDocumentoById(request: getRevisionDocumentoByIdReq): Promise<getRevisionDocumentoByIdDTO> {
    try {
      const result = await this.revisionesDocumentosRepository
        .createQueryBuilder('rd')
        .leftJoin('revisiones', 'rev', 'rd.idrevision = rev.id')
        .leftJoin('solicitudes', 'sol', 'rev.idsolicitud = sol.id')
        .leftJoin('usuarios', 'revisor', 'rev.idrevisor = revisor.id')
        .leftJoin('usuarios', 'usuario_sol', 'sol.idusuario = usuario_sol.id')
        .leftJoin('documentos', 'doc', 'rd.iddocumento = doc.id')
        .leftJoin('cat_documentos', 'cat_doc', 'doc.idtipodocumento = cat_doc.id')
        .leftJoin('cat_estatus', 'estatus_doc', 'estatus_doc.tabla = :tabla AND rd.idestatus = estatus_doc.id',
          { tabla: 'revisiones_documentos' })
        .select([
          'rd.id',
          'rd.idrevision',
          'rd.iddocumento',
          'sol.numerolicencia AS solicitud_numero',
          'revisor.nombres AS revisor_nombres',
          'usuario_sol.nombres AS usuario_nombres',
          'cat_doc.documento AS tipo_documento',
          'doc.nombreoriginal',
          'doc.urlarchivo',
          'rd.comentarios',
          'rd.idestatus',
          'estatus_doc.estatus AS estatus_documento',
          'rd.creacion',
          'rd.modificacion',
        ])
        .where('rd.id = :id', { id: request.id })
        .getRawOne();

      const revisionDocumentoDTO: getRevisionDocumentoByIdDTO = {
        existe: !!result,
        revisionDocumentoData: result ? {
          id: result['rd_id'],
          idrevision: result['rd_idrevision'],
          iddocumento: result['rd_iddocumento'],
          numerosolicitud: result['solicitud_numero'],
          nombrerevisor: result['revisor_nombres'],
          nombreusuario: result['usuario_nombres'],
          tipodocumento: result['tipo_documento'],
          nombreoriginal: result['nombreoriginal'],
          urlarchivo: result['urlarchivo'],
          comentarios: result['rd_comentarios'],
          idestatus: result['rd_idestatus'],
          estatusdocumento: result['estatus_documento'],
          creacion: result['rd_creacion'],
          modificacion: result['rd_modificacion'],
        } : undefined,
      };

      return revisionDocumentoDTO;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-documentos-002',
      );
    }
  }

  public async getRevisionesDocumentosByRevision(request: getRevisionesDocumentosByRevisionReq): Promise<getRevisionesDocumentosDTO> {
    try {
      const result: any[] = await this.revisionesDocumentosRepository
        .createQueryBuilder('rd')
        .leftJoin('revisiones', 'rev', 'rd.idrevision = rev.id')
        .leftJoin('solicitudes', 'sol', 'rev.idsolicitud = sol.id')
        .leftJoin('usuarios', 'revisor', 'rev.idrevisor = revisor.id')
        .leftJoin('usuarios', 'usuario_sol', 'sol.idusuario = usuario_sol.id')
        .leftJoin('documentos', 'doc', 'rd.iddocumento = doc.id')
        .leftJoin('cat_documentos', 'cat_doc', 'doc.idtipodocumento = cat_doc.id')
        .leftJoin('cat_estatus', 'estatus_doc', 'estatus_doc.tabla = :tabla AND rd.idestatus = estatus_doc.id',
          { tabla: 'revisiones_documentos' })
        .where('rd.idrevision = :idrevision', { idrevision: request.idrevision })
        .select([
          'rd.id',
          'rd.idrevision',
          'rd.iddocumento',
          'sol.numerolicencia AS solicitud_numero',
          'revisor.nombres AS revisor_nombres',
          'usuario_sol.nombres AS usuario_nombres',
          'cat_doc.documento AS tipo_documento',
          'doc.nombreoriginal',
          'doc.urlarchivo',
          'rd.comentarios',
          'rd.idestatus',
          'estatus_doc.estatus AS estatus_documento',
          'rd.creacion',
          'rd.modificacion',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, revisionesDocumentosData: [] };
      }

      const revisionesDocumentosData: Array<RevisionesDocumentosDataDTO> = result.map((r) => ({
        id: r['rd_id'],
        idrevision: r['rd_idrevision'],
        iddocumento: r['rd_iddocumento'],
        numerosolicitud: r['solicitud_numero'],
        nombrerevisor: r['revisor_nombres'],
        nombreusuario: r['usuario_nombres'],
        tipodocumento: r['tipo_documento'],
        nombreoriginal: r['nombreoriginal'],
        urlarchivo: r['urlarchivo'],
        comentarios: r['rd_comentarios'],
        idestatus: r['rd_idestatus'],
        estatusdocumento: r['estatus_documento'],
        creacion: r['rd_creacion'],
        modificacion: r['rd_modificacion'],
      }));

      return { existe: true, revisionesDocumentosData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-documentos-003',
      );
    }
  }

  public async getRevisionesDocumentosByDocumento(request: getRevisionesDocumentosByDocumentoReq): Promise<getRevisionesDocumentosDTO> {
    try {
      const result: any[] = await this.revisionesDocumentosRepository
        .createQueryBuilder('rd')
        .leftJoin('revisiones', 'rev', 'rd.idrevision = rev.id')
        .leftJoin('solicitudes', 'sol', 'rev.idsolicitud = sol.id')
        .leftJoin('usuarios', 'revisor', 'rev.idrevisor = revisor.id')
        .leftJoin('usuarios', 'usuario_sol', 'sol.idusuario = usuario_sol.id')
        .leftJoin('documentos', 'doc', 'rd.iddocumento = doc.id')
        .leftJoin('cat_documentos', 'cat_doc', 'doc.idtipodocumento = cat_doc.id')
        .leftJoin('cat_estatus', 'estatus_doc', 'estatus_doc.tabla = :tabla AND rd.idestatus = estatus_doc.id',
          { tabla: 'revisiones_documentos' })
        .where('rd.iddocumento = :iddocumento', { iddocumento: request.iddocumento })
        .select([
          'rd.id',
          'rd.idrevision',
          'rd.iddocumento',
          'sol.numerolicencia AS solicitud_numero',
          'revisor.nombres AS revisor_nombres',
          'usuario_sol.nombres AS usuario_nombres',
          'cat_doc.documento AS tipo_documento',
          'doc.nombreoriginal',
          'doc.urlarchivo',
          'rd.comentarios',
          'rd.idestatus',
          'estatus_doc.estatus AS estatus_documento',
          'rd.creacion',
          'rd.modificacion',
        ])
        .orderBy('rd.creacion', 'DESC')
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, revisionesDocumentosData: [] };
      }

      const revisionesDocumentosData: Array<RevisionesDocumentosDataDTO> = result.map((r) => ({
        id: r['rd_id'],
        idrevision: r['rd_idrevision'],
        iddocumento: r['rd_iddocumento'],
        numerosolicitud: r['solicitud_numero'],
        nombrerevisor: r['revisor_nombres'],
        nombreusuario: r['usuario_nombres'],
        tipodocumento: r['tipo_documento'],
        nombreoriginal: r['nombreoriginal'],
        urlarchivo: r['urlarchivo'],
        comentarios: r['rd_comentarios'],
        idestatus: r['rd_idestatus'],
        estatusdocumento: r['estatus_documento'],
        creacion: r['rd_creacion'],
        modificacion: r['rd_modificacion'],
      }));

      return { existe: true, revisionesDocumentosData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-documentos-004',
      );
    }
  }

  public async saveRevisionDocumentos(revisionesDocumentos: RevisionesDocumentosEntity[]): Promise<void> {
    try {
      await this.revisionesDocumentosRepository.save(revisionesDocumentos);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-revisiones-documentos-005',
      );
    }
  }

  public async updateRevisionDocumento(id: number, payload: Partial<RevisionesDocumentosEntity>): Promise<void> {
    try {
      await this.revisionesDocumentosRepository.update(id, payload);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-U-revisiones-documentos-006',
      );
    }
  }

  public async deleteRevisionDocumento(id: number): Promise<void> {
    try {
      await this.revisionesDocumentosRepository.delete(id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-E-revisiones-documentos-007',
      );
    }
  }

  public async isExistsRevisionDocumento(id: number): Promise<number> {
    try {
      const query = this.revisionesDocumentosRepository
        .createQueryBuilder()
        .select('count(*)', 'cuenta')
        .where('id = :id', { id });
      const result: any = await query.getRawMany();
      if (!result) return 0;
      return result[0].cuenta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-revisiones-documentos-008',
      );
    }
  }

  public async getRevisionConDocumentosCompleta(idrevision: number): Promise<RevisionConDocumentosDTO> {
    try {
      const result: any[] = await this.revisionesDocumentosRepository
        .createQueryBuilder('rd')
        .leftJoin('revisiones', 'rev', 'rd.idrevision = rev.id')
        .leftJoin('solicitudes', 'sol', 'rev.idsolicitud = sol.id')
        .leftJoin('usuarios', 'revisor', 'rev.idrevisor = revisor.id')
        .leftJoin('documentos', 'doc', 'rd.iddocumento = doc.id')
        .leftJoin('cat_documentos', 'cat_doc', 'doc.idtipodocumento = cat_doc.id')
        .leftJoin('cat_estatus', 'estatus_rev', 'estatus_rev.tabla = :tablaRev AND rev.idestatus = estatus_rev.id',
          { tablaRev: 'revisiones' })
        .leftJoin('cat_estatus', 'estatus_doc', 'estatus_doc.tabla = :tablaDoc AND rd.idestatus = estatus_doc.id',
          { tablaDoc: 'revisiones_documentos' })
        .where('rd.idrevision = :idrevision', { idrevision })
        .select([
          'rev.id AS idrevision',
          'sol.numerolicencia',
          'revisor.nombres AS revisor_nombres',
          'rev.comentarios AS comentarios_generales',
          'estatus_rev.estatus AS estatus_revision',
          'doc.id AS iddocumento',
          'cat_doc.documento AS tipo_documento',
          'doc.nombreoriginal',
          'doc.urlarchivo',
          'rd.comentarios AS comentarios_documento',
          'rd.idestatus AS idestatus_documento',
          'estatus_doc.estatus AS estatus_documento',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        throw ManejadorErrores.getBusquedaVacia(
          'No se encontró la revisión',
          'TYPE-A-revisiones-documentos-009'
        );
      }

      const revisionCompleta: RevisionConDocumentosDTO = {
        idrevision: result[0]['idrevision'],
        numerosolicitud: result[0]['numerolicencia'],
        nombrerevisor: result[0]['revisor_nombres'],
        comentariosGenerales: result[0]['comentarios_generales'],
        estatusRevision: result[0]['estatus_revision'],
        documentos: result.map(r => ({
          iddocumento: r['iddocumento'],
          tipodocumento: r['tipo_documento'],
          nombreoriginal: r['nombreoriginal'],
          urlarchivo: r['urlarchivo'],
          comentariosDocumento: r['comentarios_documento'],
          idestatusDocumento: r['idestatus_documento'],
          estatusDocumento: r['estatus_documento'],
        })),
      };

      return revisionCompleta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-revisiones-documentos-010',
      );
    }
  }
}
