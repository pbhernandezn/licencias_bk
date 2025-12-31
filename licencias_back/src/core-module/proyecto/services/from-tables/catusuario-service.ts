import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatUsuarioRepository } from '../../repository/catUsuario-repository';
import { CatUsuarioDTO } from '../../models/from-tables/catUsuario-dto';


@Injectable()
export class CatUsuarioService {
  constructor(private readonly catUsuarioRepository: CatUsuarioRepository) {}

  public async getCatUsuarios(
    queryParams: QueryParams,
  ): Promise<Wrapper<Array<CatUsuarioDTO>>> {
    return await this.catUsuarioRepository.getCatUsuarios(queryParams);
  }

  public async createCatUsuario(payload: CatUsuarioDTO): Promise<void> {
    // Reglas aqui
    await this.catUsuarioRepository.saveCatUsuario(payload);
  }
  
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
