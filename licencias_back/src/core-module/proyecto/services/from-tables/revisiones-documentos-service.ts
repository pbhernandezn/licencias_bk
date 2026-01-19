import { Injectable } from '@nestjs/common';
import { RevisionesDocumentosRepository } from '../../repository/revisiones-documentos-repository';
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
import { RevisionesDocumentosMapping } from '../../utils/from-tables/revisiones-documentos-mapping';
import { RevisionesDocumentosEntity } from '../../models/entities/revisiones-documentos-entity';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';

@Injectable()
export class RevisionesDocumentosTService {
  constructor(
    private readonly revisionesDocumentosRepository: RevisionesDocumentosRepository,
  ) {}

  public async getRevisionesDocumentos(queryParams: QueryParams): Promise<getRevisionesDocumentosDTO> {
    return this.revisionesDocumentosRepository.getRevisionesDocumentos(queryParams);
  }

  public async getRevisionDocumentoById(request: getRevisionDocumentoByIdReq): Promise<getRevisionDocumentoByIdDTO> {
    return this.revisionesDocumentosRepository.getRevisionDocumentoById(request);
  }

  public async getRevisionesDocumentosByRevision(request: getRevisionesDocumentosByRevisionReq): Promise<getRevisionesDocumentosDTO> {
    return this.revisionesDocumentosRepository.getRevisionesDocumentosByRevision(request);
  }

  public async getRevisionesDocumentosByDocumento(request: getRevisionesDocumentosByDocumentoReq): Promise<getRevisionesDocumentosDTO> {
    return this.revisionesDocumentosRepository.getRevisionesDocumentosByDocumento(request);
  }

  public async createRevisionDocumentos(request: CreateRevisionDocumentosRequest): Promise<void> {
    const entities: RevisionesDocumentosEntity[] = request.documentos.map(doc => 
      RevisionesDocumentosMapping.createRequestToEntity(request.idrevision, doc)
    );
    console.log("Aaaaaaaaaah!!!"+entities);
    await this.revisionesDocumentosRepository.saveRevisionDocumentos(entities);
  }

  public async updateRevisionDocumento(request: UpdateRevisionDocumentoRequest): Promise<void> {
    const existe = await this.revisionesDocumentosRepository.isExistsRevisionDocumento(request.id);
    if (existe === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontró el documento de revisión',
        'TYPE-U-revisiones-documentos-011'
      );
    }
    
    const entityUpdate = RevisionesDocumentosMapping.updateRequestToEntity(request);
    await this.revisionesDocumentosRepository.updateRevisionDocumento(request.id, entityUpdate);
  }

  public async deleteRevisionDocumento(request: DeleteRevisionDocumentoReq): Promise<void> {
    const existe = await this.revisionesDocumentosRepository.isExistsRevisionDocumento(request.id);
    if (existe === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontró el documento de revisión',
        'TYPE-E-revisiones-documentos-012'
      );
    }
    
    await this.revisionesDocumentosRepository.deleteRevisionDocumento(request.id);
  }

  public async getRevisionConDocumentosCompleta(idrevision: number): Promise<RevisionConDocumentosDTO> {
    return this.revisionesDocumentosRepository.getRevisionConDocumentosCompleta(idrevision);
  }
}
