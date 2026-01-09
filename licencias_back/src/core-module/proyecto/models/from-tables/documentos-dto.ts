import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DocumentosDTO {
  id: number;
  idusuario: number;
  idsolicitud: number;
  creacion: string;
  idtipodocumento: number;
  formato: string;
  nombreoriginal: string;
  tamanio: number;
  urlarchivo: string;
  nombreblob: string;
  validacionfecha: string;
  validacionusuario: number;
  validacioncomentarios: string;
  validacion: string;
  idestatus: number;
}

export class getDocumentoByIdDTO {
  existe: boolean;
  documentoData?: DocumentosDataDTO;
}

export class getDocumentosDTO {
  existe: boolean;
  documentosData: Array<DocumentosDataDTO>;
}

export class DocumentosDataDTO {
  id: number;
  idusuario: number;
  nombreusuario: string;
  idsolicitud: number;
  numerosolicitud: string;
  creacion: string;
  idtipodocumento: number;
  tipodocumento: string;
  formato: string;
  nombreoriginal: string;
  tamanio: number;
  urlarchivo: string;
  nombreblob: string;
  validacionfecha: string;
  validacionusuario: number;
  validacioncomentarios: string;
  validacion: string;
  idestatus: number;
  estatus: string;
}

export class getDocumentoByIdReq {
  @ApiProperty({ description: 'ID del documento.', example: 1 })
  id: number;
}

export class getDocumentosByUsuarioReq {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  idusuario: number;
}

export class getDocumentosBySolicitudReq {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  idsolicitud: number;
}

export class CreateDocumentoRequest {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  @IsInt()
  idusuario: number;

  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @IsInt()
  idsolicitud: number;

  @ApiProperty({ description: 'ID del tipo de documento', example: 1 })
  @IsInt()
  idtipodocumento: number;

  @ApiProperty({ description: 'Formato del documento', example: 'pdf' })
  @IsString()
  formato: string;

  @ApiProperty({ description: 'Nombre original del archivo', example: 'documento.pdf' })
  @IsString()
  nombreoriginal: string;

  @ApiProperty({ description: 'Tamaño del archivo en bytes', example: 1024 })
  @IsInt()
  tamanio: number;

  @ApiProperty({ description: 'Archivo en base64', example: 'JVBERi0xLjQKJeLjz9MKMy...' })
  @IsString()
  archivoBase64: string;
}

export class DownloadDocumentoReq {
  @ApiProperty({ description: 'ID del documento a descargar', example: 1 })
  @IsInt()
  id: number;
}

export class DeleteDocumentoReq {
  @ApiProperty({ description: 'ID del documento a eliminar', example: 1 })
  @IsInt()
  id: number;
}