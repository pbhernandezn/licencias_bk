import { Injectable } from '@nestjs/common';
import { FotosRostroService } from '../../services/from-front/fotos-rostro-service';
import { FotoRostroDto, SubirFotoRostroRequest, ActualizarFotoRostroRequest } from '../../models/from-tables/fotos-rostro-dto';

@Injectable()
export class FotosRostroExpose {
  constructor(private readonly fotosRostroService: FotosRostroService) {}

  async subirFotoRostro(request: SubirFotoRostroRequest): Promise<FotoRostroDto> {
    return await this.fotosRostroService.subirFotoRostro(
      request.idsolicitud,
      request.archivoBase64,
      request.nombreoriginal,
      request.formato,
    );
  }

  async descargarFotoRostro(idsolicitud: number): Promise<Buffer> {
    return await this.fotosRostroService.descargarFotoRostro(idsolicitud);
  }

  async obtenerUrlFotoRostro(idsolicitud: number): Promise<FotoRostroDto> {
    return await this.fotosRostroService.obtenerUrlFotoRostro(idsolicitud);
  }

  async modificarFotoRostro(request: ActualizarFotoRostroRequest): Promise<FotoRostroDto> {
    return await this.fotosRostroService.modificarFotoRostro(
      request.idsolicitud,
      request.archivoBase64,
      request.nombreoriginal,
      request.formato,
    );
  }

  async eliminarFotoRostro(idsolicitud: number): Promise<void> {
    return await this.fotosRostroService.eliminarFotoRostro(idsolicitud);
  }
}
