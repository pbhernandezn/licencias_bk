import { ApiProperty } from "@nestjs/swagger";

export class CatLicenciasDTO {
    id: number;
    licencia: string;
    descripcion: string;
    vigencia: number;
    idestatus: number;
    precio: string;
}

export class getCatLicenciaByIdDTO {
  existe: boolean;
  catLicencia?: CatLicenciasDataDTO;
}

export class getLicenciasByLicenciaDTO {
  existe: boolean;
  catLicencias: Array<CatLicenciasDataDTO>;
}

export class CatLicenciasDataDTO {
    id: number;
    licencia: string;
    descripcion: string;
    idvigencia: number;
    vigencia: string;
    anios: number;
    idestatus: number;
    estatus: string;
    precio: string;
}

export class getCatLicenciaByIdReq {
  @ApiProperty({ description: 'ID del catalogo de licencia a buscar', example: 1 })
  id: number;
}

export class getLicenciasByLicenciaReq {
  @ApiProperty({ description: 'Licencia a buscar por el catalogo de licencias', example: 'A' })
  licencia: string;
}