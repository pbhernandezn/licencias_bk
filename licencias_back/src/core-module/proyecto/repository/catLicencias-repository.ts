import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatLicenciasEntity } from '../models/entities/catLicencias-entity';
import { CatLicenciasDataDTO, CatLicenciasDTO, getCatLicenciaByIdDTO, getCatLicenciaByIdReq, getLicenciasByLicenciaDTO, getLicenciasByLicenciaReq } from '../models/from-tables/catLicencias-dto';
import { CatLicenciasMapping } from '../utils/from-tables/catLicencias-mapping';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';

@Injectable()
export class CatLicenciasRepository {
  constructor(
    @InjectRepository(CatLicenciasEntity)
    private readonly repository: Repository<CatLicenciasEntity>,
    @InjectRepository(CatEstatusEntity)
            private readonly catEstatusRepository: Repository<CatEstatusEntity>,
  ) {}

    /**
     * Obtiene los datos de una licencia específica por su ID.
     * @param request - Objeto con el ID de la licencia a buscar
     * @returns Objeto con los datos de la licencia si existe, de lo contrario un objeto con existe: false
     * @throws ManejadorErrores si ocurre un error en la base de datos
     */
    public async getCatLicenciasById(
            request: getCatLicenciaByIdReq
          ): Promise<getCatLicenciaByIdDTO> {
        try {
          const result = await this.repository
            .createQueryBuilder('cat_licencias')
            .leftJoin(
              'cat_estatus',
              'estatus',
              'estatus.tabla = :tabla AND cat_licencias.idestatus = estatus.id',
              { tabla: 'cat_licencias' },
            )
            .select([
              'cat_licencias.id',
              'cat_licencias.licencia',
              'cat_licencias.descripcion',
              'cat_licencias.vigencia',
              'cat_licencias.precio',
              'cat_licencias.idestatus',
              'estatus.estatus AS estatus_estatus'
            ])
            .where('cat_licencias.id = :id', { id: request.id })
            .getRawOne();
    
          const catLicenciasDTO: getCatLicenciaByIdDTO = {
            existe: !!result,
            catLicencia: result
              ? {
                  id: result['cat_licencias_id'],
                  licencia: result['cat_licencias_licencia'],
                  descripcion: result['cat_licencias_descripcion'],
                  vigencia: result['cat_licencias_vigencia'],
                  precio: result['cat_licencias_precio'],
                  idestatus: result['cat_licencias_idestatus'],
                  estatus: result['estatus_estatus'],
                }
              : undefined,
          };
              
          return catLicenciasDTO;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
              error.message,
              'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cli1', 
          );
        }
      }
    
      /**
       * Obtiene todas las licencias asociadas a un código de licencia específico.
       * @param request - Objeto con el código de licencia a buscar
       * @returns Objeto con lista de licencias que coinciden con el código
       * @throws ManejadorErrores si ocurre un error en la base de datos
       */
      public async getCatLicenciasByLicencia(
          request: getLicenciasByLicenciaReq
        ): Promise<getLicenciasByLicenciaDTO> {
          try {
            const result: any[] = await this.repository
              .createQueryBuilder('cat_licencias')
            .leftJoin(
              'cat_estatus',
              'estatus',
              'estatus.tabla = :tabla AND cat_licencias.idestatus = estatus.id',
              { tabla: 'cat_licencias' },
            )
            .select([
                'cat_licencias.id',
                'cat_licencias.licencia',
                'cat_licencias.descripcion',
                'cat_licencias.vigencia',
                'cat_licencias.precio',
                'cat_licencias.idestatus',
                'estatus.estatus AS estatus_estatus'
              ])
              .where('cat_licencias.licencia = :licencia', { licencia: request.licencia })
              .getRawMany();
      
            if (!result || result.length === 0) return null;
      
            const catLicencias: Array<CatLicenciasDataDTO> = result.map((r) => ({
              id: r['cat_licencias_id'],
              licencia: r['cat_licencias_licencia'],
              descripcion: r['cat_licencias_descripcion'],
              vigencia: r['cat_licencias_vigencia'],
              precio: r['cat_licencias_precio'],
              idestatus: r['cat_licencias_idestatus'],
              estatus: r['estatus_estatus'],
            }));
    
                        
            const catLicenciasDTO: getLicenciasByLicenciaDTO = {
              existe: result && result.length > 0,
              catLicencias: catLicencias,
            };

            return catLicenciasDTO;
              } catch (error) {
                throw ManejadorErrores.getFallaBaseDatos(
                  error.message,
                  'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cli2',
                );
              }
        }

  /**
   * Verifica si existe una licencia con el ID especificado.
   * @param idRow - ID de la licencia a verificar
   * @returns Número de registros encontrados (0 si no existe, 1 si existe)
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async isExistsCatLicencias(idRow: number): Promise<number> {
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
   * Guarda una nueva licencia en la base de datos.
   * @param payload - Objeto con los datos de la licencia a guardar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async saveCatLicencias(payload: Partial<CatLicenciasDTO>): Promise<void> {
    try {
      const unit = CatLicenciasMapping.dTOToEntity(payload);
      await this.repository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  /**
   * Actualiza los datos de una licencia existente.
   * @param id - ID de la licencia a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async updateCatLicencias(id: number, payload: Partial<CatLicenciasDTO>): Promise<void> {
    try {
      const unit = CatLicenciasMapping.dTOToEntity(payload);
      await this.repository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  /**
   * Elimina una licencia de la base de datos.
   * @param id - ID de la licencia a eliminar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async deleteCatLicencias(id: number): Promise<void> {
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
