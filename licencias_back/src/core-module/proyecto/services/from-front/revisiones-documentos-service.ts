import { Injectable } from '@nestjs/common';
import { RevisionesDocumentosTService } from '../from-tables/revisiones-documentos-service';
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
} from '../../models/from-tables/revisiones-documentos-dto';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';

@Injectable()
export class RevisionesDocumentosService {
  constructor(
    private readonly revisionesDocumentosTService: RevisionesDocumentosTService,
  ) {}

  public async getRevisionesDocumentos(queryParams: QueryParams): Promise<getRevisionesDocumentosDTO> {
    const response = await this.revisionesDocumentosTService.getRevisionesDocumentos(queryParams);
    
    if (!response.existe || response.revisionesDocumentosData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron revisiones de documentos',
        'TYPE-A-revisiones-documentos-front-001'
      );
    }
    
    return response;
  }

  public async getRevisionDocumentoById(request: getRevisionDocumentoByIdReq): Promise<getRevisionDocumentoByIdDTO> {
    const response = await this.revisionesDocumentosTService.getRevisionDocumentoById(request);
    
    if (!response.existe) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontró el documento de revisión',
        'TYPE-A-revisiones-documentos-front-002'
      );
    }
    
    return response;
  }

  public async getRevisionesDocumentosByRevision(request: getRevisionesDocumentosByRevisionReq): Promise<getRevisionesDocumentosDTO> {
    const response = await this.revisionesDocumentosTService.getRevisionesDocumentosByRevision(request);
    
    if (!response.existe || response.revisionesDocumentosData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron documentos para esta revisión',
        'TYPE-A-revisiones-documentos-front-003'
      );
    }
    
    return response;
  }

  public async getRevisionesDocumentosByDocumento(request: getRevisionesDocumentosByDocumentoReq): Promise<getRevisionesDocumentosDTO> {
    const response = await this.revisionesDocumentosTService.getRevisionesDocumentosByDocumento(request);
    
    if (!response.existe || response.revisionesDocumentosData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron revisiones para este documento',
        'TYPE-A-revisiones-documentos-front-004'
      );
    }
    
    return response;
  }

  public async createRevisionDocumentos(request: CreateRevisionDocumentosRequest): Promise<void> {
    if (!request.documentos || request.documentos.length === 0) {
      throw ManejadorErrores.getValidacionNoSatisfactoria(
        'Debe proporcionar al menos un documento',
        'TYPE-D-revisiones-documentos-front-005'
      );
    }
    
    await this.revisionesDocumentosTService.createRevisionDocumentos(request);
  }

  public async updateRevisionDocumento(request: UpdateRevisionDocumentoRequest): Promise<void> {
    await this.revisionesDocumentosTService.updateRevisionDocumento(request);
  }

  public async deleteRevisionDocumento(request: DeleteRevisionDocumentoReq): Promise<void> {
    await this.revisionesDocumentosTService.deleteRevisionDocumento(request);
  }

  public async getRevisionConDocumentosCompleta(idrevision: number): Promise<RevisionConDocumentosDTO> {
    return await this.revisionesDocumentosTService.getRevisionConDocumentosCompleta(idrevision);
  }
}
