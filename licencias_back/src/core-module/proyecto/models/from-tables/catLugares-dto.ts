import { ApiProperty } from "@nestjs/swagger";

export class CatLugaresDTO {
  id: number;
  lugar: string;
  direccion: string;
  horario: number;
  telefono: number;
  idestatus: string;
}

export class getCatLugaresByIdDTO {
  existe: boolean;
  catLugares?: CatLugaresDataDTO;
}

export class CatLugaresDataDTO {
  id: number;
  lugar: string;
  direccion: string;
  horario: number;
  telefono: number;
  idestatus: string;
  estatus: string;
}

export class getCatLugarByIdReq {
  @ApiProperty({ description: 'ID del catalogo de lugares a buscar', example: 1 })
  id: number;
}