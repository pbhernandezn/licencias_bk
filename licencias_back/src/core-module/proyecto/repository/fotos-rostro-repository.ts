import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotosRostroEntity } from '../models/entities/fotos-rostro-entity';

@Injectable()
export class FotosRostroRepository {
  constructor(
    @InjectRepository(FotosRostroEntity)
    private readonly repository: Repository<FotosRostroEntity>,
  ) {}

  async crear(fotoRostro: Partial<FotosRostroEntity>): Promise<FotosRostroEntity> {
    const nuevaFoto = this.repository.create(fotoRostro);
    return await this.repository.save(nuevaFoto);
  }

  async obtenerPorId(id: number): Promise<FotosRostroEntity | null> {
    return await this.repository.findOne({
      where: { id, activo: true },
    });
  }

  async obtenerPorSolicitud(idsolicitud: number): Promise<FotosRostroEntity | null> {
    return await this.repository.findOne({
      where: { idsolicitud, activo: true },
      order: { fechaSubida: 'DESC' },
    });
  }

  async actualizar(id: number, datos: Partial<FotosRostroEntity>): Promise<void> {
    await this.repository.update(id, datos);
  }

  async eliminarLogico(id: number): Promise<void> {
    await this.repository.update(id, { activo: false });
  }

  async eliminarFisico(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
