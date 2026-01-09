import { Injectable } from "@nestjs/common";
import { DocumentosRepository } from "../../repository/documentos-repository";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";
import { 
  CreateDocumentoRequest, 
  getDocumentoByIdDTO, 
  getDocumentoByIdReq, 
  getDocumentosByUsuarioReq,
  getDocumentosBySolicitudReq,
  getDocumentosDTO,
  DeleteDocumentoReq 
} from "../../models/from-tables/documentos-dto";
import { AzureBlobService } from "./azure-blob-service";
import { DocumentosMapping } from "../../utils/from-tables/documentos-mapping";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";

@Injectable()
export class DocumentosTService {
  constructor(
    private readonly documentosRepository: DocumentosRepository,
    private readonly azureBlobService: AzureBlobService
  ) {}

  public async getDocumentos(queryParams: QueryParams): Promise<getDocumentosDTO> {
    return await this.documentosRepository.getDocumentos(queryParams);
  }

  public async getDocumentoById(request: getDocumentoByIdReq): Promise<getDocumentoByIdDTO> {
    return await this.documentosRepository.getDocumentoById(request);
  }

  public async getDocumentosByUsuario(request: getDocumentosByUsuarioReq): Promise<getDocumentosDTO> {
    return await this.documentosRepository.getDocumentosByUsuario(request);
  }

  public async getDocumentosBySolicitud(request: getDocumentosBySolicitudReq): Promise<getDocumentosDTO> {
    return await this.documentosRepository.getDocumentosBySolicitud(request);
  }

  public async createDocumento(payload: CreateDocumentoRequest): Promise<void> {
    try {
      // Decodificar el archivo base64
      const buffer = Buffer.from(payload.archivoBase64, 'base64');
      
      // Generar nombre único para el blob
      const nombreBlob = this.azureBlobService.generateBlobName(
        payload.idusuario,
        payload.idsolicitud,
        payload.nombreoriginal
      );

      // Subir archivo a Azure Blob Storage
      const urlArchivo = await this.azureBlobService.uploadFile(
        buffer,
        nombreBlob,
        `application/${payload.formato}`
      );

      // Crear entidad con la URL del archivo
      const documento = DocumentosMapping.createRequestToEntity(
        payload,
        urlArchivo,
        nombreBlob
      );

      // Guardar en base de datos
      await this.documentosRepository.saveDocumento(documento);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al crear documento: ${error.message}`,
        'TYPE-D-documentos-create-001'
      );
    }
  }

  public async downloadDocumento(id: number): Promise<Buffer> {
    try {
      // Obtener información del documento
      const documento = await this.documentosRepository.getDocumentoById({ id });
      
      if (!documento.existe || !documento.documentoData) {
        throw ManejadorErrores.getBusquedaVacia(
          'Documento no encontrado',
          'TYPE-A-documentos-download-001'
        );
      }

      // Descargar archivo de Azure Blob Storage
      const buffer = await this.azureBlobService.downloadFile(
        documento.documentoData.nombreblob
      );

      return buffer;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al descargar documento: ${error.message}`,
        'TYPE-A-documentos-download-002'
      );
    }
  }

  public async deleteDocumento(request: DeleteDocumentoReq): Promise<void> {
    try {
      // Obtener información del documento
      const documento = await this.documentosRepository.getDocumentoById({ id: request.id });
      
      if (!documento.existe || !documento.documentoData) {
        throw ManejadorErrores.getBusquedaVacia(
          'Documento no encontrado',
          'TYPE-E-documentos-delete-001'
        );
      }

      // Eliminar archivo de Azure Blob Storage
      await this.azureBlobService.deleteFile(documento.documentoData.nombreblob);

      // Eliminar registro de base de datos
      await this.documentosRepository.deleteDocumento(request.id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al eliminar documento: ${error.message}`,
        'TYPE-E-documentos-delete-002'
      );
    }
  }
}