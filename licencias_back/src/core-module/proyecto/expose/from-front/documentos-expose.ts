import { Injectable } from "@nestjs/common";
import { DocumentosService } from "../../services/from-front/documentos-service";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { INTERNAL_CODES, INTERNAL_MESSAGES, RESPONSE_CODES } from "@principal/commons-module/proyecto/utils/messages-enum";
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
} from "../../models/from-tables/documentos-dto";

@Injectable()
export class DocumentosExpose {
  constructor(private readonly documentosService: DocumentosService) {}

  public async documentos(): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosService.getDocumentos();
    const resultado = new BaseResponse<getDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async documentoById(request: getDocumentoByIdReq): Promise<BaseResponse<getDocumentoByIdDTO>> {
    const respuesta = await this.documentosService.getDocumentoById(request);
    const resultado = new BaseResponse<getDocumentoByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async documentosByUsuario(request: getDocumentosByUsuarioReq): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosService.getDocumentosByUsuario(request);
    const resultado = new BaseResponse<getDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async documentosBySolicitud(request: getDocumentosBySolicitudReq): Promise<BaseResponse<getDocumentosDTO>> {
    const respuesta = await this.documentosService.getDocumentosBySolicitud(request);
    const resultado = new BaseResponse<getDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async createDocumento(payload: CreateDocumentoRequest): Promise<BaseResponse<void>> {
    await this.documentosService.createDocumento(payload);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documento creado y subido a Azure Blob Storage exitosamente';
    return resultado;
  }

  public async downloadDocumento(request: DownloadDocumentoReq): Promise<{
    buffer: Buffer;
    nombreoriginal: string;
    formato: string;
  }> {
    return await this.documentosService.downloadDocumento(request);
  }

  public async deleteDocumento(request: DeleteDocumentoReq): Promise<BaseResponse<void>> {
    await this.documentosService.deleteDocumento(request);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documento eliminado exitosamente de Azure Blob Storage y base de datos';
    return resultado;
  }

  public async updateDocumento(request: UpdateDocumentoRequest): Promise<BaseResponse<void>> {
    await this.documentosService.updateDocumento(request);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documento actualizado exitosamente en Azure Blob Storage y base de datos';
    return resultado;
  }
}