import { ApiProperty } from "@nestjs/swagger";

export class CatVigenciaDTO {
    id: number;
    vigencia: string;
    descripcion: string;
    anios: number;
    idestatus: number;
}

export class getCatVigenciaByIdDTO {
  existe: boolean;
  catVigencia?: CatVigenciaDataDTO;
}

export class CatVigenciaDataDTO {
  id: number;
  vigencia: string;
  descripcion: string;
  anios: number;
  idestatus: number;
  estatus: string;
}

export class getCatVigenciaByIdReq {
  @ApiProperty({ description: 'ID del catalogo de vigencias a buscar', example: 1 })
  id: number;
}
  