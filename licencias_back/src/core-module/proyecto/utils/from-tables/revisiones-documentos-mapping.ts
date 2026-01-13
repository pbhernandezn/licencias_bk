import { RevisionesDocumentosEntity } from '../../models/entities/revisiones-documentos-entity';
import { 
  CreateRevisionDocumentosRequest, 
  RevisionesDocumentosDTO,
  UpdateRevisionDocumentoRequest,
  DocumentoRevisionItem
} from '../../models/from-tables/revisiones-documentos-dto';

export class RevisionesDocumentosMapping {
  public static createRequestToEntity(
    idrevision: number,
    documento: DocumentoRevisionItem
  ): RevisionesDocumentosEntity {
    const entity = new RevisionesDocumentosEntity();
    entity.idrevision = idrevision;
    entity.iddocumento = documento.iddocumento;
    entity.comentarios = documento.comentarios || '';
    entity.idestatus = documento.idestatus;
    
    return entity;
  }

  public static updateRequestToEntity(payload: UpdateRevisionDocumentoRequest): Partial<RevisionesDocumentosEntity> {
    const entity: Partial<RevisionesDocumentosEntity> = {};
    
    if (payload.comentarios !== undefined) {
      entity.comentarios = payload.comentarios;
    }
    
    if (payload.idestatus !== undefined) {
      entity.idestatus = payload.idestatus;
    }
    
    return entity;
  }

  public static dTOToEntity(payload: Partial<RevisionesDocumentosDTO>): RevisionesDocumentosEntity {
    const entity = new RevisionesDocumentosEntity();
    entity.id = payload.id;
    entity.idrevision = payload.idrevision;
    entity.iddocumento = payload.iddocumento;
    entity.comentarios = payload.comentarios;
    entity.idestatus = payload.idestatus;
    entity.creacion = payload.creacion;
    entity.modificacion = payload.modificacion;
    
    return entity;
  }

  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'idrevision', campo: '"idrevision"' },
      { alias: 'iddocumento', campo: '"iddocumento"' },
      { alias: 'comentarios', campo: '"comentarios"' },
      { alias: 'idestatus', campo: '"idestatus"' },
      { alias: 'creacion', campo: '"creacion"' },
      { alias: 'modificacion', campo: '"modificacion"' },
    ];
  }
}
