import { CatCPEntity } from '../../models/entities/catCP-entity';
import { CatCPDTO } from '../../models/from-tables/catCP-dto';

export class CatCPMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'cp', campo: '"cp"' },
      { alias: 'municipio', campo: '"municipio"' },
      { alias: 'localidad', campo: '"localidad"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('cp', 'cp')
      .addSelect('municipio', 'municipio')
      .addSelect('localidad', 'localidad');
  }

  public static dTOToEntity(payload: Partial<CatCPDTO>) {
    const unit = new CatCPEntity();
    unit.id = payload.id;
    unit.cp = payload.cp;
    unit.municipio = payload.municipio;
    unit.localidad = payload.localidad;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatCPEntity>) {
    const unit = new CatCPDTO();
    unit.id = payload.id;
    unit.cp = payload.cp;
    unit.municipio = payload.municipio;
    unit.localidad = payload.localidad;
    
    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatCPEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatCPDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
