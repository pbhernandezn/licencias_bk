import { Injectable } from '@nestjs/common';
import { FotosRostroRepository } from '../../repository/fotos-rostro-repository';
import { FotosRostroEntity } from '../../models/entities/fotos-rostro-entity';
import { FotoRostroDto } from '../../models/from-tables/fotos-rostro-dto';

@Injectable()
export class FotosRostroTService {
  constructor(private readonly fotosRostroRepository: FotosRostroRepository) {}

  async crearFotoRostro(datos: Partial<FotosRostroEntity>): Promise<FotosRostroEntity> {
    return await this.fotosRostroRepository.crear(datos);
  }

  async obtenerFotoPorId(id: number): Promise<FotosRostroEntity | null> {
    return await this.fotosRostroRepository.obtenerPorId(id);
  }

  async obtenerFotoPorSolicitud(idsolicitud: number): Promise<FotosRostroEntity | null> {
    return await this.fotosRostroRepository.obtenerPorSolicitud(idsolicitud);
  }

  async actualizarFoto(id: number, datos: Partial<FotosRostroEntity>): Promise<void> {
    await this.fotosRostroRepository.actualizar(id, datos);
  }

  async eliminarFoto(id: number): Promise<void> {
    await this.fotosRostroRepository.eliminarLogico(id);
  }

  async verificarFotoExistente(idsolicitud: number): Promise<boolean> {
    const foto = await this.obtenerFotoPorSolicitud(idsolicitud);
    return foto !== null;
  }
}
