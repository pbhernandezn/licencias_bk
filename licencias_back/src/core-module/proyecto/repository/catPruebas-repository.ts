import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatPruebasEntity } from '../models/entities/catPruebas-entity';
import { CatPruebasDataDTO, CatPruebasDTO, getCatPruebaByIdReq, getCatPruebasByIdDTO } from '../models/from-tables/catPruebas-dto';
import { CatPruebasMapping } from '../utils/from-tables/catPruebas-mapping';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';

@Injectable()
export class CatPruebasRepository {
  constructor(
    @InjectRepository(CatPruebasEntity)
    private readonly repository: Repository<CatPruebasEntity>,
    @InjectRepository(CatEstatusEntity)
            private readonly catEstatusRepository: Repository<CatEstatusEntity>,
  ) {}

  /**
   * Obtiene la lista de todas las pruebas del catálogo.
   * @param queryParams - Parámetros de consulta para filtrado y paginación
   * @returns Array con los datos de todas las pruebas disponibles
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async getCatPruebas(
    queryParams: QueryParams
  ): Promise<Array<CatPruebasDataDTO>> {
    try {
      const result: any[] = await this.repository
        .createQueryBuilder('cat_pruebas')
        .leftJoin(
          'cat_estatus',
          'estatus',
          'estatus.tabla = :tabla AND cat_pruebas.idestatus = estatus.id',
          { tabla: 'cat_pruebas' },
        )
        .select([
          'cat_pruebas.id',
          'cat_pruebas.prueba',
          'cat_pruebas.descripcion',
          'cat_pruebas.presencial',
          'cat_pruebas.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) return [];

      const pruebasData: Array<CatPruebasDataDTO> = result.map((r) => ({
        id: r['cat_pruebas_id'],
        prueba: r['cat_pruebas_prueba'],
        descripcion: r['cat_pruebas_descripcion'],
        presencial: r['cat_pruebas_presencial'],
        idestatus: r['cat_pruebas_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return pruebasData;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cpr1',
          );
        }
  }

  /**
   * Obtiene los datos de una prueba específica por su ID.
   * @param request - Objeto con el ID de la prueba a buscar
   * @returns Objeto con los datos de la prueba si existe, de lo contrario un objeto con existe: false
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async getCatPruebaById(
      request: getCatPruebaByIdReq
    ): Promise<getCatPruebasByIdDTO> {
      try {
        const result = await this.repository
          .createQueryBuilder('cat_pruebas')
          .leftJoin(
            'cat_estatus',
            'estatus',
            'estatus.tabla = :tabla AND cat_pruebas.idestatus = estatus.id',
              { tabla: 'cat_pruebas' },
          )
          .select([
            'cat_pruebas.id',
            'cat_pruebas.prueba',
            'cat_pruebas.descripcion',
            'cat_pruebas.presencial',
            'cat_pruebas.idestatus',
            'estatus.estatus AS estatus_estatus',
            ])
          .where('cat_pruebas.id = :id', { id: request.id })
          .getRawOne();
  
        const catPruebasDTO: getCatPruebasByIdDTO = {
          existe: !!result,
          catPruebas: result
            ? {
                id: result['cat_pruebas_id'],
                prueba: result['cat_pruebas_prueba'],
                descripcion: result['cat_pruebas_descripcion'],
                presencial: result['cat_pruebas_presencial'],
                idestatus: result['cat_pruebas_idestatus'],
                estatus: result['estatus_estatus'],
              }
            : undefined,
        };
  
        return catPruebasDTO;
      } catch (error) {
        throw ManejadorErrores.getFallaBaseDatos(
          error.message,
          'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cpr2',
        );
      }
    }

  /**
   * Verifica si existe una prueba con el ID especificado.
   * @param idRow - ID de la prueba a verificar
   * @returns Número de registros encontrados (0 si no existe, 1 si existe)
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async isExistsCatPruebas(idRow: number): Promise<number> {
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
   * Guarda una nueva prueba en la base de datos.
   * @param payload - Objeto con los datos de la prueba a guardar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async saveCatPruebas(payload: Partial<CatPruebasDTO>): Promise<void> {
    try {
      const unit = CatPruebasMapping.dTOToEntity(payload);
      await this.repository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  /**
   * Actualiza los datos de una prueba existente.
   * @param id - ID de la prueba a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async updateCatPruebas(id: number, payload: Partial<CatPruebasDTO>): Promise<void> {
    try {
      const unit = CatPruebasMapping.dTOToEntity(payload);
      await this.repository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  /**
   * Elimina una prueba de la base de datos.
   * @param id - ID de la prueba a eliminar
   * @throws ManejadorErrores si ocurre un error en la base de datos
   */
  public async deleteCatPruebas(id: number): Promise<void> {
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
