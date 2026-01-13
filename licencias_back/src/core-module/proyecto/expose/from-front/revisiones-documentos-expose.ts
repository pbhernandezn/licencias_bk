import { Injectable } from '@nestjs/common';
import { RevisionesDocumentosService } from '../../services/from-front/revisiones-documentos-service';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { RESPONSE_CODES, INTERNAL_CODES, INTERNAL_MESSAGES } from '@principal/commons-module/proyecto/utils/messages-enum';
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
} from '../../models/from-tables/revisiones-documentos-dto';

@Injectable()
export class RevisionesDocumentosExpose {
  constructor(
    private readonly revisionesDocumentosService: RevisionesDocumentosService,
  ) {}

  public async getRevisionesDocumentos(queryParams: QueryParams): Promise<BaseResponse<getRevisionesDocumentosDTO>> {
    const response = await this.revisionesDocumentosService.getRevisionesDocumentos(queryParams);
    const resultado = new BaseResponse<getRevisionesDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Revisiones de documentos obtenidas exitosamente';
    resultado.data = response;
    return resultado;
  }

  public async getRevisionDocumentoById(request: getRevisionDocumentoByIdReq): Promise<BaseResponse<getRevisionDocumentoByIdDTO>> {
    const response = await this.revisionesDocumentosService.getRevisionDocumentoById(request);
    const resultado = new BaseResponse<getRevisionDocumentoByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documento de revisión obtenido exitosamente';
    resultado.data = response;
    return resultado;
  }

  public async getRevisionesDocumentosByRevision(request: getRevisionesDocumentosByRevisionReq): Promise<BaseResponse<getRevisionesDocumentosDTO>> {
    const response = await this.revisionesDocumentosService.getRevisionesDocumentosByRevision(request);
    const resultado = new BaseResponse<getRevisionesDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documentos de la revisión obtenidos exitosamente';
    resultado.data = response;
    return resultado;
  }

  public async getRevisionesDocumentosByDocumento(request: getRevisionesDocumentosByDocumentoReq): Promise<BaseResponse<getRevisionesDocumentosDTO>> {
    const response = await this.revisionesDocumentosService.getRevisionesDocumentosByDocumento(request);
    const resultado = new BaseResponse<getRevisionesDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Historial de revisiones del documento obtenido exitosamente';
    resultado.data = response;
    return resultado;
  }

  public async createRevisionDocumentos(request: CreateRevisionDocumentosRequest): Promise<BaseResponse<void>> {
    await this.revisionesDocumentosService.createRevisionDocumentos(request);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documentos de revisión creados exitosamente';
    resultado.data = null;
    return resultado;
  }

  public async updateRevisionDocumento(request: UpdateRevisionDocumentoRequest): Promise<BaseResponse<void>> {
    await this.revisionesDocumentosService.updateRevisionDocumento(request);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documento de revisión actualizado exitosamente';
    resultado.data = null;
    return resultado;
  }

  public async deleteRevisionDocumento(request: DeleteRevisionDocumentoReq): Promise<BaseResponse<void>> {
    await this.revisionesDocumentosService.deleteRevisionDocumento(request);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Documento de revisión eliminado exitosamente';
    resultado.data = null;
    return resultado;
  }

  public async getRevisionConDocumentosCompleta(idrevision: number): Promise<BaseResponse<RevisionConDocumentosDTO>> {
    const response = await this.revisionesDocumentosService.getRevisionConDocumentosCompleta(idrevision);
    const resultado = new BaseResponse<RevisionConDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Revisión completa con documentos obtenida exitosamente';
    resultado.data = response;
    return resultado;
  }
}
