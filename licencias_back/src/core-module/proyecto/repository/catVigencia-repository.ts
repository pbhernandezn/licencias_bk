import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatVigenciaEntity } from '../models/entities/catVigencia-entity';
import { CatVigenciaDTO } from '../models/from-tables/catVigencia-dto';
import { CatVigenciaMapping } from '../utils/from-tables/catVigencia-mapping';

@Injectable()
export class CatVigenciaRepository {
  constructor(
    @InjectRepository(CatVigenciaEntity)
    private readonly repository: Repository<CatVigenciaEntity>,
  ) {}

  public async getCatVigencia(
    queryParams: QueryParams,
  ): Promise<Wrapper<Array<CatVigenciaDTO>>> {
    try {
      const builder = new QueryFinder<CatVigenciaEntity>(null);
      builder.config(this.repository, queryParams, CatVigenciaMapping.aliasConfig());

      const respuesta = await builder.execute();

      return respuesta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55cafc',
      );
    }
  }

  public async getCatVigenciaById(idRow: number): Promise<CatVigenciaDTO> {
    try {
      const queryBuilder = this.repository.createQueryBuilder();
      CatVigenciaMapping.aliasConfigDetail(queryBuilder);
      queryBuilder.where('id = :idRow', { idRow });
      const respuesta = await queryBuilder.getRawMany();
      if (!respuesta || respuesta.length === 0) return null;
      const resultado = CatVigenciaMapping.entityToDTO(respuesta[0]);
      return resultado;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-B-b860456f-71d3-44cf-b1e9-bad555e62d7c',
      );
    }
  }

  
  public async isExistsCatVigencia(idRow: number): Promise<number> {
    try {
      const query = this.repository
        .createQueryBuilder()
        .select('count(*)', 'cuenta')
        .where('id = :idRow', { idRow });
      const unit: any = await query.getRawMany();
      if (!unit) return null;
      return unit[0].cuenta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-1f355201-aa52-4f57-94a6-53892d6d4a20',
      );
    }
  }

  public async saveCatVigencia(payload: Partial<CatVigenciaDTO>): Promise<void> {
    try {
      const unit = CatVigenciaMapping.dTOToEntity(payload);
      await this.repository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  public async updateCatVigencia(id: number, payload: Partial<CatVigenciaDTO>): Promise<void> {
    try {
      const unit = CatVigenciaMapping.dTOToEntity(payload);
      await this.repository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  public async deleteCatVigencia(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-E-7b1f24a3-00fd-42b6-a0fd-32b38ff99ebe',
      );
    }
  }
}
