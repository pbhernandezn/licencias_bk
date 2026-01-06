import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatLugaresRepository } from '../../repository/catLugares-repository';
import { CatLugaresDataDTO, CatLugaresDTO, getCatLugarByIdReq, getCatLugaresByIdDTO } from '../../models/from-tables/catLugares-dto';


@Injectable()
export class CatLugaresService {
  constructor(private readonly catLugaresRepository: CatLugaresRepository) {}

  /**
   * Obtiene la lista de todos los lugares del catálogo.
   * @param queryParams - Parámetros de consulta para filtrado y paginación
   * @returns Array con los datos de todos los lugares disponibles
   */
  public async getCatLugares(
        queryParams: QueryParams,
      ): Promise<Array<CatLugaresDataDTO>> {
        return await this.catLugaresRepository.getCatLugares(queryParams);
      }

  /**
   * Obtiene los datos de un lugar específico por su ID.
   * @param request - Objeto con el ID del lugar a buscar
   * @returns Objeto con los datos del lugar si existe, de lo contrario un objeto con existe: false
   */
  public async getCatLugaresById(request: getCatLugarByIdReq): Promise<getCatLugaresByIdDTO> {
    return await this.catLugaresRepository.getCatLugarById(request);
  }

  /**   
   * Crea un nuevo lugar en la base de datos.
   * @param payload - Objeto con los datos del lugar a crear
   */
  public async createCatLugares(payload: CatLugaresDTO): Promise<void> {
    // Reglas aqui
    await this.catLugaresRepository.saveCatLugares(payload);
  }

  /**
   * Actualiza los datos de un lugar existente.
   * @param id - ID del lugar a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   */
  public async updateCatLugares(id: number, payload: Partial<CatLugaresDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catLugaresRepository.isExistsCatLugares(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catLugaresRepository.updateCatLugares(id, payload);
  }

  /**
   * Elimina un lugar de la base de datos.
   * @param id - ID del lugar a eliminar
   */
  public async deleteCatLugares(id: number): Promise<void> {
    {
      const respuesta = await this.catLugaresRepository.isExistsCatLugares(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catLugaresRepository.deleteCatLugares(id);
  }
}
