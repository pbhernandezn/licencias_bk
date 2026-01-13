import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RevisionesDocumentosExpose } from '@principal/core-module/proyecto/expose/from-front/revisiones-documentos-expose';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import {
  getRevisionDocumentoByIdReq,
  getRevisionDocumentoByIdDTO,
  getRevisionesDocumentosByRevisionReq,
  getRevisionesDocumentosByDocumentoReq,
  getRevisionesDocumentosDTO,
  CreateRevisionDocumentosRequest,
  UpdateRevisionDocumentoRequest,
  DeleteRevisionDocumentoReq,
  RevisionConDocumentosDTO
} from '@principal/core-module/proyecto/models/from-tables/revisiones-documentos-dto';

@ApiTags('Revisiones de Documentos')
@Controller()
export class RevisionesDocumentosController {
  constructor(
    private readonly revisionesDocumentosExpose: RevisionesDocumentosExpose,
  ) {}

  @Get('/revisiones-documentos')
  @ApiResponse({
    status: 200,
    description: 'Obtener todas las revisiones de documentos',
  })
  public async getRevisionesDocumentos(): Promise<BaseResponse<getRevisionesDocumentosDTO>> {
    const queryParams = new QueryParams();
    return this.revisionesDocumentosExpose.getRevisionesDocumentos(queryParams);
  }

  @Post('/revisionDocumentoById')
  @ApiBody({ type: getRevisionDocumentoByIdReq })
  @ApiResponse({
    status: 200,
    description: 'Obtener un documento de revisión por ID',
  })
  public async getRevisionDocumentoById(
    @Body() request: getRevisionDocumentoByIdReq,
  ): Promise<BaseResponse<getRevisionDocumentoByIdDTO>> {
    return this.revisionesDocumentosExpose.getRevisionDocumentoById(request);
  }

  @Post('/revisionesDocumentosByRevision')
  @ApiBody({ type: getRevisionesDocumentosByRevisionReq })
  @ApiResponse({
    status: 200,
    description: 'Obtener todos los documentos de una revisión específica',
  })
  public async getRevisionesDocumentosByRevision(
    @Body() request: getRevisionesDocumentosByRevisionReq,
  ): Promise<BaseResponse<getRevisionesDocumentosDTO>> {
    return this.revisionesDocumentosExpose.getRevisionesDocumentosByRevision(request);
  }

  @Post('/revisionesDocumentosByDocumento')
  @ApiBody({ type: getRevisionesDocumentosByDocumentoReq })
  @ApiResponse({
    status: 200,
    description: 'Obtener el historial de revisiones de un documento específico',
  })
  public async getRevisionesDocumentosByDocumento(
    @Body() request: getRevisionesDocumentosByDocumentoReq,
  ): Promise<BaseResponse<getRevisionesDocumentosDTO>> {
    return this.revisionesDocumentosExpose.getRevisionesDocumentosByDocumento(request);
  }

  @Post('/createRevisionDocumentos')
  @ApiBody({ type: CreateRevisionDocumentosRequest })
  @ApiResponse({
    status: 200,
    description: 'Crear documentos de revisión para una revisión específica (batch)',
  })
  public async createRevisionDocumentos(
    @Body() request: CreateRevisionDocumentosRequest,
  ): Promise<BaseResponse<void>> {
    return this.revisionesDocumentosExpose.createRevisionDocumentos(request);
  }

  @Post('/updateRevisionDocumento')
  @ApiBody({ type: UpdateRevisionDocumentoRequest })
  @ApiResponse({
    status: 200,
    description: 'Actualizar un documento de revisión',
  })
  public async updateRevisionDocumento(
    @Body() request: UpdateRevisionDocumentoRequest,
  ): Promise<BaseResponse<void>> {
    return this.revisionesDocumentosExpose.updateRevisionDocumento(request);
  }

  @Post('/deleteRevisionDocumento')
  @ApiBody({ type: DeleteRevisionDocumentoReq })
  @ApiResponse({
    status: 200,
    description: 'Eliminar un documento de revisión',
  })
  public async deleteRevisionDocumento(
    @Body() request: DeleteRevisionDocumentoReq,
  ): Promise<BaseResponse<void>> {
    return this.revisionesDocumentosExpose.deleteRevisionDocumento(request);
  }

  @Get('/revisionCompleta')
  @ApiQuery({ name: 'idrevision', type: Number, required: true, description: 'ID de la revisión' })
  @ApiResponse({
    status: 200,
    description: 'Obtener revisión completa con todos sus documentos',
  })
  public async getRevisionConDocumentosCompleta(
    @Query('idrevision') idrevision: number,
  ): Promise<BaseResponse<RevisionConDocumentosDTO>> {
    return this.revisionesDocumentosExpose.getRevisionConDocumentosCompleta(Number(idrevision));
  }
}
