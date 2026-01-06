import { CatVigenciaEntity } from '../../models/entities/catVigencia-entity';
import { CatVigenciaDTO } from '../../models/from-tables/catVigencia-dto';

export class CatVigenciaMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'vigencia', campo: '"vigencia"' },
      { alias: 'descripcion', campo: '"descripcion"' },
      { alias: 'anios', campo: '"anios"' },
      { alias: 'idestatus', campo: '"idestatus"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('vigencia', 'vigencia')
      .addSelect('descripcion', 'descripcion')
      .addSelect('anios', 'anios')
      .addSelect('idestatus', 'idestatus');
  }

  public static dTOToEntity(payload: Partial<CatVigenciaDTO>) {
    const unit = new CatVigenciaEntity();
    unit.id = payload.id;
    unit.vigencia = payload.vigencia;
    unit.descripcion = payload.descripcion;
    unit.anios = payload.anios;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatVigenciaEntity>) {
    const unit = new CatVigenciaDTO();
    unit.id = payload.id;
    unit.vigencia = payload.vigencia;
    unit.descripcion = payload.descripcion;
    unit.anios = payload.anios;
    unit.idestatus = payload.idestatus;
    
    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatVigenciaEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatVigenciaDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
