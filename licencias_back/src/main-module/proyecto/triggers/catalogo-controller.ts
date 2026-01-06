import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { CatalogoExpose } from '@principal/core-module/proyecto/expose/from-front/catalogo-expose';
import { CatCPDTO, getCatCPByIdDTO, getCatCPByIdReq, getLocalidadByCPReq, getLocalidadesByCPDTO } from '@principal/core-module/proyecto/models/from-tables/catCP-dto';
import { CatDocumentosDataDTO, CatDocumentosDTO, getCatDocumentoByIdDTO, getCatDocumentoByIdReq } from '@principal/core-module/proyecto/models/from-tables/catDocumentos-dto';
import { CatEstatusDTO, getCatEstatusByIdDTO, getCatEstatusByIdReq, getCatEstatusByTablaDTO, getCatEstatusByTablaReq } from '@principal/core-module/proyecto/models/from-tables/catEstatus-dto';
import { CatLicenciasDTO, getCatLicenciaByIdDTO, getCatLicenciaByIdReq, getLicenciasByLicenciaDTO, getLicenciasByLicenciaReq } from '@principal/core-module/proyecto/models/from-tables/catLicencias-dto';
import { CatLugaresDataDTO, CatLugaresDTO, getCatLugarByIdReq, getCatLugaresByIdDTO } from '@principal/core-module/proyecto/models/from-tables/catLugares-dto';
import { CatPruebasDataDTO, CatPruebasDTO, getCatPruebaByIdReq, getCatPruebasByIdDTO } from '@principal/core-module/proyecto/models/from-tables/catPruebas-dto';
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdDTO, getCatUsuarioByIdReq } from '@principal/core-module/proyecto/models/from-tables/catUsuario-dto';
import { CatVigenciaDTO, getCatVigenciaByIdDTO, getCatVigenciaByIdReq } from '@principal/core-module/proyecto/models/from-tables/catVigencia-dto';

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

  @Post('/catUsuarioById')
  @ApiBody({ type: getCatUsuarioByIdReq })
  @ApiResponse({ status: 200, description: 'Catalogo de usuario encontrado', type: BaseResponse })
    async getUsuarioById(@Body() request: getCatUsuarioByIdReq): Promise<BaseResponse<getCatUsuarioByIdDTO>> {
      const respuesta = await this.catalogoExpose.catUsuariosById(request);
      return respuesta;
    }

  @Post('/localidadByCP')
  @ApiBody({ type: getLocalidadByCPReq })
  @ApiResponse({ status: 200, description: 'localidad encontrada', type: BaseResponse })
    async getLocalidadByCP(@Body() request: getLocalidadByCPReq): Promise<BaseResponse<getLocalidadesByCPDTO>> {
      const respuesta = await this.catalogoExpose.catLocalidadByCP(request);
      return respuesta;
  }

  @Post('/catCPById')
  @ApiBody({ type: getCatCPByIdReq })
  @ApiResponse({ status: 200, description: 'CP encontrada', type: BaseResponse })
    async getCPById(@Body() request: getCatCPByIdReq): Promise<BaseResponse<getCatCPByIdDTO>> {
      const respuesta = await this.catalogoExpose.catCPById(request);
      return respuesta;
    }

  @Get('/catDocumentos')
  async catDocumentos(): Promise<BaseResponse<Array<CatDocumentosDataDTO>>> {
    const respuesta = await this.catalogoExpose.catDocumentos();
    return respuesta;
  }

  @Post('/catDocumentoById')
  @ApiBody({ type: getCatDocumentoByIdReq })
  @ApiResponse({ status: 200, description: 'Documento encontrado', type: BaseResponse })
    async getDocumentoById(@Body() request: getCatDocumentoByIdReq): Promise<BaseResponse<getCatDocumentoByIdDTO>> {
      const respuesta = await this.catalogoExpose.catDocumentosById(request);
      return respuesta;
  }

  @Post('/catEstatusByTabla')
  @ApiBody({ type: getCatEstatusByTablaReq })
  @ApiResponse({ status: 200, description: 'estatus encontrado', type: BaseResponse })
    async getEstatusByTabla(@Body() request: getCatEstatusByTablaReq): Promise<BaseResponse<getCatEstatusByTablaDTO>> {
      const respuesta = await this.catalogoExpose.catEstatusByTabla(request);
      return respuesta;
  }

  @Post('/catEstatusById')
  @ApiBody({ type: getCatEstatusByIdReq })
  @ApiResponse({ status: 200, description: 'estatus encontrado', type: BaseResponse })
    async getEstatusById(@Body() request: getCatEstatusByIdReq): Promise<BaseResponse<getCatEstatusByIdDTO>> {
      const respuesta = await this.catalogoExpose.catEstatusById(request);
      return respuesta;
    }

  @Post('/catLicenciasByLicencia')
  @ApiBody({ type: getLicenciasByLicenciaReq })
  @ApiResponse({ status: 200, description: 'licencias encontradas', type: BaseResponse })
    async getLicenciasByLicencia(@Body() request: getLicenciasByLicenciaReq): Promise<BaseResponse<getLicenciasByLicenciaDTO>> {
      const respuesta = await this.catalogoExpose.catLicenciasByLicencia(request);
      return respuesta;
  }

  @Post('/catLicenciaById')
  @ApiBody({ type: getCatLicenciaByIdReq })
  @ApiResponse({ status: 200, description: 'licencia encontrada', type: BaseResponse })
    async getLicenciaById(@Body() request: getCatLicenciaByIdReq): Promise<BaseResponse<getCatLicenciaByIdDTO>> {
      const respuesta = await this.catalogoExpose.catLicenciaById(request);
      return respuesta;
    }

  @Get('/catLugares')
  async catLugares(): Promise<BaseResponse<Array<CatLugaresDataDTO>>> {
    const respuesta = await this.catalogoExpose.catLugares();
    return respuesta;
  }

  @Post('/catLugarById')
  @ApiBody({ type: getCatLugarByIdReq })
  @ApiResponse({ status: 200, description: 'lugar encontrado', type: BaseResponse })
    async getLugarById(@Body() request: getCatLugarByIdReq): Promise<BaseResponse<getCatLugaresByIdDTO>> {
      const respuesta = await this.catalogoExpose.catLugarById(request);
      return respuesta;
  }

  @Get('/catPruebas')
  async catPruebas(): Promise<BaseResponse<Array<CatPruebasDataDTO>>> {
    const respuesta = await this.catalogoExpose.catPrueba();
    return respuesta;
  }

  @Post('/catPruebaById')
  @ApiBody({ type: getCatPruebaByIdReq })
  @ApiResponse({ status: 200, description: 'Prueba encontrada', type: BaseResponse })
    async getPruebaById(@Body() request: getCatPruebaByIdReq): Promise<BaseResponse<getCatPruebasByIdDTO>> {
      const respuesta = await this.catalogoExpose.catPruebaById(request);
      return respuesta;
  }

  @Get('/catVigencias')
  async catVigencias(): Promise<BaseResponse<Array<CatVigenciaDTO>>> {
    const respuesta = await this.catalogoExpose.catVigencia();
    return respuesta;
  }

  @Post('/catVigenciaById')
  @ApiBody({ type: getCatVigenciaByIdReq })
  @ApiResponse({ status: 200, description: 'Vigencia encontrada', type: BaseResponse })
    async getVigenciaById(@Body() request: getCatVigenciaByIdReq): Promise<BaseResponse<getCatVigenciaByIdDTO>> {
      const respuesta = await this.catalogoExpose.catVigenciaById(request);
      return respuesta;
  }

}
