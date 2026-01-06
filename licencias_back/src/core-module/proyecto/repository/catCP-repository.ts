import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatCPEntity } from '../models/entities/catCP-entity';
import { CatCPDTO, getCatCPByIdDTO, getCatCPByIdReq, getLocalidadByCPReq, getLocalidadesByCPDTO } from '../models/from-tables/catCP-dto';
import { CatCPMapping } from '../utils/from-tables/catCP-mapping';

@Injectable()
export class CatCPRepository {
  constructor(
    @InjectRepository(CatCPEntity)
    private readonly repository: Repository<CatCPEntity>,
  ) {}

  /**
   * Obtiene los datos de un código postal por su ID.
   * @param request - Objeto con el ID del código postal a buscar
   * @returns Objeto con los datos del código postal si existe, de lo contrario un objeto con existe: false
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async getCatCPById(
        request: getCatCPByIdReq
      ): Promise<getCatCPByIdDTO> {
    try {
      const result = await this.repository
        .createQueryBuilder('cat_cp')
        .select([
          'cat_cp.id',
          'cat_cp.cp',
          'cat_cp.municipio',
          'cat_cp.localidad',
        ])
        .where('cat_cp.id = :id', { id: request.id })
        .getRawOne();

      const catCPDTO: getCatCPByIdDTO = {
        existe: !!result,
        catCP: result
          ? {
              id: result['cat_cp_id'],
              cp: result['cat_cp_cp'],
              municipio: result['cat_cp_municipio'],
              localidad: result['cat_cp_localidad'],
            }
          : undefined,
      };
      
      return catCPDTO;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_ccp1',
      );
    }
  }

  /**
   * Obtiene todas las localidades asociadas a un código postal específico.
   * @param request - Objeto con el código postal a buscar
   * @returns Objeto con lista de localidades que coinciden con el código postal
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async getLocalidadesByCP(
      request: getLocalidadByCPReq
    ): Promise<getLocalidadesByCPDTO> {
      try {
        const result: any[] = await this.repository
          .createQueryBuilder('cat_cp')
          .select([
            'cat_cp.id',
            'cat_cp.cp',
            'cat_cp.municipio',
            'cat_cp.localidad',
          ])
          .where('cat_cp.cp = :cp', { cp: request.cp })
          .getRawMany();
  
        if (!result || result.length === 0) return null;
  
        const localidades: Array<CatCPDTO> = result.map((r) => ({
          id: r['cat_cp_id'],
          cp: r['cat_cp_cp'],
          municipio: r['cat_cp_municipio'],
          localidad: r['cat_cp_localidad'],
        }));

        const catCPsDTO: getLocalidadesByCPDTO = {
          existe: result && result.length > 0,
          catCPs: localidades,
        };

        return catCPsDTO;
          } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
              error.message,
              'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_ccp2',
            );
          }
    }

  /**
   * Verifica si existe un código postal con el ID especificado.
   * @param idRow - ID del código postal a verificar
   * @returns Número de registros encontrados (0 si no existe, 1 si existe)
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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

  /**
   * Guarda un nuevo código postal en la base de datos.
   * @param payload - Objeto con los datos del código postal a guardar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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

  /**
   * Actualiza los datos de un código postal existente.
   * @param id - ID del código postal a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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

  /**
   * Elimina un código postal de la base de datos.
   * @param id - ID del código postal a eliminar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
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
