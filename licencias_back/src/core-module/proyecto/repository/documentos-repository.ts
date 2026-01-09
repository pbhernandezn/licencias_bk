import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { DocumentosEntity } from '../models/entities/documentos-entity';
import { 
  CreateDocumentoRequest, 
  getDocumentoByIdDTO, 
  getDocumentoByIdReq, 
  getDocumentosByUsuarioReq,
  getDocumentosBySolicitudReq,
  getDocumentosDTO,
  DocumentosDataDTO 
} from '../models/from-tables/documentos-dto';
import { DocumentosMapping } from '../utils/from-tables/documentos-mapping';

@Injectable()
export class DocumentosRepository {
  constructor(
    @InjectRepository(DocumentosEntity)
    private readonly documentosRepository: Repository<DocumentosEntity>,
  ) {}

  public async getDocumentos(queryParams: QueryParams): Promise<getDocumentosDTO> {
    try {
      const result: any[] = await this.documentosRepository
        .createQueryBuilder('documentos')
        .leftJoin('usuarios', 'usuarios', 'documentos.idusuario = usuarios.id')
        .leftJoin('solicitudes', 'solicitudes', 'documentos.idsolicitud = solicitudes.id')
        .leftJoin('cat_documentos', 'cat_documentos', 'documentos.idtipodocumento = cat_documentos.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND documentos.idestatus = estatus.id', 
          { tabla: 'documentos' })
        .select([
          'documentos.id',
          'documentos.idusuario',
          'usuarios.nombres AS usuarios_nombres',
          'documentos.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'documentos.creacion',
          'documentos.idtipodocumento',
          'cat_documentos.documento AS tipodocumento_nombre',
          'documentos.formato',
          'documentos.nombreoriginal',
          'documentos.tamanio',
          'documentos.validacionfecha',
          'documentos.validacionusuario',
          'documentos.validacioncomentarios',
          'documentos.validacion',
          'documentos.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, documentosData: [] };
      }

      const documentosData: Array<DocumentosDataDTO> = result.map((r) => ({
        id: r['documentos_id'],
        idusuario: r['documentos_idusuario'],
        nombreusuario: r['usuarios_nombres'],
        idsolicitud: r['documentos_idsolicitud'],
        numerosolicitud: r['solicitudes_numero'],
        creacion: r['documentos_creacion'],
        idtipodocumento: r['documentos_idtipodocumento'],
        tipodocumento: r['tipodocumento_nombre'],
        formato: r['documentos_formato'],
        nombreoriginal: r['documentos_nombreoriginal'],
        tamanio: r['documentos_tamanio'],
        urlarchivo: r['documentos_urlarchivo'],
        nombreblob: r['documentos_nombreblob'],
        validacionfecha: r['documentos_validacionfecha'],
        validacionusuario: r['documentos_validacionusuario'],
        validacioncomentarios: r['documentos_validacioncomentarios'],
        validacion: r['documentos_validacion'],
        idestatus: r['documentos_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return { existe: true, documentosData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-documentos-001',
      );
    }
  }

  public async getDocumentoById(request: getDocumentoByIdReq): Promise<getDocumentoByIdDTO> {
    try {
      const result = await this.documentosRepository
        .createQueryBuilder('documentos')
        .leftJoin('usuarios', 'usuarios', 'documentos.idusuario = usuarios.id')
        .leftJoin('solicitudes', 'solicitudes', 'documentos.idsolicitud = solicitudes.id')
        .leftJoin('cat_documentos', 'cat_documentos', 'documentos.idtipodocumento = cat_documentos.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND documentos.idestatus = estatus.id',
          { tabla: 'documentos' })
        .select([
          'documentos.id',
          'documentos.idusuario',
          'usuarios.nombres AS usuarios_nombres',
          'documentos.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'documentos.creacion',
          'documentos.idtipodocumento',
          'cat_documentos.documento AS tipodocumento_nombre',
          'documentos.formato',
          'documentos.nombreoriginal',
          'documentos.tamanio',
          'documentos.urlarchivo',
          'documentos.nombreblob',
          'documentos.validacionfecha',
          'documentos.validacionusuario',
          'documentos.validacioncomentarios',
          'documentos.validacion',
          'documentos.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .where('documentos.id = :id', { id: request.id })
        .getRawOne();

      const documentoDTO: getDocumentoByIdDTO = {
        existe: !!result,
        documentoData: result ? {
          id: result['documentos_id'],
          idusuario: result['documentos_idusuario'],
          nombreusuario: result['usuarios_nombres'],
          idsolicitud: result['documentos_idsolicitud'],
          numerosolicitud: result['solicitudes_numero'],
          creacion: result['documentos_creacion'],
          idtipodocumento: result['documentos_idtipodocumento'],
          tipodocumento: result['tipodocumento_nombre'],
          formato: result['documentos_formato'],
          nombreoriginal: result['documentos_nombreoriginal'],
          tamanio: result['documentos_tamanio'],
          urlarchivo: result['documentos_urlarchivo'],
          nombreblob: result['documentos_nombreblob'],
          validacionfecha: result['documentos_validacionfecha'],
          validacionusuario: result['documentos_validacionusuario'],
          validacioncomentarios: result['documentos_validacioncomentarios'],
          validacion: result['documentos_validacion'],
          idestatus: result['documentos_idestatus'],
          estatus: result['estatus_estatus'],
        } : undefined,
      };

      return documentoDTO;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-documentos-002',
      );
    }
  }

  public async getDocumentosByUsuario(request: getDocumentosByUsuarioReq): Promise<getDocumentosDTO> {
    try {
      const result: any[] = await this.documentosRepository
        .createQueryBuilder('documentos')
        .leftJoin('usuarios', 'usuarios', 'documentos.idusuario = usuarios.id')
        .leftJoin('solicitudes', 'solicitudes', 'documentos.idsolicitud = solicitudes.id')
        .leftJoin('cat_documentos', 'cat_documentos', 'documentos.idtipodocumento = cat_documentos.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND documentos.idestatus = estatus.id',
          { tabla: 'documentos' })
        .where('documentos.idusuario = :idusuario', { idusuario: request.idusuario })
        .select([
          'documentos.id',
          'documentos.idusuario',
          'usuarios.nombres AS usuarios_nombres',
          'documentos.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'documentos.creacion',
          'documentos.idtipodocumento',
          'cat_documentos.documento AS tipodocumento_nombre',
          'documentos.formato',
          'documentos.nombreoriginal',
          'documentos.tamanio',
          'documentos.urlarchivo',
          'documentos.nombreblob',
          'documentos.validacionfecha',
          'documentos.validacionusuario',
          'documentos.validacioncomentarios',
          'documentos.validacion',
          'documentos.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, documentosData: [] };
      }

      const documentosData: Array<DocumentosDataDTO> = result.map((r) => ({
        id: r['documentos_id'],
        idusuario: r['documentos_idusuario'],
        nombreusuario: r['usuarios_nombres'],
        idsolicitud: r['documentos_idsolicitud'],
        numerosolicitud: r['solicitudes_numero'],
        creacion: r['documentos_creacion'],
        idtipodocumento: r['documentos_idtipodocumento'],
        tipodocumento: r['tipodocumento_nombre'],
        formato: r['documentos_formato'],
        nombreoriginal: r['documentos_nombreoriginal'],
        tamanio: r['documentos_tamanio'],
        urlarchivo: r['documentos_urlarchivo'],
        nombreblob: r['documentos_nombreblob'],
        validacionfecha: r['documentos_validacionfecha'],
        validacionusuario: r['documentos_validacionusuario'],
        validacioncomentarios: r['documentos_validacioncomentarios'],
        validacion: r['documentos_validacion'],
        idestatus: r['documentos_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return { existe: true, documentosData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-documentos-003',
      );
    }
  }

  public async getDocumentosBySolicitud(request: getDocumentosBySolicitudReq): Promise<getDocumentosDTO> {
    try {
      const result: any[] = await this.documentosRepository
        .createQueryBuilder('documentos')
        .leftJoin('usuarios', 'usuarios', 'documentos.idusuario = usuarios.id')
        .leftJoin('solicitudes', 'solicitudes', 'documentos.idsolicitud = solicitudes.id')
        .leftJoin('cat_documentos', 'cat_documentos', 'documentos.idtipodocumento = cat_documentos.id')
        .leftJoin('cat_estatus', 'estatus', 'estatus.tabla = :tabla AND documentos.idestatus = estatus.id',
          { tabla: 'documentos' })
        .where('documentos.idsolicitud = :idsolicitud', { idsolicitud: request.idsolicitud })
        .select([
          'documentos.id',
          'documentos.idusuario',
          'usuarios.nombres AS usuarios_nombres',
          'documentos.idsolicitud',
          'solicitudes.numerolicencia AS solicitudes_numero',
          'documentos.creacion',
          'documentos.idtipodocumento',
          'cat_documentos.documento AS tipodocumento_nombre',
          'documentos.formato',
          'documentos.nombreoriginal',
          'documentos.tamanio',
          'documentos.urlarchivo',
          'documentos.nombreblob',
          'documentos.validacionfecha',
          'documentos.validacionusuario',
          'documentos.validacioncomentarios',
          'documentos.validacion',
          'documentos.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) {
        return { existe: false, documentosData: [] };
      }

      const documentosData: Array<DocumentosDataDTO> = result.map((r) => ({
        id: r['documentos_id'],
        idusuario: r['documentos_idusuario'],
        nombreusuario: r['usuarios_nombres'],
        idsolicitud: r['documentos_idsolicitud'],
        numerosolicitud: r['solicitudes_numero'],
        creacion: r['documentos_creacion'],
        idtipodocumento: r['documentos_idtipodocumento'],
        tipodocumento: r['tipodocumento_nombre'],
        formato: r['documentos_formato'],
        nombreoriginal: r['documentos_nombreoriginal'],
        tamanio: r['documentos_tamanio'],
        urlarchivo: r['documentos_urlarchivo'],
        nombreblob: r['documentos_nombreblob'],
        validacionfecha: r['documentos_validacionfecha'],
        validacionusuario: r['documentos_validacionusuario'],
        validacioncomentarios: r['documentos_validacioncomentarios'],
        validacion: r['documentos_validacion'],
        idestatus: r['documentos_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return { existe: true, documentosData };
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-documentos-004',
      );
    }
  }

  public async saveDocumento(documento: DocumentosEntity): Promise<void> {
    try {
      await this.documentosRepository.save(documento);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-documentos-005',
      );
    }
  }

  public async deleteDocumento(id: number): Promise<void> {
    try {
      await this.documentosRepository.delete(id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-E-documentos-006',
      );
    }
  }
}