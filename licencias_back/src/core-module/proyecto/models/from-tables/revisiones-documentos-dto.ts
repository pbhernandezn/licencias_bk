import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsArray } from "class-validator";

export class RevisionesDocumentosDTO {
  id: number;
  idrevision: number;
  iddocumento: number;
  comentarios: string;
  idestatus: number;
  creacion: Date;
  modificacion: Date;
}

export class getRevisionDocumentoByIdDTO {
  existe: boolean;
  revisionDocumentoData?: RevisionesDocumentosDataDTO;
}

export class getRevisionesDocumentosDTO {
  existe: boolean;
  revisionesDocumentosData: Array<RevisionesDocumentosDataDTO>;
}

export class RevisionesDocumentosDataDTO {
  id: number;
  idrevision: number;
  iddocumento: number;
  numerosolicitud: string;
  nombrerevisor: string;
  nombreusuario: string;
  tipodocumento: string;
  nombreoriginal: string;
  urlarchivo: string;
  comentarios: string;
  idestatus: number;
  estatusdocumento: string;
  creacion: Date;
  modificacion: Date;
}

export class getRevisionDocumentoByIdReq {
  @ApiProperty({ description: 'ID de la relación revisión-documento', example: 1 })
  @IsInt()
  id: number;
}

export class getRevisionesDocumentosByRevisionReq {
  @ApiProperty({ description: 'ID de la revisión', example: 1 })
  @IsInt()
  idrevision: number;
}

export class getRevisionesDocumentosByDocumentoReq {
  @ApiProperty({ description: 'ID del documento', example: 1 })
  @IsInt()
  iddocumento: number;
}

export class DocumentoRevisionItem {
  @ApiProperty({ description: 'ID del documento', example: 1 })
  @IsInt()
  iddocumento: number;

  @ApiProperty({ description: 'Comentarios específicos del documento', example: 'Documento aprobado', required: false })
  @IsString()
  @IsOptional()
  comentarios?: string;

  @ApiProperty({ description: 'ID del estatus del documento', example: 1 })
  @IsInt()
  idestatus: number;
}

export class CreateRevisionDocumentosRequest {
  @ApiProperty({ description: 'ID de la revisión', example: 1 })
  @IsInt()
  idrevision: number;

  @ApiProperty({ 
    description: 'Lista de documentos con sus comentarios y estatus',
    type: [DocumentoRevisionItem],
    example: [
      { iddocumento: 1, comentarios: 'INE aprobada', idestatus: 1 },
      { iddocumento: 2, comentarios: 'Comprobante rechazado', idestatus: 2 }
    ]
  })
  @IsArray()
  documentos: DocumentoRevisionItem[];
}

export class UpdateRevisionDocumentoRequest {
  @ApiProperty({ description: 'ID de la relación revisión-documento', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Comentarios actualizados', example: 'Requiere correcciones menores', required: false })
  @IsString()
  @IsOptional()
  comentarios?: string;

  @ApiProperty({ description: 'ID del estatus actualizado', example: 2, required: false })
  @IsInt()
  @IsOptional()
  idestatus?: number;
}

export class DeleteRevisionDocumentoReq {
  @ApiProperty({ description: 'ID de la relación a eliminar', example: 1 })
  @IsInt()
  id: number;
}

// DTO extendido para respuestas completas
export class RevisionConDocumentosDTO {
  idrevision: number;
  numerosolicitud: string;
  nombrerevisor: string;
  comentariosGenerales: string;
  estatusRevision: string;
  documentos: Array<{
    iddocumento: number;
    tipodocumento: string;
    nombreoriginal: string;
    urlarchivo: string;
    comentariosDocumento: string;
    idestatusDocumento: number;
    estatusDocumento: string;
  }>;
}
