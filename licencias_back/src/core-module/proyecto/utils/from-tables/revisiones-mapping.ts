import { RevisionesEntity } from '../../models/entities/revisiones-entity';
import { CreateRevisionRequest, RevisionesDTO, UpdateRevisionRequest } from '../../models/from-tables/revisiones-dto';

export class RevisionesMapping {
  public static createRequestToEntity(payload: CreateRevisionRequest): RevisionesEntity {
    const entity = new RevisionesEntity();
    entity.idsolicitud = payload.idsolicitud;
    entity.idrevisor = payload.idrevisor;
    entity.comentarios = payload.comentarios || '';
    entity.idestatus = payload.idestatus;
    
    return entity;
  }

  public static updateRequestToEntity(payload: UpdateRevisionRequest): Partial<RevisionesEntity> {
    const entity: Partial<RevisionesEntity> = {};
    
    if (payload.comentarios !== undefined) {
      entity.comentarios = payload.comentarios;
    }
    
    if (payload.idestatus !== undefined) {
      entity.idestatus = payload.idestatus;
    }
    
    return entity;
  }

  public static dTOToEntity(payload: Partial<RevisionesDTO>): RevisionesEntity {
    const entity = new RevisionesEntity();
    entity.id = payload.id;
    entity.creacion = payload.creacion;
    entity.modificacion = payload.modificacion;
    entity.idsolicitud = payload.idsolicitud;
    entity.idrevisor = payload.idrevisor;
    entity.comentarios = payload.comentarios;
    entity.idestatus = payload.idestatus;
    
    return entity;
  }

  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'creacion', campo: '"creacion"' },
      { alias: 'modificacion', campo: '"modificacion"' },
      { alias: 'idsolicitud', campo: '"idsolicitud"' },
      { alias: 'idrevisor', campo: '"idrevisor"' },
      { alias: 'comentarios', campo: '"comentarios"' },
      { alias: 'idestatus', campo: '"idestatus"' },
    ];
  }
}
