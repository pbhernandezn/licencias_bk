import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatCPRepository } from '../../repository/catCP-repository';
import { CatCPDTO } from '../../models/from-tables/catCP-dto';


@Injectable()
export class CatCPService {
  constructor(private readonly catCPRepository: CatCPRepository) {}

  public async getCatCPById(idRow: number): Promise<CatCPDTO> {
    return await this.catCPRepository.getCatCPById(idRow);
  }

  public async getCatCPByCP(cp: string): Promise<Wrapper<Array<CatCPDTO>>> {
    return await this.catCPRepository.getCatCPByCP(cp);
  }

  public async createCatCP(payload: CatCPDTO): Promise<void> {
    // Reglas aqui
    await this.catCPRepository.saveCatCP(payload);
  }
  
  public async updateCatCP(id: number, payload: Partial<CatCPDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catCPRepository.isExistsCatCP(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catCPRepository.updateCatCP(id, payload);
  }

  public async deleteCatCP(id: number): Promise<void> {
    {
      const respuesta = await this.catCPRepository.isExistsCatCP(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catCPRepository.deleteCatCP(id);
  }
}
