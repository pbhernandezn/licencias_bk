import { CatDocumentosEntity } from '../../models/entities/catDocumentos-entity';
import { CatDocumentosDTO } from '../../models/from-tables/catDocumentos-dto';

export class CatDocumentosMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'documento', campo: '"documento"' },
      { alias: 'descripcion', campo: '"descripcion"' },
      { alias: 'idestatus', campo: '"idestatus"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('documento', 'documento')
      .addSelect('descripcion', 'descripcion')
      .addSelect('idestatus', 'idestatus');
  }

  public static dTOToEntity(payload: Partial<CatDocumentosDTO>) {
    const unit = new CatDocumentosEntity();
    unit.id = payload.id;
    unit.documento = payload.documento;
    unit.descripcion = payload.descripcion;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatDocumentosEntity>) {
    const unit = new CatDocumentosDTO();
    unit.id = payload.id;
    unit.documento = payload.documento;
    unit.descripcion = payload.descripcion;
    unit.idestatus = payload.idestatus;
    
    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatDocumentosEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatDocumentosDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
