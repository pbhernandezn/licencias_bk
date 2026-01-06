import { ApiProperty } from "@nestjs/swagger";

export class CatDocumentosDTO {
    id: number;
    documento: string;
    descripcion: string;
    idestatus: number;
}

export class getCatDocumentoByIdDTO {
  existe: boolean;
  catDocumentos?: CatDocumentosDataDTO;
}

export class CatDocumentosDataDTO {
  id: number;
  documento: string;
  descripcion: string;
  idestatus: number;
  estatus: string;
}

export class getCatDocumentoByIdReq {
  @ApiProperty({ description: 'ID del catalogo de documento a buscar', example: 1 })
  id: number;
}