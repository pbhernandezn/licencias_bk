import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatEstatusRepository } from '../../repository/catEstatus-repository';
import { CatEstatusDTO } from '../../models/from-tables/catEstatus-dto';


@Injectable()
export class CatEstatusService {
  constructor(private readonly catEstatusRepository: CatEstatusRepository) {}

  public async getCatEstatusById(idRow: number): Promise<CatEstatusDTO> {
    return await this.catEstatusRepository.getCatEstatusById(idRow);
  }

  public async getCatEstatusByTabla(tabla: string): Promise<Wrapper<Array<CatEstatusDTO>>> {
    return await this.catEstatusRepository.getCatEstatusByTabla(tabla);
  }

  public async createCatEstatus(payload: CatEstatusDTO): Promise<void> {
    // Reglas aqui
    await this.catEstatusRepository.saveCatEstatus(payload);
  }

  public async updateCatEstatus(id: number, payload: Partial<CatEstatusDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catEstatusRepository.isExistsCatEstatus(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catEstatusRepository.updateCatEstatus(id, payload);
  }

  public async deleteCatEstatus(id: number): Promise<void> {
    {
      const respuesta = await this.catEstatusRepository.isExistsCatEstatus(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catEstatusRepository.deleteCatEstatus(id);
  }
}
