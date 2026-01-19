import { ApiProperty } from "@nestjs/swagger";

export class CatLugaresDTO {
  id: number;
  lugar: string;
  direccion: string;
  horario: string;
  telefono: string;
  idestatus: number;
}

export class getCatLugaresByIdDTO {
  existe: boolean;
  catLugares?: CatLugaresDataDTO;
}

export class CatLugaresDataDTO {
  id: number;
  lugar: string;
  direccion: string;
  horario: string;
  telefono: string;
  idestatus: number;
  estatus: string;
}

export class getCatLugarByIdReq {
  @ApiProperty({ description: 'ID del catalogo de lugares a buscar', example: 1 })
  id: number;
}