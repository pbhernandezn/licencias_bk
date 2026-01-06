import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatCPRepository } from '../../repository/catCP-repository';
import { CatCPDTO, getCatCPByIdDTO, getCatCPByIdReq, getLocalidadByCPReq, getLocalidadesByCPDTO } from '../../models/from-tables/catCP-dto';


@Injectable()
export class CatCPService {
  constructor(private readonly catCPRepository: CatCPRepository) {}

  /**
   * Obtiene los datos de una CP específica por su ID.
   * @param request - Objeto con el ID de la CP a buscar
   * @returns Objeto con los datos de la CP si existe, de lo contrario un objeto con existe: false
   */
  public async getCatCPById(
    request: getCatCPByIdReq
  ): Promise<getCatCPByIdDTO> {
    return await this.catCPRepository.getCatCPById(request);
  }

  /**
   * Obtiene las localidades asociadas a un código postal específico.
   * @param request - Objeto con el código postal para buscar las localidades
   * @returns Objeto con las localidades asociadas al código postal
   */
   public async getLocalidadByCP(
    request: getLocalidadByCPReq
  ): Promise<getLocalidadesByCPDTO> {
    return await this.catCPRepository.getLocalidadesByCP(request);
  }

  /**
   * Crea una nueva CP en la base de datos.
   * @param payload - Objeto con los datos de la CP a crear
   */
  public async createCatCP(payload: CatCPDTO): Promise<void> {
    // Reglas aqui
    await this.catCPRepository.saveCatCP(payload);
  }
  
  /**
   * Actualiza los datos de una CP existente.
   * @param id - ID de la CP a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   */
  public async updateCatCP(id: number, payload: Partial<CatCPDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catCPRepository.isExistsCatCP(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catCPRepository.updateCatCP(id, payload);
  }

  /**   
   * Elimina una CP de la base de datos.
   * @param id - ID de la CP a eliminar
   */
  public async deleteCatCP(id: number): Promise<void> {
    {
      const respuesta = await this.catCPRepository.isExistsCatCP(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catCPRepository.deleteCatCP(id);
  }
}
