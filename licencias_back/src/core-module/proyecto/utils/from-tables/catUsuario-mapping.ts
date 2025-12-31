import { CatUsuarioEntity } from '../../models/entities/catUsuario-entity';
import { CatUsuarioDTO } from '../../models/from-tables/catUsuario-dto';

export class CatUsuarioMapping {
  public static aliasConfig() {
    return [
      { alias: 'id', campo: '"id"' },
      { alias: 'usuario', campo: '"usuario"' },
      { alias: 'descripcion', campo: '"descripcion"' },
      { alias: 'idestatus', campo: '"idestatus"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('usuario', 'usuario')
      .addSelect('descripcion', 'descripcion')
      .addSelect('idestatus', 'idestatus');
  }

  public static dTOToEntity(payload: Partial<CatUsuarioDTO>) {
    const unit = new CatUsuarioEntity();
    unit.id = payload.id;
    unit.usuario = payload.usuario;
    unit.descripcion = payload.descripcion;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static entityToDTO(payload: Partial<CatUsuarioEntity>) {
    const unit = new CatUsuarioDTO();
    unit.id = payload.id;
    unit.usuario = payload.usuario;
    unit.descripcion = payload.descripcion;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<CatUsuarioEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<CatUsuarioDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
}
