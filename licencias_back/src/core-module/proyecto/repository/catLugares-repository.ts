import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatLugaresEntity } from '../models/entities/catLugares-entity';
import { CatLugaresDataDTO, CatLugaresDTO, getCatLugarByIdReq, getCatLugaresByIdDTO } from '../models/from-tables/catLugares-dto';
import { CatLugaresMapping } from '../utils/from-tables/catLugares-mapping';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';

@Injectable()
export class CatLugaresRepository {
  constructor(
    @InjectRepository(CatLugaresEntity)
    private readonly repository: Repository<CatLugaresEntity>,
    @InjectRepository(CatEstatusEntity)
        private readonly catEstatusRepository: Repository<CatEstatusEntity>,
  ) {}

  public async getCatLugares(
        queryParams: QueryParams
      ): Promise<Array<CatLugaresDataDTO>> {
        try {
          const result: any[] = await this.repository
            .createQueryBuilder('cat_lugares')
            .leftJoin(
              'cat_estatus',
              'estatus',
              'estatus.tabla = :tabla AND cat_lugares.idestatus = estatus.id',
              { tabla: 'cat_lugares' },
            )
            .select([
              'cat_lugares.id',
              'cat_lugares.lugar',
              'cat_lugares.direccion',
              'cat_lugares.horario',
              'cat_lugares.telefono',
              'cat_lugares.idestatus',
              'estatus.estatus AS estatus_estatus',
            ])
            .getRawMany();
    
          if (!result || result.length === 0) return [];
    
          const lugares: Array<CatLugaresDataDTO> = result.map((r) => ({
            id: r['cat_lugares_id'],
            lugar: r['cat_lugares_lugar'],
            direccion: r['cat_lugares_direccion'],
            horario: r['cat_lugares_horario'],
            telefono: r['cat_lugares_telefono'],
            idestatus: r['cat_lugares_idestatus'],
            estatus: r['estatus_estatus'],
          }));
    
          return lugares;
            } catch (error) {
              throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_clu1',
              );
            }
      }
    
      public async getCatLugarById(
          request: getCatLugarByIdReq
        ): Promise<getCatLugaresByIdDTO> {
          try {
            const result = await this.repository
              .createQueryBuilder('cat_lugares')
              .leftJoin(
                'cat_estatus',
                'estatus',
                'estatus.tabla = :tabla AND cat_lugares.idestatus = estatus.id',
                 { tabla: 'cat_lugares' },
              )
              .select([
                'cat_lugares.id',
                'cat_lugares.lugar',
                'cat_lugares.direccion',
                'cat_lugares.horario',
                'cat_lugares.telefono',
                'cat_lugares.idestatus',
                'estatus.estatus AS estatus_estatus',
              ])
              .where('cat_lugares.id = :id', { id: request.id })
              .getRawOne();
      
            const catLugaresDTO: getCatLugaresByIdDTO = {
              existe: !!result,
              catLugares: result
                ? {
                    id: result['cat_lugares_id'],
                    lugar: result['cat_lugares_lugar'],
                    direccion: result['cat_lugares_direccion'],
                    horario: result['cat_lugares_horario'],
                    telefono: result['cat_lugares_telefono'],
                    idestatus: result['cat_lugares_idestatus'],
                    estatus: result['estatus_estatus'],
                  }
                : undefined,
            };
      
            return catLugaresDTO;
          } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
              error.message,
              'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_clu2',
            );
          }
        }

  
  public async isExistsCatLugares(idRow: number): Promise<number> {
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

  public async saveCatLugares(payload: Partial<CatLugaresDTO>): Promise<void> {
    try {
      const unit = CatLugaresMapping.dTOToEntity(payload);
      await this.repository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  public async updateCatLugares(id: number, payload: Partial<CatLugaresDTO>): Promise<void> {
    try {
      const unit = CatLugaresMapping.dTOToEntity(payload);
      await this.repository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  public async deleteCatLugares(id: number): Promise<void> {
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
