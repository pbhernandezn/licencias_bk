import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CatCPDTO {
  id: number;
  cp: string;
  municipio: string;
  localidad: string;
}

export class getCatCPByIdDTO {
  existe: boolean;
  catCP?: CatCPDTO;
}

export class getLocalidadesByCPDTO {
  existe: boolean;
  catCPs: Array<CatCPDTO>;
}

export class getCatCPByIdReq {
  @ApiProperty({ description: 'ID del catalogo de CP a buscar', example: 1 })
  id: number;
}

export class getLocalidadByCPReq {
  @ApiProperty({ description: 'Localidad a buscar por CP', example: '34000' })
  cp: string;
}