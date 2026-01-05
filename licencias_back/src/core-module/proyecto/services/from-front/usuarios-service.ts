import { Injectable } from '@nestjs/common';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { UsuariosTService } from '../from-tables/usuarios-service';
import { getUsuarioByIdDTO, getUsuarioByIdReq } from '../../models/from-tables/usuarios-dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuariosTService: UsuariosTService,
  ) {}

  public async getUsuarioById(request: getUsuarioByIdReq) {
    let catUsuario: getUsuarioByIdDTO;
    {
      try {
        const respuesta = await this.usuariosTService.getCatUsuarios(request);
        catUsuario = respuesta;
      } catch (error) {
        throw ManejadorErrores.getDatosVitalesNoCargados(
          'tipo de roles no encontrados',
          'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
        );
      }
    }

    return catUsuario;
  }
}
