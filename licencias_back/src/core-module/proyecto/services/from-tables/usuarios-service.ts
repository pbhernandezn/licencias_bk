import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatUsuarioRepository } from '../../repository/catUsuario-repository';
import { CatUsuarioDTO } from '../../models/from-tables/catUsuario-dto';
import { UsuariosRepository } from '../../repository/usuarios-repository';
import { getUsuarioByIdDTO, getUsuarioByIdReq } from '../../models/from-tables/usuarios-dto';


@Injectable()
export class UsuariosTService {
  constructor(private readonly usuariosRepository: UsuariosRepository) {}

  public async getCatUsuarios(
    request: getUsuarioByIdReq
  ): Promise<getUsuarioByIdDTO> {
    return await this.usuariosRepository.getUsuarioById(request);
  }

}
