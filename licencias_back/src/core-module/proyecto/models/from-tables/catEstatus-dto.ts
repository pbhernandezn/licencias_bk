import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CatEstatusDTO {
    id: number;
    estatus: string;
    tabla: string;
    activo: boolean;
}

export class getCatEstatusByIdDTO {
  existe: boolean;
  catEstatus?: CatEstatusDTO;
}

export class getCatEstatusByTablaDTO {
  existe: boolean;
  catEstatus: Array<CatEstatusDTO>;
}

export class getCatEstatusByIdReq {
  @ApiProperty({ description: 'ID del catalogo de estatus a buscar', example: 1 })
  id: number;
}

export class getCatEstatusByTablaReq {
  @ApiProperty({ description: 'Estatus por tabla', example: 'cat_prueba' })
  tabla: string;
}