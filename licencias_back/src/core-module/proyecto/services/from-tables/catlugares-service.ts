import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatLugaresRepository } from '../../repository/catLugares-repository';
import { CatLugaresDTO } from '../../models/from-tables/catLugares-dto';


@Injectable()
export class CatLugaresService {
  constructor(private readonly catLugaresRepository: CatLugaresRepository) {}

  public async getCatLugares(
    queryParams: QueryParams,
  ): Promise<Wrapper<Array<CatLugaresDTO>>> {
    return await this.catLugaresRepository.getCatLugares(queryParams);
  }

  public async getCatLugaresById(idRow: number): Promise<CatLugaresDTO> {
    return await this.catLugaresRepository.getCatLugaresById(idRow);
  }

  public async createCatLugares(payload: CatLugaresDTO): Promise<void> {
    // Reglas aqui
    await this.catLugaresRepository.saveCatLugares(payload);
  }

  public async updateCatLugares(id: number, payload: Partial<CatLugaresDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catLugaresRepository.isExistsCatLugares(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catLugaresRepository.updateCatLugares(id, payload);
  }

  public async deleteCatLugares(id: number): Promise<void> {
    {
      const respuesta = await this.catLugaresRepository.isExistsCatLugares(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catLugaresRepository.deleteCatLugares(id);
  }
}
