import { Body, Controller, Get, Post, Res, StreamableFile, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { DocumentosExpose } from "@principal/core-module/proyecto/expose/from-front/documentos-expose";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { 
  CreateDocumentoRequest, 
  getDocumentoByIdDTO, 
  getDocumentoByIdReq, 
  getDocumentosByUsuarioReq,
  getDocumentosBySolicitudReq,
  getDocumentosDTO,
  DownloadDocumentoReq,
  DeleteDocumentoReq,
  UpdateDocumentoRequest
} from "@principal/core-module/proyecto/models/from-tables/documentos-dto";
import { Response } from 'express';

@ApiTags('Documentos')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('/api/documentos')
export class DocumentosController {
  constructor(
    private readonly documentosExpose: DocumentosExpose,
  ) {}

  @Get('/documentos')
  @ApiResponse({ status: 401, description: 'No autorizado - Token inválido o faltante' })
  async getDocumentos(@Request() req): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosExpose.documentos();
    return respuesta;
  }

  @Post('/documentoById')
  @ApiBody({ type: getDocumentoByIdReq })
  @ApiResponse({ status: 200, description: 'Documento encontrado', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getDocumentoById(@Body() request: getDocumentoByIdReq, @Request() req): Promise<BaseResponse<getDocumentoByIdDTO>> {
    const respuesta = await this.documentosExpose.documentoById(request);
    return respuesta;
  }

  @Post('/documentosByUsuario')
  @ApiBody({ type: getDocumentosByUsuarioReq })
  @ApiResponse({ status: 200, description: 'Documentos encontrados', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getDocumentosByUsuario(@Body() request: getDocumentosByUsuarioReq, @Request() req): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosExpose.documentosByUsuario(request);
    return respuesta;
  }

  @Post('/documentosBySolicitud')
  @ApiBody({ type: getDocumentosBySolicitudReq })
  @ApiResponse({ status: 200, description: 'Documentos encontrados', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getDocumentosBySolicitud(@Body() request: getDocumentosBySolicitudReq, @Request() req): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosExpose.documentosBySolicitud(request);
    return respuesta;
  }

  @Post('/createDocumento')
  @ApiBody({ type: CreateDocumentoRequest })
  @ApiResponse({ status: 200, description: 'Documento creado y subido a Azure Blob Storage.', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createDocumento(@Body() request: CreateDocumentoRequest, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.documentosExpose.createDocumento(request);
    return respuesta;
  }

  @Post('/downloadDocumento')
  @ApiBody({ type: DownloadDocumentoReq })
  @ApiResponse({ status: 200, description: 'Documento descargado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async downloadDocumento(
    @Body() request: DownloadDocumentoReq,
    @Res({ passthrough: true }) res: Response,
    @Request() req
  ): Promise<StreamableFile> {
    const { buffer, nombreoriginal, formato } = await this.documentosExpose.downloadDocumento(request);
    
    res.set({
      'Content-Type': `application/${formato}`,
      'Content-Disposition': `attachment; filename="${nombreoriginal}"`,
    });

    return new StreamableFile(buffer);
  }

  @Post('/updateDocumento')
  @ApiBody({ type: UpdateDocumentoRequest })
  @ApiResponse({ status: 200, description: 'Documento actualizado en Azure Blob Storage', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async updateDocumento(@Body() request: UpdateDocumentoRequest, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.documentosExpose.updateDocumento(request);
    return respuesta;
  }

  @Post('/deleteDocumento')
  @ApiBody({ type: DeleteDocumentoReq })
  @ApiResponse({ status: 200, description: 'Documento eliminado', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async deleteDocumento(@Body() request: DeleteDocumentoReq, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.documentosExpose.deleteDocumento(request);
    return respuesta;
  }
}