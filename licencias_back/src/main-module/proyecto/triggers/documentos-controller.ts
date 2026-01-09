import { Body, Controller, Get, Post, Res, StreamableFile } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { DocumentosExpose } from "@principal/core-module/proyecto/expose/from-front/documentos-expose";
import { 
  CreateDocumentoRequest, 
  getDocumentoByIdDTO, 
  getDocumentoByIdReq, 
  getDocumentosByUsuarioReq,
  getDocumentosBySolicitudReq,
  getDocumentosDTO,
  DownloadDocumentoReq,
  DeleteDocumentoReq
} from "@principal/core-module/proyecto/models/from-tables/documentos-dto";
import { Response } from 'express';

@ApiTags('Documentos')
@Controller('/api/documentos')
export class DocumentosController {
  constructor(
    private readonly documentosExpose: DocumentosExpose,
  ) {}

  @Get('/documentos')
  async getDocumentos(): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosExpose.documentos();
    return respuesta;
  }

  @Post('/documentoById')
  @ApiBody({ type: getDocumentoByIdReq })
  @ApiResponse({ status: 200, description: 'Documento encontrado', type: BaseResponse })
  async getDocumentoById(@Body() request: getDocumentoByIdReq): Promise<BaseResponse<getDocumentoByIdDTO>> {
    const respuesta = await this.documentosExpose.documentoById(request);
    return respuesta;
  }

  @Post('/documentosByUsuario')
  @ApiBody({ type: getDocumentosByUsuarioReq })
  @ApiResponse({ status: 200, description: 'Documentos encontrados', type: BaseResponse })
  async getDocumentosByUsuario(@Body() request: getDocumentosByUsuarioReq): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosExpose.documentosByUsuario(request);
    return respuesta;
  }

  @Post('/documentosBySolicitud')
  @ApiBody({ type: getDocumentosBySolicitudReq })
  @ApiResponse({ status: 200, description: 'Documentos encontrados', type: BaseResponse })
  async getDocumentosBySolicitud(@Body() request: getDocumentosBySolicitudReq): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosExpose.documentosBySolicitud(request);
    return respuesta;
  }

  @Post('/createDocumento')
  @ApiBody({ type: CreateDocumentoRequest })
  @ApiResponse({ status: 200, description: 'Documento creado y subido a Azure Blob Storage.', type: BaseResponse })
  async createDocumento(@Body() request: CreateDocumentoRequest): Promise<BaseResponse<void>> {
    const respuesta = await this.documentosExpose.createDocumento(request);
    return respuesta;
  }

  @Post('/downloadDocumento')
  @ApiBody({ type: DownloadDocumentoReq })
  @ApiResponse({ status: 200, description: 'Documento descargado' })
  async downloadDocumento(
    @Body() request: DownloadDocumentoReq,
    @Res({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {
    const { buffer, nombreoriginal, formato } = await this.documentosExpose.downloadDocumento(request);
    
    res.set({
      'Content-Type': `application/${formato}`,
      'Content-Disposition': `attachment; filename="${nombreoriginal}"`,
    });

    return new StreamableFile(buffer);
  }

  @Post('/deleteDocumento')
  @ApiBody({ type: DeleteDocumentoReq })
  @ApiResponse({ status: 200, description: 'Documento eliminado', type: BaseResponse })
  async deleteDocumento(@Body() request: DeleteDocumentoReq): Promise<BaseResponse<void>> {
    const respuesta = await this.documentosExpose.deleteDocumento(request);
    return respuesta;
  }
}