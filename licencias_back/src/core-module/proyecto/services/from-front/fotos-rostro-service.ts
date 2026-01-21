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
    archivo: any,
  ): Promise<FotoRostroDto> {
    // Validar que la solicitud existe
    const solicitud = await this.solicitudesTService.getSolicitudById({ id: idsolicitud });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con id ${idsolicitud} no encontrada`);
    }

    // Validar archivo
    this.validarArchivo(archivo);

    // Verificar si ya existe una foto para esta solicitud
    const fotoExistente = await this.fotosRostroTService.obtenerFotoPorSolicitud(idsolicitud);
    if (fotoExistente) {
      // Eliminar la foto anterior de Azure
      await this.azureBlobService.deleteFile(fotoExistente.nombreArchivo);
      // Eliminar registro de BD
      await this.fotosRostroTService.eliminarFoto(fotoExistente.id);
    }

    // Generar nombre único para el archivo
    const extension = this.obtenerExtension(archivo.originalname);
    const nombreArchivo = `solicitud_${idsolicitud}_${Date.now()}${extension}`;

    // Subir a Azure Blob Storage
    const urlFoto = await this.azureBlobService.uploadFile(
      archivo.buffer,
      nombreArchivo,
      archivo.mimetype,
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
    const buffer = await this.azureBlobService.downloadFile(foto.nombreArchivo);

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
    archivo: any,
  ): Promise<FotoRostroDto> {
    // Validar archivo
    this.validarArchivo(archivo);

    // Verificar que existe una foto previa
    const fotoExistente = await this.fotosRostroTService.obtenerFotoPorSolicitud(idsolicitud);
    if (!fotoExistente) {
      throw new NotFoundException(`No se encontró foto de rostro para la solicitud ${idsolicitud}`);
    }

    // Eliminar la foto anterior de Azure
    await this.azureBlobService.deleteFile(fotoExistente.nombreArchivo);

    // Generar nuevo nombre para el archivo
    const extension = this.obtenerExtension(archivo.originalname);
    const nombreArchivo = `solicitud_${idsolicitud}_${Date.now()}${extension}`;

    // Subir nueva foto a Azure
    const urlFoto = await this.azureBlobService.uploadFile(
      archivo.buffer,
      nombreArchivo,
      archivo.mimetype,
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
    await this.azureBlobService.deleteFile(foto.nombreArchivo);

    // Eliminar de BD (soft delete)
    await this.fotosRostroTService.eliminarFoto(foto.id);
  }

  // Métodos auxiliares privados

  private validarArchivo(archivo: any): void {
    if (!archivo) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    // Validar tamaño
    if (archivo.size > this.tamanoMaximo) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido de ${this.tamanoMaximo / (1024 * 1024)}MB`,
      );
    }

    // Validar extensión
    const extension = this.obtenerExtension(archivo.originalname);
    if (!this.extensionesPermitidas.includes(extension.toLowerCase())) {
      throw new BadRequestException(
        `Extensión de archivo no permitida. Solo se permiten: ${this.extensionesPermitidas.join(', ')}`,
      );
    }

    // Validar tipo MIME
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!tiposPermitidos.includes(archivo.mimetype)) {
      throw new BadRequestException('El archivo debe ser una imagen JPG o PNG');
    }
  }

  private obtenerExtension(nombreArchivo: string): string {
    const partes = nombreArchivo.split('.');
    return partes.length > 1 ? `.${partes[partes.length - 1]}` : '';
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
