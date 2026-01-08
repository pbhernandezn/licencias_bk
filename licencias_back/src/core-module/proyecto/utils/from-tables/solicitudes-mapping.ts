import { SolicitudesEntity } from "../../models/entities/solicitudes-entity";
import { SolicitudesDTO } from "../../models/from-tables/solicitudes-dto";

export class SolicitudesMapping {
  public static aliasConfig() {
    return [
        { alias: 'id', campo: '"id"' },
        { alias: 'idusuario', campo: '"idusuario"' },
        { alias: 'creacion', campo: '"creacion"' },
        { alias: 'modificacion', campo: '"modificacion"' },
        { alias: 'idtipolicencia', campo: '"idtipolicencia"' },
        { alias: 'numerolicencia', campo: '"numerolicencia"' },
        { alias: 'expedicion', campo: '"expedicion"' },
        { alias: 'vigencia', campo: '"vigencia"' },
        { alias: 'idestatus', campo: '"idestatus"' },
    ];
  }

  public static aliasConfigDetail(queryBuilder: any) {
    queryBuilder
      .select('id', 'id')
      .addSelect('idusuario', 'idusuario')
      .addSelect('creacion', 'creacion')
      .addSelect('modificacion', 'modificacion')
      .addSelect('idtipolicencia', 'idtipolicencia')
      .addSelect('numerolicencia', 'numerolicencia')
      .addSelect('expedicion', 'expedicion')
      .addSelect('vigencia', 'vigencia')
      .addSelect('idestatus', 'idestatus');
  }
/*
  public static dTOToEntity(payload: Partial<SolicitudesDTO>) {
    const unit = new SolicitudesEntity();
    unit.id = payload.id;
    unit.idusuario = payload.idusuario;
    unit.creacion = payload.creacion;
    unit.modificacion = payload.modificacion;
    unit.idtipolicencia = payload.idtipolicencia;
    unit.numerolicencia = payload.numerolicencia;
    unit.expedicion = payload.expedicion;
    unit.vigencia = payload.vigencia;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static entityToDTO(payload: Partial<SolicitudesEntity>) {
    const unit = new SolicitudesDTO();
    unit.id = payload.id;
    unit.idusuario = payload.idusuario;
    unit.creacion = payload.creacion;
    unit.modificacion = payload.modificacion;
    unit.idtipolicencia = payload.idtipolicencia;
    unit.numerolicencia = payload.numerolicencia;
    unit.expedicion = payload.expedicion;
    unit.vigencia = payload.vigencia;
    unit.idestatus = payload.idestatus;

    return unit;
  }

  public static arrayEntityToDTO(payload: Array<Partial<SolicitudesEntity>>) {
    const mapping = payload.map(this.entityToDTO.bind(this));
    return mapping;
  }

  public static arrayDTOToEntity(payload: Array<Partial<SolicitudesDTO>>) {
    const mapping = payload.map(this.dTOToEntity.bind(this));
    return mapping;
  }
    */
}
