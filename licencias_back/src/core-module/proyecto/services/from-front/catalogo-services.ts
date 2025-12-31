import { Injectable } from '@nestjs/common';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { CatUsuarioService } from '../from-tables/catusuario-service';
import { CatUsuarioDTO } from '../../models/from-tables/catusuario-dto';

@Injectable()
export class CatalogoService {
  constructor(
    private readonly catUsuarioService: CatUsuarioService,
  ) {}

  public async catUsuario() {
    let catUsuario: Array<CatUsuarioDTO>;
    {
      const queryParams = new QueryParams();
      const respuesta = await this.catUsuarioService.getCatUsuarios(queryParams);
      if (!respuesta.result || respuesta.result.length === 0) {
        throw ManejadorErrores.getDatosVitalesNoCargados(
          'tipo de roles no encontrados',
          'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
        );
      }
      catUsuario = respuesta.result as Array<CatUsuarioDTO>;
    }

    const result = catUsuario.map((elementA) => {
      return elementA.usuario;
    });

    return result;
  }
}
