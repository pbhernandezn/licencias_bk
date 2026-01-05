import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatPruebasRepository } from '../../repository/catPruebas-repository';
import { CatPruebasDTO } from '../../models/from-tables/catPruebas-dto';


@Injectable()
export class CatPruebasService {
  constructor(private readonly catPruebasRepository: CatPruebasRepository) {}

  public async getCatPruebas(
    queryParams: QueryParams,
  ): Promise<Wrapper<Array<CatPruebasDTO>>> {
    return await this.catPruebasRepository.getCatPruebas(queryParams);
  }

  public async getCatPruebasById(idRow: number): Promise<CatPruebasDTO> {
    return await this.catPruebasRepository.getCatPruebasById(idRow);
  }

  public async createCatPruebas(payload: CatPruebasDTO): Promise<void> {
    // Reglas aqui
    await this.catPruebasRepository.saveCatPruebas(payload);
  }

  public async updateCatPruebas(id: number, payload: Partial<CatPruebasDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catPruebasRepository.isExistsCatPruebas(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catPruebasRepository.updateCatPruebas(id, payload);
  }

  public async deleteCatPruebas(id: number): Promise<void> {
    {
      const respuesta = await this.catPruebasRepository.isExistsCatPruebas(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catPruebasRepository.deleteCatPruebas(id);
  }
}
