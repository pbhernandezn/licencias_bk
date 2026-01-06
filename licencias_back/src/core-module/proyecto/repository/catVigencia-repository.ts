import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatVigenciaEntity } from '../models/entities/catVigencia-entity';
import { CatVigenciaDataDTO, CatVigenciaDTO, getCatVigenciaByIdDTO, getCatVigenciaByIdReq } from '../models/from-tables/catVigencia-dto';
import { CatVigenciaMapping } from '../utils/from-tables/catVigencia-mapping';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';

@Injectable()
export class CatVigenciaRepository {
  constructor(
    @InjectRepository(CatVigenciaEntity)
    private readonly repository: Repository<CatVigenciaEntity>,
    @InjectRepository(CatEstatusEntity)
    private readonly catEstatusRepository: Repository<CatEstatusEntity>,
  ) {}

  public async getCatVigencias(
    queryParams: QueryParams
  ): Promise<Array<CatVigenciaDataDTO>> {
    try {
      const result: any[] = await this.repository
        .createQueryBuilder('cat_vigencia')
        .leftJoin(
          'cat_estatus',
          'estatus',
          'estatus.tabla = :tabla AND cat_vigencia.idestatus = estatus.id',
          { tabla: 'cat_vigencia' },
        )
        .select([
          'cat_vigencia.id',
          'cat_vigencia.vigencia',
          'cat_vigencia.descripcion',
          'cat_vigencia.anios',
          'cat_vigencia.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) return [];

      const vigenciasData: Array<CatVigenciaDataDTO> = result.map((r) => ({
        id: r['cat_vigencia_id'],
        vigencia: r['cat_vigencia_vigencia'],
        descripcion: r['cat_vigencia_descripcion'],
        anios: r['cat_vigencia_anios'],
        idestatus: r['cat_vigencia_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return vigenciasData;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cvg1',
          );
        }
  }

  public async getCatVigenciaById(
      request: getCatVigenciaByIdReq
    ): Promise<getCatVigenciaByIdDTO> {
      try {
        const result = await this.repository
          .createQueryBuilder('cat_vigencia')
          .leftJoin(
            'cat_estatus',
            'estatus',
            'estatus.tabla = :tabla AND cat_vigencia.idestatus = estatus.id',
              { tabla: 'cat_vigencia' },
          )
          .select([
            'cat_vigencia.id',
            'cat_vigencia.vigencia',
            'cat_vigencia.descripcion',
            'cat_vigencia.anios',
            'cat_vigencia.idestatus',
            'estatus.estatus AS estatus_estatus',
            ])
          .where('cat_vigencia.id = :id', { id: request.id })
          .getRawOne();

        const catVigenciaDTO: getCatVigenciaByIdDTO = {
          existe: !!result,
          catVigencia: result
            ? {
                id: result['cat_vigencia_id'],
                vigencia: result['cat_vigencia_vigencia'],
                descripcion: result['cat_vigencia_descripcion'],
                anios: result['cat_vigencia_anios'],
                idestatus: result['cat_vigencia_idestatus'],
                estatus: result['estatus_estatus'],
              }
            : undefined,
        };

        return catVigenciaDTO;
      } catch (error) {
        throw ManejadorErrores.getFallaBaseDatos(
          error.message,
          'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cvg2',
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
