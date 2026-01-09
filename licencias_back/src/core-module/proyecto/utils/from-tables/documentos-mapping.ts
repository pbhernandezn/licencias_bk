import { DocumentosEntity } from '../../models/entities/documentos-entity';
import { CreateDocumentoRequest, DocumentosDTO } from '../../models/from-tables/documentos-dto';

export class DocumentosMapping {
  public static createRequestToEntity(
    payload: CreateDocumentoRequest,
    urlarchivo: string,
    nombreblob: string
  ): DocumentosEntity {
    const entity = new DocumentosEntity();
    entity.idusuario = payload.idusuario;
    entity.idsolicitud = payload.idsolicitud;
    entity.idtipodocumento = payload.idtipodocumento;
    entity.formato = payload.formato;
    entity.nombreoriginal = payload.nombreoriginal;
    entity.tamanio = payload.tamanio;
    entity.urlarchivo = urlarchivo;
    entity.nombreblob = nombreblob;
    entity.idestatus = 1; // Estado inicial
    entity.validacion = 'pendiente';
    entity.validacioncomentarios = '';
    
    return entity;
  }

  public static dTOToEntity(payload: Partial<DocumentosDTO>): DocumentosEntity {
    const entity = new DocumentosEntity();
    entity.id = payload.id;
    entity.idusuario = payload.idusuario;
    entity.idsolicitud = payload.idsolicitud;
    entity.creacion = payload.creacion;
    entity.idtipodocumento = payload.idtipodocumento;
    entity.formato = payload.formato;
    entity.nombreoriginal = payload.nombreoriginal;
    entity.tamanio = payload.tamanio;
    entity.urlarchivo = payload.urlarchivo;
    entity.nombreblob = payload.nombreblob;
    entity.validacionfecha = payload.validacionfecha;
    entity.validacionusuario = payload.validacionusuario;
    entity.validacioncomentarios = payload.validacioncomentarios;
    entity.validacion = payload.validacion;
    entity.idestatus = payload.idestatus;
    
    return entity;
  }
}