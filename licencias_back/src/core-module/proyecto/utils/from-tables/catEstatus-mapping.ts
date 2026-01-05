import { CatEstatusEntity } from '../../models/entities/catEstatus-entity';
import { CatEstatusDTO } from '../../models/from-tables/catEstatus-dto';

export class CatEstatusMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'estatus', campo: '"estatus"' },
      { alias: 'tabla', campo: '"tabla"' },
      { alias: 'activo', campo: '"activo"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('estatus', 'estatus')
      .addSelect('tabla', 'tabla')
      .addSelect('activo', 'activo');
  }

  public static dTOToEntity(payload: Partial<CatEstatusDTO>) {
    const unit = new CatEstatusEntity();
    unit.id = payload.id;
    unit.estatus = payload.estatus;
    unit.tabla = payload.tabla;
    unit.activo = payload.activo;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatEstatusEntity>) {
    const unit = new CatEstatusDTO();
    unit.id = payload.id;
    unit.estatus = payload.estatus;
    unit.tabla = payload.tabla;
    unit.activo = payload.activo;
    
    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatEstatusEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatEstatusDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
