import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class RevisionesDTO {
  id: number;
  creacion: string;
  modificacion: string;
  idsolicitud: number;
  idrevisor: number;
  comentarios: string;
  idestatus: number;
}

export class getRevisionByIdDTO {
  existe: boolean;
  revisionData?: RevisionesDataDTO;
}

export class getRevisionesDTO {
  existe: boolean;
  revisionesData: Array<RevisionesDataDTO>;
}

export class RevisionesDataDTO {
  id: number;
  creacion: string;
  modificacion: string;
  idsolicitud: number;
  numerosolicitud: string;
  nombreusuario: string;
  idrevisor: number;
  nombrerevisor: string;
  comentarios: string;
  idestatus: number;
  estatus: string;
}

export class getRevisionByIdReq {
  @ApiProperty({ description: 'ID de la revisión.', example: 1 })
  id: number;
}

export class getRevisionesBySolicitudReq {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  idsolicitud: number;
}

export class getRevisionesByRevisorReq {
  @ApiProperty({ description: 'ID del revisor', example: 1 })
  idrevisor: number;
}

export class CreateRevisionRequest {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @IsInt()
  idsolicitud: number;

  @ApiProperty({ description: 'ID del revisor', example: 1 })
  @IsInt()
  idrevisor: number;

  @ApiProperty({ description: 'Comentarios de la revisión', example: 'Documento aprobado' })
  @IsString()
  @IsOptional()
  comentarios?: string;

  @ApiProperty({ description: 'ID del estatus de la revisión', example: 1 })
  @IsInt()
  idestatus: number;
}

export class UpdateRevisionRequest {
  @ApiProperty({ description: 'ID de la revisión', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Comentarios de la revisión', example: 'Requiere correcciones' })
  @IsString()
  @IsOptional()
  comentarios?: string;

  @ApiProperty({ description: 'ID del estatus de la revisión', example: 2 })
  @IsInt()
  @IsOptional()
  idestatus?: number;
}

export class DeleteRevisionReq {
  @ApiProperty({ description: 'ID de la revisión a eliminar', example: 1 })
  @IsInt()
  id: number;
}