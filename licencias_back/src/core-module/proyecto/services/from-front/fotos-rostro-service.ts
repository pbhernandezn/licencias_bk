import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FotosRostroTService } from '../from-tables/fotos-rostro-service';
import { AzureBlobService } from '../from-tables/azure-blob-service';
import { FotoRostroDto } from '../../models/from-tables/fotos-rostro-dto';
import { SolicitudesTService } from '../from-tables/solicitudes-service';

@Injectable()
export class FotosRostroService {
  private readonly contenedor = 'fotos-rostro';
  private readonly extensionesPermitidas = ['.jpg', '.jpeg', '.png'];
  private readonly tamanoMaximo = 5 * 1024 * 1024; // 5MB

  constructor(
    private readonly fotosRostroTService: FotosRostroTService,
    private readonly azureBlobService: AzureBlobService,
    private readonly solicitudesTService: SolicitudesTService,
  ) {}

  /**
   * Subir una foto de rostro para una solicitud
   */
  async subirFotoRostro(
    idsolicitud: number,
    archivoBase64: string,
    nombreoriginal: string,
    formato: string,
  ): Promise<FotoRostroDto> {
    // Validar que la solicitud existe
    const solicitud = await this.solicitudesTService.getSolicitudById({ id: idsolicitud });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con id ${idsolicitud} no encontrada`);
    }

    // Convertir base64 a buffer
    const buffer = Buffer.from(archivoBase64, 'base64');

    // Validar archivo
    this.validarArchivo(buffer, formato);

    // Verificar si ya existe una foto para esta solicitud
    const fotoExistente = await this.fotosRostroTService.obtenerFotoPorSolicitud(idsolicitud);
    if (fotoExistente) {
      // Eliminar la foto anterior de Azure
      await this.azureBlobService.deleteFile(fotoExistente.nombreArchivo, this.contenedor);
      // Eliminar registro de BD
      await this.fotosRostroTService.eliminarFoto(fotoExistente.id);
    }

    // Generar nombre único para el archivo con estructura de carpetas
    const nombreArchivo = this.azureBlobService.generateBlobName(
      solicitud.solicitudData.idusuario,
      idsolicitud,
      nombreoriginal,
    );

    // Determinar mimetype
    const mimetype = formato.toLowerCase() === 'png' ? 'image/png' : 'image/jpeg';

    // Subir a Azure Blob Storage
    const urlFoto = await this.azureBlobService.uploadFile(
      buffer,
      nombreArchivo,
      mimetype,
      this.contenedor,
    );

    // Guardar en base de datos
    const nuevaFoto = await this.fotosRostroTService.crearFotoRostro({
      idsolicitud,
      urlFoto,
      nombreArchivo,
      contenedor: this.contenedor,
    });

    return this.mapearADto(nuevaFoto);
  }

  /**
   * Descargar la foto de rostro de una solicitud
   */
  async descargarFotoRostro(idsolicitud: number): Promise<Buffer> {
    const foto = await this.fotosRostroTService.obtenerFotoPorSolicitud(idsolicitud);
    
    if (!foto) {
      throw new NotFoundException(`No se encontró foto de rostro para la solicitud ${idsolicitud}`);
    }

    // Descargar desde Azure Blob Storage
    const buffer = await this.azureBlobService.downloadFile(foto.nombreArchivo, this.contenedor);

    return buffer;
  }

  /**
   * Obtener la URL de la foto de rostro de una solicitud
   */
  async obtenerUrlFotoRostro(idsolicitud: number): Promise<FotoRostroDto> {
    const foto = await this.fotosRostroTService.obtenerFotoPorSolicitud(idsolicitud);
    
    if (!foto) {
      throw new NotFoundException(`No se encontró foto de rostro para la solicitud ${idsolicitud}`);
    }

    return this.mapearADto(foto);
  }

  /**
   * Modificar (reemplazar) la foto de rostro de una solicitud
   */
  async modificarFotoRostro(
    idsolicitud: number,
    archivoBase64: string,
    nombreoriginal: string,
    formato: string,
  ): Promise<FotoRostroDto> {
    // Convertir base64 a buffer
    const buffer = Buffer.from(archivoBase64, 'base64');

    // Validar archivo
    this.validarArchivo(buffer, formato);

    // Verificar que existe una foto previa
    const fotoExistente = await this.fotosRostroTService.obtenerFotoPorSolicitud(idsolicitud);
    if (!fotoExistente) {
      throw new NotFoundException(`No se encontró foto de rostro para la solicitud ${idsolicitud}`);
    }

    // Eliminar la foto anterior de Azure
    await this.azureBlobService.deleteFile(fotoExistente.nombreArchivo, this.contenedor);

    // Obtener la solicitud para generar el nombre con estructura de carpetas
    const solicitud = await this.solicitudesTService.getSolicitudById({ id: idsolicitud });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con id ${idsolicitud} no encontrada`);
    }

    // Generar nuevo nombre para el archivo con estructura de carpetas
    const nombreArchivo = this.azureBlobService.generateBlobName(
      solicitud.solicitudData.idusuario,
      idsolicitud,
      nombreoriginal,
    );

    // Determinar mimetype
    const mimetype = formato.toLowerCase() === 'png' ? 'image/png' : 'image/jpeg';

    // Subir nueva foto a Azure
    const urlFoto = await this.azureBlobService.uploadFile(
      buffer,
      nombreArchivo,
      mimetype,
      this.contenedor,
    );

    // Actualizar en base de datos
    await this.fotosRostroTService.actualizarFoto(fotoExistente.id, {
      urlFoto,
      nombreArchivo,
      fechaSubida: new Date(),
    });

    // Obtener registro actualizado
    const fotoActualizada = await this.fotosRostroTService.obtenerFotoPorId(fotoExistente.id);
    
    return this.mapearADto(fotoActualizada);
  }

  /**
   * Eliminar la foto de rostro de una solicitud
   */
  async eliminarFotoRostro(idsolicitud: number): Promise<void> {
    const foto = await this.fotosRostroTService.obtenerFotoPorSolicitud(idsolicitud);
    
    if (!foto) {
      throw new NotFoundException(`No se encontró foto de rostro para la solicitud ${idsolicitud}`);
    }

    // Eliminar de Azure
    await this.azureBlobService.deleteFile(foto.nombreArchivo, this.contenedor);

    // Eliminar de BD (soft delete)
    await this.fotosRostroTService.eliminarFoto(foto.id);
  }

  // Métodos auxiliares privados

  private validarArchivo(buffer: Buffer, formato: string): void {
    if (!buffer || buffer.length === 0) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    // Validar tamaño
    if (buffer.length > this.tamanoMaximo) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido de ${this.tamanoMaximo / (1024 * 1024)}MB`,
      );
    }

    // Validar formato
    const formatoLower = formato.toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(formatoLower)) {
      throw new BadRequestException('El archivo debe ser JPG o PNG');
    }
  }

  private mapearADto(entidad: any): FotoRostroDto {
    return {
      id: entidad.id,
      idsolicitud: entidad.idsolicitud,
      urlFoto: entidad.urlFoto,
      nombreArchivo: entidad.nombreArchivo,
      contenedor: entidad.contenedor,
      fechaSubida: entidad.fechaSubida,
      activo: entidad.activo,
    };
  }
}
