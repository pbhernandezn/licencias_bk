import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatEstatusRepository } from '../../repository/catEstatus-repository';
import { CatEstatusDTO, getCatEstatusByIdDTO, getCatEstatusByIdReq, getCatEstatusByTablaDTO, getCatEstatusByTablaReq } from '../../models/from-tables/catEstatus-dto';


@Injectable()
export class CatEstatusService {
  constructor(private readonly catEstatusRepository: CatEstatusRepository) {}

  /**
   * Obtiene los datos de un estatus específico por su ID.
   * @param request - Objeto con el ID del estatus a buscar
   * @returns Objeto con los datos del estatus si existe, de lo contrario un objeto con existe: false
   */
  public async getCatEstatusById(
      request: getCatEstatusByIdReq
    ): Promise<getCatEstatusByIdDTO> {
      return await this.catEstatusRepository.getCatEstatusById(request);
    }
  
    /**
   * Obtiene los estatus asociados a una tabla específica.
   * @param request - Objeto con el nombre de la tabla para buscar los estatus
   * @returns Objeto con los estatus asociados a la tabla
   */
    public async getCatEstatusByTabla(
      request: getCatEstatusByTablaReq
    ): Promise<getCatEstatusByTablaDTO> {
      return await this.catEstatusRepository.getCatEstatusByTabla(request);
    }

  /**   
   * Crea un nuevo estatus en la base de datos.
   * @param payload - Objeto con los datos del estatus a crear
   */  
  public async createCatEstatus(payload: CatEstatusDTO): Promise<void> {
    // Reglas aqui
    await this.catEstatusRepository.saveCatEstatus(payload);
  }

  /**   
   * Actualiza los datos de un estatus existente.
   * @param id - ID del estatus a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   */
  public async updateCatEstatus(id: number, payload: Partial<CatEstatusDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catEstatusRepository.isExistsCatEstatus(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catEstatusRepository.updateCatEstatus(id, payload);
  }

  /**   
   * Elimina un estatus de la base de datos.
   * @param id - ID del estatus a eliminar
   */
  public async deleteCatEstatus(id: number): Promise<void> {
    {
      const respuesta = await this.catEstatusRepository.isExistsCatEstatus(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catEstatusRepository.deleteCatEstatus(id);
  }
}
