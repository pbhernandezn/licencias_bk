import { CatPruebasEntity } from '../../models/entities/catPruebas-entity';
import { CatPruebasDTO } from '../../models/from-tables/catPruebas-dto';

export class CatPruebasMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'prueba', campo: '"prueba"' },
      { alias: 'descripcion', campo: '"descripcion"' },
      { alias: 'presencial', campo: '"presencial"' },
      { alias: 'idestatus', campo: '"idestatus"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('prueba', 'prueba')
      .addSelect('descripcion', 'descripcion')
      .addSelect('presencial', 'presencial')
      .addSelect('idestatus', 'idestatus');
  }

  public static dTOToEntity(payload: Partial<CatPruebasDTO>) {
    const unit = new CatPruebasEntity();
    unit.id = payload.id;
    unit.prueba = payload.prueba;
    unit.descripcion = payload.descripcion;
    unit.presencial = payload.presencial;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatPruebasEntity>) {
    const unit = new CatPruebasDTO();
    unit.id = payload.id;
    unit.prueba = payload.prueba;
    unit.descripcion = payload.descripcion;
    unit.presencial = payload.presencial;
    unit.idestatus = payload.idestatus;
    
    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatPruebasEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatPruebasDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
