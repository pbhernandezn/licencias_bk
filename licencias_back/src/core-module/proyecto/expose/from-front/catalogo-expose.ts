import { Injectable } from '@nestjs/common';
import{BaseResponse,} from'@principal/commons-module/proyecto/models/base-response';
import {
  RESPONSE_CODES,
  INTERNAL_CODES,
  INTERNAL_MESSAGES,
} from '@principal/commons-module/proyecto/utils/messages-enum';
import { CatalogoService } from '../../services/from-front/catalogo-services';
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdDTO, getCatUsuarioByIdReq } from '../../models/from-tables/catUsuario-dto';
import { CatCPDTO } from '../../models/from-tables/catCP-dto';
import { CatDocumentosDTO } from '../../models/from-tables/catDocumentos-dto';
import { CatEstatusDTO } from '../../models/from-tables/catEstatus-dto';
import { CatLicenciasDTO } from '../../models/from-tables/catLicencias-dto';
import { CatLugaresDTO } from '../../models/from-tables/catLugares-dto';
import { CatPruebasDTO } from '../../models/from-tables/catPruebas-dto';
import { CatVigenciaDTO } from '../../models/from-tables/catVigencia-dto';

@Injectable()
export class CatalogoExpose {
  constructor(private readonly catalogoService: CatalogoService) {}

  async catUsuarios(): Promise<BaseResponse<Array<CatUsuariosDataDTO>>> {
    const respuesta = await this.catalogoService.catUsuario();
    const resultado = new BaseResponse<Array<CatUsuariosDataDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catUsuariosById(
    request: getCatUsuarioByIdReq,
  ): Promise<BaseResponse<getCatUsuarioByIdDTO>> {
    const respuesta = await this.catalogoService.getCatUsuarioById(request);
    const resultado = new BaseResponse<getCatUsuarioByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catMunicipioByCP(cp: string): Promise<BaseResponse<Array<CatCPDTO>>> {
    const respuesta = await this.catalogoService.catCPByCP(cp);
    const resultado = new BaseResponse<Array<CatCPDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catCPById(
    idRow: number,
  ): Promise<BaseResponse<CatCPDTO>> {
    const respuesta = await this.catalogoService.catCPById(idRow);
    const resultado = new BaseResponse<CatCPDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catDocumentos(): Promise<BaseResponse<Array<CatDocumentosDTO>>> {
    const respuesta = await this.catalogoService.catDocumentos();
    const resultado = new BaseResponse<Array<CatDocumentosDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catDocumentosById(
    idRow: number,
  ): Promise<BaseResponse<CatDocumentosDTO>> {
    const respuesta = await this.catalogoService.catDocumentoById(idRow);
    const resultado = new BaseResponse<CatDocumentosDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catEstatusByTabla(tabla: string): Promise<BaseResponse<Array<CatEstatusDTO>>> {
    const respuesta = await this.catalogoService.catEstatusByTabla(tabla);
    const resultado = new BaseResponse<Array<CatEstatusDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catEstatusById(
    idRow: number,
  ): Promise<BaseResponse<CatEstatusDTO>> {
    const respuesta = await this.catalogoService.catEstatusById(idRow);
    const resultado = new BaseResponse<CatEstatusDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catLicenciasByLicencia(licencia: string): Promise<BaseResponse<Array<CatLicenciasDTO>>> {
    const respuesta = await this.catalogoService.catLicenciasByLicencias(licencia);
    const resultado = new BaseResponse<Array<CatLicenciasDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catLicenciaById(
    idRow: number,
  ): Promise<BaseResponse<CatLicenciasDTO>> {
    const respuesta = await this.catalogoService.catLicenciaById(idRow);
    const resultado = new BaseResponse<CatLicenciasDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catLugares(): Promise<BaseResponse<Array<CatLugaresDTO>>> {
    const respuesta = await this.catalogoService.catLugares();
    const resultado = new BaseResponse<Array<CatLugaresDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catLugaresById(
    idRow: number,
  ): Promise<BaseResponse<CatLugaresDTO>> {
    const respuesta = await this.catalogoService.catLugarById(idRow);
    const resultado = new BaseResponse<CatLugaresDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catPruebas(): Promise<BaseResponse<Array<CatPruebasDTO>>> {
    const respuesta = await this.catalogoService.catPruebas();
    const resultado = new BaseResponse<Array<CatPruebasDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catPruebasById(
    idRow: number,
  ): Promise<BaseResponse<CatPruebasDTO>> {
    const respuesta = await this.catalogoService.catPruebaById(idRow);
    const resultado = new BaseResponse<CatPruebasDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catVigencias(): Promise<BaseResponse<Array<CatVigenciaDTO>>> {
    const respuesta = await this.catalogoService.catVigencias();
    const resultado = new BaseResponse<Array<CatVigenciaDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async catVigenciaById(
    idRow: number,
  ): Promise<BaseResponse<CatVigenciaDTO>> {
    const respuesta = await this.catalogoService.catVigenciaById(idRow);
    const resultado = new BaseResponse<CatVigenciaDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

 
}
