import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatVigenciaRepository } from '../../repository/catVigencia-repository';
import { CatVigenciaDataDTO, CatVigenciaDTO, getCatVigenciaByIdDTO, getCatVigenciaByIdReq } from '../../models/from-tables/catVigencia-dto';


@Injectable()
export class CatVigenciaService {
  constructor(private readonly catVigenciaRepository: CatVigenciaRepository) {}

  public async getCatVigencias(
      queryParams: QueryParams,
    ): Promise<Array<CatVigenciaDataDTO>> {
      return await this.catVigenciaRepository.getCatVigencias(queryParams);
    }

    public async getCatVigenciaById(request: getCatVigenciaByIdReq): Promise<getCatVigenciaByIdDTO> {
      return await this.catVigenciaRepository.getCatVigenciaById(request);
    }

  public async createCatVigencia(payload: CatVigenciaDTO): Promise<void> {
    // Reglas aqui
    await this.catVigenciaRepository.saveCatVigencia(payload);
  }

  public async updateCatVigencia(id: number, payload: Partial<CatVigenciaDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catVigenciaRepository.isExistsCatVigencia(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catVigenciaRepository.updateCatVigencia(id, payload);
  }

  public async deleteCatVigencia(id: number): Promise<void> {
    {
      const respuesta = await this.catVigenciaRepository.isExistsCatVigencia(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catVigenciaRepository.deleteCatVigencia(id);
  }
}
