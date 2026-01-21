import { Injectable } from '@nestjs/common';
import { FotosRostroService } from '../../services/from-front/fotos-rostro-service';
import { FotoRostroDto } from '../../models/from-tables/fotos-rostro-dto';

@Injectable()
export class FotosRostroExpose {
  constructor(private readonly fotosRostroService: FotosRostroService) {}

  async subirFotoRostro(idsolicitud: number, archivo: any): Promise<FotoRostroDto> {
    return await this.fotosRostroService.subirFotoRostro(idsolicitud, archivo);
  }

  async descargarFotoRostro(idsolicitud: number): Promise<Buffer> {
    return await this.fotosRostroService.descargarFotoRostro(idsolicitud);
  }

  async obtenerUrlFotoRostro(idsolicitud: number): Promise<FotoRostroDto> {
    return await this.fotosRostroService.obtenerUrlFotoRostro(idsolicitud);
  }

  async modificarFotoRostro(idsolicitud: number, archivo: any): Promise<FotoRostroDto> {
    return await this.fotosRostroService.modificarFotoRostro(idsolicitud, archivo);
  }

  async eliminarFotoRostro(idsolicitud: number): Promise<void> {
    return await this.fotosRostroService.eliminarFotoRostro(idsolicitud);
  }
}
