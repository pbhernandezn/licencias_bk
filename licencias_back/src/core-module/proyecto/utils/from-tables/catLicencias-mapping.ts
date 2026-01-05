import { CatLicenciasEntity } from '../../models/entities/catLicencias-entity';
import { CatLicenciasDTO } from '../../models/from-tables/catLicencias-dto';

export class CatLicenciasMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'licencia', campo: '"licencia"' },
      { alias: 'descripcion', campo: '"descripcion"' },
      { alias: 'vigencia', campo: '"vigencia"' },
      { alias: 'idestatus', campo: '"idestatus"' },
      { alias: 'precio', campo: '"precio"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('licencia', 'licencia')
      .addSelect('descripcion', 'descripcion')
      .addSelect('vigencia', 'vigencia')
      .addSelect('idestatus', 'idestatus')
      .addSelect('precio', 'precio');
  }

  public static dTOToEntity(payload: Partial<CatLicenciasDTO>) {
    const unit = new CatLicenciasEntity();
    unit.id = payload.id;
    unit.licencia = payload.licencia;
    unit.descripcion = payload.descripcion;
    unit.vigencia = payload.vigencia;
    unit.idestatus = payload.idestatus;
    unit.precio = payload.precio;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatLicenciasEntity>) {
    const unit = new CatLicenciasDTO();
    unit.id = payload.id;
    unit.licencia = payload.licencia;
    unit.descripcion = payload.descripcion;
    unit.vigencia = payload.vigencia;
    unit.idestatus = payload.idestatus;
    unit.precio = payload.precio;
    
    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatLicenciasEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatLicenciasDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
