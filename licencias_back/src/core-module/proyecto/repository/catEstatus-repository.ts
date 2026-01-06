import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';
import { CatEstatusDTO, getCatEstatusByIdDTO, getCatEstatusByIdReq, getCatEstatusByTablaDTO, getCatEstatusByTablaReq } from '../models/from-tables/catEstatus-dto';
import { CatEstatusMapping } from '../utils/from-tables/catEstatus-mapping';

@Injectable()
export class CatEstatusRepository {
  constructor(
    @InjectRepository(CatEstatusEntity)
    private readonly repository: Repository<CatEstatusEntity>,
  ) {}

    /**
     * Obtiene los datos de un estatus específico por su ID.
     * @param request - Objeto con el ID del estatus a buscar
     * @returns Objeto con los datos del estatus si existe, de lo contrario un objeto con existe: false
     * @throws ManejadorErrores si ocurre un error en la base de datos
     */
    public async getCatEstatusById(
        request: getCatEstatusByIdReq
      ): Promise<getCatEstatusByIdDTO> {
    try {
      const result = await this.repository
        .createQueryBuilder('cat_estatus')
        .select([
          'cat_estatus.id',
          'cat_estatus.estatus',
          'cat_estatus.tabla',
          'cat_estatus.activo',
        ])
        .where('cat_estatus.id = :id', { id: request.id })
        .getRawOne();

      const catEstatusDTO: getCatEstatusByIdDTO = {
        existe: !!result,
        catEstatus: result
          ? {
              id: result['cat_estatus_id'],
              estatus: result['cat_estatus_estatus'],
              tabla: result['cat_estatus_tabla'],
              activo: result['cat_estatus_activo'],
            }
          : undefined,
      };
      
      return catEstatusDTO;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
          error.message,
          'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_ces1', 
      );
    }
  }

  /**
   * Obtiene todos los estatus asociados a una tabla específica.
   * @param request - Objeto con el nombre de la tabla a buscar
   * @returns Objeto con lista de estatus que corresponden a la tabla
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async getCatEstatusByTabla(
      request: getCatEstatusByTablaReq
    ): Promise<getCatEstatusByTablaDTO> {
      try {
        const result: any[] = await this.repository
          .createQueryBuilder('cat_estatus')
          .select([
            'cat_estatus.id',
            'cat_estatus.estatus',
            'cat_estatus.tabla',
            'cat_estatus.activo',
          ])
          .where('cat_estatus.tabla = :tabla', { tabla: request.tabla })
          .getRawMany();
  
        if (!result || result.length === 0) return null;
  
        const catEstatus: Array<CatEstatusDTO> = result.map((r) => ({
          id: r['cat_cp_id'],
          estatus: r['cat_estatus_estatus'],
          tabla: r['cat_estatus_tabla'],
          activo: r['cat_estatus_activo'],
        }));

        const catEstatusDTO: getCatEstatusByTablaDTO = {
          existe: result && result.length > 0,
          catEstatus: catEstatus,
        };

        return catEstatusDTO;
          } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
              error.message,
              'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_ces2',
            );
          }
    }

  /**
   * Verifica si existe un estatus con el ID especificado.
   * @param idRow - ID del estatus a verificar
   * @returns Número de registros encontrados (0 si no existe, 1 si existe)
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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

  /**
   * Guarda un nuevo estatus en la base de datos.
   * @param payload - Objeto con los datos del estatus a guardar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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

  /**
   * Actualiza los datos de un estatus existente.
   * @param id - ID del estatus a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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

  /**
   * Elimina un estatus de la base de datos.
   * @param id - ID del estatus a eliminar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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
