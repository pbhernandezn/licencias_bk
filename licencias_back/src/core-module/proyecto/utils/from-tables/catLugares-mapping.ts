import { CatLugaresEntity } from '../../models/entities/catLugares-entity';
import { CatLugaresDTO } from '../../models/from-tables/catLugares-dto';

export class CatLugaresMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'lugar', campo: '"lugar"' },
      { alias: 'direccion', campo: '"direccion"' },
      { alias: 'horario', campo: '"horario"' },
      { alias: 'telefono', campo: '"telefono"' },
      { alias: 'idestatus', campo: '"idestatus"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('lugar', 'lugar')
      .addSelect('direccion', 'direccion')
      .addSelect('horario', 'horario')
      .addSelect('telefono', 'telefono')
      .addSelect('idestatus', 'idestatus');
  }

  public static dTOToEntity(payload: Partial<CatLugaresDTO>) {
    const unit = new CatLugaresEntity();
    unit.id = payload.id;
    unit.lugar = payload.lugar;
    unit.direccion = payload.direccion;
    unit.horario = payload.horario;
    unit.telefono = payload.telefono;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatLugaresEntity>) {
    const unit = new CatLugaresDTO();
    unit.id = payload.id;
    unit.lugar = payload.lugar;
    unit.direccion = payload.direccion;
    unit.horario = payload.horario;
    unit.telefono = payload.telefono;
    unit.idestatus = payload.idestatus;
    
    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatLugaresEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatLugaresDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
