import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { CatalogoExpose } from '@principal/core-module/proyecto/expose/from-front/catalogo-expose';
import { CatCPDTO } from '@principal/core-module/proyecto/models/from-tables/catCP-dto';
import { CatDocumentosDTO } from '@principal/core-module/proyecto/models/from-tables/catDocumentos-dto';
import { CatEstatusDTO } from '@principal/core-module/proyecto/models/from-tables/catEstatus-dto';
import { CatLicenciasDTO } from '@principal/core-module/proyecto/models/from-tables/catLicencias-dto';
import { CatLugaresDTO } from '@principal/core-module/proyecto/models/from-tables/catLugares-dto';
import { CatPruebasDTO } from '@principal/core-module/proyecto/models/from-tables/catPruebas-dto';
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdDTO, getCatUsuarioByIdReq } from '@principal/core-module/proyecto/models/from-tables/catUsuario-dto';
import { CatVigenciaDTO } from '@principal/core-module/proyecto/models/from-tables/catVigencia-dto';

@Controller('/api/catalogo')
export class CatalogoController {
  constructor(
    private readonly catalogoExpose: CatalogoExpose,
  ) {}

  @Get('/catUsuarios')
  async catUsuarios(): Promise<BaseResponse<Array<CatUsuariosDataDTO>>> {
    const respuesta = await this.catalogoExpose.catUsuarios();
    return respuesta;
  }

  @Post('/CatUsuarioById')
  @ApiBody({ type: getCatUsuarioByIdReq })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: BaseResponse })
    async getUsuarioById(@Body() request: getCatUsuarioByIdReq): Promise<BaseResponse<getCatUsuarioByIdDTO>> {
      const respuesta = await this.catalogoExpose.catUsuariosById(request);
      return respuesta;
    }
/*
   @Get('/catMunicipios/:cp')
  async catMunicipios(@Param('cp') cp: string): Promise<BaseResponse<Array<CatCPDTO>>> {
    const respuesta = await this.catalogoExpose.catMunicipioByCP(cp);
    return respuesta;
  }

  @Get('/catDocumentos')
  async catDocumentos(): Promise<BaseResponse<Array<CatDocumentosDTO>>> {
    const respuesta = await this.catalogoExpose.catDocumentos();
    return respuesta;
  }

  @Get('/catEstatus/:tabla')
  async catEstatus(@Param('tabla') tabla: string): Promise<BaseResponse<Array<CatEstatusDTO>>> {
    const respuesta = await this.catalogoExpose.catEstatusByTabla(tabla);
    return respuesta;
  }

  @Get('/catLicencias/:licencia')
  async catLicencias(@Param('licencia') licencia: string): Promise<BaseResponse<Array<CatLicenciasDTO>>> {
    const respuesta = await this.catalogoExpose.catLicenciasByLicencia(licencia);
    return respuesta;
  }

  @Get('/catLugares')
  async catLugares(): Promise<BaseResponse<Array<CatLugaresDTO>>> {
    const respuesta = await this.catalogoExpose.catLugares();
    return respuesta;
  }
  
  @Get('/catPruebas')
  async catPruebas(): Promise<BaseResponse<Array<CatPruebasDTO>>> {
    const respuesta = await this.catalogoExpose.catPruebas();
    return respuesta;
  }

  @Get('/catVigencias')
  async catVigencias(): Promise<BaseResponse<Array<CatVigenciaDTO>>> {
    const respuesta = await this.catalogoExpose.catVigencias();
    return respuesta;
  }*/
}
