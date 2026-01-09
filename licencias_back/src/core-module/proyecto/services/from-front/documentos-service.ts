import { Injectable } from "@nestjs/common";
import { DocumentosTService } from "../from-tables/documentos-service";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";
import { 
  CreateDocumentoRequest, 
  getDocumentoByIdDTO, 
  getDocumentoByIdReq, 
  getDocumentosByUsuarioReq,
  getDocumentosBySolicitudReq,
  getDocumentosDTO,
  DownloadDocumentoReq,
  DeleteDocumentoReq
} from "../../models/from-tables/documentos-dto";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";

@Injectable()
export class DocumentosService {
  constructor(
    private readonly documentosTService: DocumentosTService,
  ) {}

  public async getDocumentos(): Promise<getDocumentosDTO> {
    const queryParams = new QueryParams();
    const respuesta = await this.documentosTService.getDocumentos(queryParams);
    if (!respuesta.documentosData || respuesta.documentosData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron documentos.',
        'TYPE-A-documentos-service-001',
      );
    }
    return respuesta;
  }

  public async getDocumentoById(request: getDocumentoByIdReq): Promise<getDocumentoByIdDTO> {
    const respuesta = await this.documentosTService.getDocumentoById(request);
    if (!respuesta.existe) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontró el documento.',
        'TYPE-A-documentos-service-002',
      );
    }
    return respuesta;
  }

  public async getDocumentosByUsuario(request: getDocumentosByUsuarioReq): Promise<getDocumentosDTO> {
    const respuesta = await this.documentosTService.getDocumentosByUsuario(request);
    if (!respuesta.documentosData || respuesta.documentosData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron documentos para el usuario.',
        'TYPE-A-documentos-service-003',
      );
    }
    return respuesta;
  }

  public async getDocumentosBySolicitud(request: getDocumentosBySolicitudReq): Promise<getDocumentosDTO> {
    const respuesta = await this.documentosTService.getDocumentosBySolicitud(request);
    if (!respuesta.documentosData || respuesta.documentosData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron documentos para la solicitud.',
        'TYPE-A-documentos-service-004',
      );
    }
    return respuesta;
  }

  public async createDocumento(payload: CreateDocumentoRequest): Promise<void> {
    await this.documentosTService.createDocumento(payload);
  }

  public async downloadDocumento(request: DownloadDocumentoReq): Promise<{
    buffer: Buffer;
    nombreoriginal: string;
    formato: string;
  }> {
    const documento = await this.documentosTService.getDocumentoById({ id: request.id });
    
    if (!documento.existe || !documento.documentoData) {
      throw ManejadorErrores.getBusquedaVacia(
        'Documento no encontrado.',
        'TYPE-A-documentos-service-005',
      );
    }

    const buffer = await this.documentosTService.downloadDocumento(request.id);

    return {
      buffer,
      nombreoriginal: documento.documentoData.nombreoriginal,
      formato: documento.documentoData.formato,
    };
  }

  public async deleteDocumento(request: DeleteDocumentoReq): Promise<void> {
    await this.documentosTService.deleteDocumento(request);
  }
}