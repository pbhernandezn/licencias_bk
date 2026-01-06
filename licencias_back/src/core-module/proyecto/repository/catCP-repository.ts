import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatCPEntity } from '../models/entities/catCP-entity';
import { CatCPDTO } from '../models/from-tables/catCP-dto';
import { CatCPMapping } from '../utils/from-tables/catCP-mapping';

@Injectable()
export class CatCPRepository {
  constructor(
    @InjectRepository(CatCPEntity)
    private readonly repository: Repository<CatCPEntity>,
  ) {}

    public async getCatCPById(idRow: number): Promise<CatCPDTO> {
    try {
      const queryBuilder = this.repository.createQueryBuilder();
      CatCPMapping.aliasConfigDetail(queryBuilder);
      queryBuilder.where('id = :idRow', { idRow });
      const respuesta = await queryBuilder.getRawMany();
      if (!respuesta || respuesta.length === 0) return null;
      const resultado = CatCPMapping.entityToDTO(respuesta[0]);
      return resultado;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-B-b860456f-71d3-44cf-b1e9-bad555e62_CP',
      );
    }
  }

  public async getCatCPByCP(cp: string): Promise<Wrapper<Array<CatCPDTO>>> {
    try {
      
      const queryBuilder = await this.repository.createQueryBuilder()
      .select('*').where('cp = :cp', { cp }).getRawMany();
      console.log(queryBuilder);
      //CatCPMapping.aliasConfigDetail(queryBuilder);
      /*queryBuilder.where('cp = :cp', { cp });
      const respuesta = await queryBuilder.getRawMany();
      const resultado = CatCPMapping.arrayEntityToDTO(respuesta);
      const itemsCount = respuesta?.length ?? 0;*/
      return new Wrapper(null, 0, null, true, 'Consulta exitosa', {});
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-B-b860456f-71d3-44cf-b1e9-bad555e6_CP2',
      );
    }
  }

  
  public async isExistsCatCP(idRow: number): Promise<number> {
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

  public async saveCatCP(payload: Partial<CatCPDTO>): Promise<void> {
    try {
      const unit = CatCPMapping.dTOToEntity(payload);
      await this.repository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  public async updateCatCP(id: number, payload: Partial<CatCPDTO>): Promise<void> {
    try {
      const unit = CatCPMapping.dTOToEntity(payload);
      await this.repository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  public async deleteCatCP(id: number): Promise<void> {
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
