import { ApiProperty } from "@nestjs/swagger";

export class CatPruebasDTO {
    id: number;
    prueba: string;
    descripcion: string;
    presencial: boolean;
    idestatus: number;
}

export class getCatPruebasByIdDTO {
  existe: boolean;
  catPruebas?: CatPruebasDataDTO;
}

export class CatPruebasDataDTO {
  id: number;
  prueba: string;
  descripcion: string;
  presencial: boolean;
  idestatus: number;
  estatus: string;
}

export class getCatPruebaByIdReq {
  @ApiProperty({ description: 'ID del catalogo de pruebas a buscar', example: 1 })
  id: number;
}
 