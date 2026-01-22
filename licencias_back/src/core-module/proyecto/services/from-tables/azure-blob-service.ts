import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient, BlockBlobClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';

@Injectable()
export class AzureBlobService {
  private containerClient: ContainerClient;
  private blobServiceClient: BlobServiceClient;
  private connectionString: string;

  constructor(private configService: ConfigService) {
    this.connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    const containerName = this.configService.get<string>('AZURE_STORAGE_CONTAINER_NAME', 'documentos');

    if (!this.connectionString) {
      //throw new Error('AZURE_STORAGE_CONNECTION_STRING no está configurada');
    }else{
    this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
    }

  }

  /**
   * Obtiene un cliente de contenedor para un contenedor específico
   * @param containerName - Nombre del contenedor
   * @returns ContainerClient
   */
  private getContainerClient(containerName?: string): ContainerClient {
    if (!containerName) {
      return this.containerClient;
    }
    return this.blobServiceClient.getContainerClient(containerName);
  }

  /**
   * Sube un archivo a Azure Blob Storage
   * @param buffer - Buffer del archivo
   * @param blobName - Nombre único del blob
   * @param contentType - Tipo de contenido del archivo
   * @param containerName - Nombre del contenedor (opcional, usa el por defecto si no se especifica)
   * @returns URL del archivo subido (privada - solo para referencia)
   */
  async uploadFile(buffer: Buffer, blobName: string, contentType: string, containerName?: string): Promise<string> {
    try {
      const container = this.getContainerClient(containerName);
      // Crear el contenedor si no existe (privado - sin acceso público)
      await container.createIfNotExists();

      const blockBlobClient: BlockBlobClient = container.getBlockBlobClient(blobName);
      
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: {
          blobContentType: contentType
        }
      });

      return blockBlobClient.url;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al subir archivo a Azure Blob Storage: ${error.message}`,
        'AZURE-BLOB-002'
      );
    }
  }

  /**
   * Descarga un archivo de Azure Blob Storage
   * @param blobName - Nombre del blob
   * @param containerName - Nombre del contenedor (opcional, usa el por defecto si no se especifica)
   * @returns Buffer del archivo
   */
  async downloadFile(blobName: string, containerName?: string): Promise<Buffer> {
    try {
      const container = this.getContainerClient(containerName);
      const blockBlobClient: BlockBlobClient = container.getBlockBlobClient(blobName);
      const downloadResponse = await blockBlobClient.download();
      
      const chunks: Buffer[] = [];
      for await (const chunk of downloadResponse.readableStreamBody) {
        chunks.push(Buffer.from(chunk));
      }
      
      return Buffer.concat(chunks);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al descargar archivo de Azure Blob Storage: ${error.message}`,
        'AZURE-BLOB-003'
      );
    }
  }

  /**
   * Elimina un archivo de Azure Blob Storage
   * @param blobName - Nombre del blob
   * @param containerName - Nombre del contenedor (opcional, usa el por defecto si no se especifica)
   */
  async deleteFile(blobName: string, containerName?: string): Promise<void> {
    try {
      const container = this.getContainerClient(containerName);
      const blockBlobClient: BlockBlobClient = container.getBlockBlobClient(blobName);
      await blockBlobClient.deleteIfExists();
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al eliminar archivo de Azure Blob Storage: ${error.message}`,
        'AZURE-BLOB-004'
      );
    }
  }

  /**
   * Obtiene la URL de un blob (privada - solo para referencia interna)
   * Nota: Esta URL no es accesible públicamente. 
   * Los archivos deben descargarse a través del endpoint /downloadDocumento
   * @param blobName - Nombre del blob
   * @returns URL del blob
   */
  getBlobUrl(blobName: string): string {
    const blockBlobClient: BlockBlobClient = this.containerClient.getBlockBlobClient(blobName);
    return blockBlobClient.url;
  }

  /**
   * Genera un nombre único para el blob
   * @param idusuario - ID del usuario
   * @param idsolicitud - ID de la solicitud
   * @param nombreoriginal - Nombre original del archivo
   * @returns Nombre único del blob
   */
  generateBlobName(idusuario: number, idsolicitud: number, nombreoriginal: string): string {
    const timestamp = Date.now();
    return `usuario_${idusuario}/solicitud_${idsolicitud}/${timestamp}_${nombreoriginal}`;
  }
}
