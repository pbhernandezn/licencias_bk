import { Controller, Get } from '@nestjs/common';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { CatalogoExpose } from '@principal/core-module/proyecto/expose/from-front/catalogo-expose';

@Controller('/api/catalogo')
export class CatalogoController {
  constructor(
    private readonly catalogoExpose: CatalogoExpose,
  ) {}

  @Get('/catUsuarios')
  async catUsuarios(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoExpose.catUsuarios();
    return respuesta;
  }

  /*@Get('/catLicencias')
  async catLicencias(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoExpose.catLicencias();
    return respuesta;
  }

  @Get('/catVigencia')
  async catVigencia(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoExpose.catVigencia();
    return respuesta;
  }

  @Get('/catEstatus')
  async catEstatus(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoExpose.catEstatus();
    return respuesta;
  }

  @Get('/catPrueba')
  async catPrueba(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoExpose.catPrueba();
    return respuesta;
  }

  @Get('/catLugares')
  async catLugares(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoExpose.catLugares();
    return respuesta;
  }
  */
}
