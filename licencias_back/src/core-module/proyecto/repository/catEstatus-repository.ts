import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';
import { CatEstatusDTO } from '../models/from-tables/catEstatus-dto';
import { CatEstatusMapping } from '../utils/from-tables/catEstatus-mapping';

@Injectable()
export class CatEstatusRepository {
  constructor(
    @InjectRepository(CatEstatusEntity)
    private readonly repository: Repository<CatEstatusEntity>,
  ) {}

    public async getCatEstatusById(idRow: number): Promise<CatEstatusDTO> {
    try {
      const queryBuilder = this.repository.createQueryBuilder();
      CatEstatusMapping.aliasConfigDetail(queryBuilder);
      queryBuilder.where('id = :idRow', { idRow });
      const respuesta = await queryBuilder.getRawMany();
      if (!respuesta || respuesta.length === 0) return null;
      const resultado = CatEstatusMapping.entityToDTO(respuesta[0]);
      return resultado;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-B-b860456f-71d3-44cf-b1e9-bad555e62d7c',
      );
    }
  }

  public async getCatEstatusByTabla(tabla: string): Promise<Wrapper<Array<CatEstatusDTO>>> {
    try {
      const queryBuilder = this.repository.createQueryBuilder();
      CatEstatusMapping.aliasConfigDetail(queryBuilder);
      queryBuilder.where('tabla = :tabla', { tabla });
      const respuesta = await queryBuilder.getRawMany();
      const resultado = CatEstatusMapping.arrayEntityToDTO(respuesta);
      const itemsCount = respuesta?.length ?? 0;
      return new Wrapper(null, itemsCount, resultado, true, 'Consulta exitosa', null);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-B-b860456f-71d3-44cf-b1e9-bad555e62d7c',
      );
    }
  }

  
  public async isExistsCatEstatus(idRow: number): Promise<number> {
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

  public async saveCatEstatus(payload: Partial<CatEstatusDTO>): Promise<void> {
    try {
      const unit = CatEstatusMapping.dTOToEntity(payload);
      await this.repository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  public async updateCatEstatus(id: number, payload: Partial<CatEstatusDTO>): Promise<void> {
    try {
      const unit = CatEstatusMapping.dTOToEntity(payload);
      await this.repository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  public async deleteCatEstatus(id: number): Promise<void> {
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
