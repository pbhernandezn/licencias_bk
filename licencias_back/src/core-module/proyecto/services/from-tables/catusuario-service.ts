import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatUsuarioRepository } from '../../repository/catUsuario-repository';
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdDTO, getCatUsuarioByIdReq } from '../../models/from-tables/catUsuario-dto';


@Injectable()
export class CatUsuarioService {
  constructor(private readonly catUsuarioRepository: CatUsuarioRepository) {}

  /**
   * Obtiene la lista de todos los usuarios del catálogo.
   * @param queryParams - Parámetros de consulta para filtrado y paginación
   * @returns Array con los datos de todos los usuarios disponibles
   */
  public async getCatUsuarios(
    queryParams: QueryParams,
  ): Promise<Array<CatUsuariosDataDTO>> {
    return await this.catUsuarioRepository.getCatUsuarios(queryParams);
  }

  /**
   * Obtiene los datos de un usuario específico por su ID.
   * @param request - Objeto con el ID del usuario a buscar
   * @returns Objeto con los datos del usuario si existe, de lo contrario un objeto con existe: false
   */
  public async getCatUsuariosById(request: getCatUsuarioByIdReq): Promise<getCatUsuarioByIdDTO> {
    return await this.catUsuarioRepository.getCatUsuarioById(request);
  }

  /**   
   * Crea un nuevo usuario en la base de datos.
   * @param payload - Objeto con los datos del usuario a crear
   */
  public async createCatUsuario(payload: CatUsuarioDTO): Promise<void> {
    // Reglas aqui
    await this.catUsuarioRepository.saveCatUsuario(payload);
  }
  
  /**   
   * Actualiza los datos de un usuario existente.
   * @param id - ID del usuario a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   */
  public async updateCatUsuario(id: number, payload: Partial<CatUsuarioDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catUsuarioRepository.isExistsCatUsuario(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catUsuarioRepository.updateCatUsuario(id, payload);
  }

  /**   
   * Elimina un usuario de la base de datos.
   * @param id - ID del usuario a eliminar
   */
  public async deleteCatUsuario(id: number): Promise<void> {
    {
      const respuesta = await this.catUsuarioRepository.isExistsCatUsuario(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catUsuarioRepository.deleteCatUsuario(id);
  }
}
