import { ApiProperty } from "@nestjs/swagger";

export class CatUsuarioDTO {
  id: number;
  usuario: string;
  descripcion: string;
  idestatus: number;
}

export class getCatUsuarioByIdDTO {
  existe: boolean;
  catUsuario?: CatUsuariosDataDTO;
}

export class CatUsuariosDataDTO {
  id: number;
  usuario: string;
  descripcion: string;
  idestatus: number;
  estatus: string;
}

export class getCatUsuarioByIdReq {
  @ApiProperty({ description: 'ID del catalogo de usuario a buscar', example: 1 })
  id: number;
}
