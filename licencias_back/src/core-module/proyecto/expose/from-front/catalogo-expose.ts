import { Injectable } from '@nestjs/common';
import{BaseResponse,} from'@principal/commons-module/proyecto/models/base-response';
import {
  RESPONSE_CODES,
  INTERNAL_CODES,
  INTERNAL_MESSAGES,
} from '@principal/commons-module/proyecto/utils/messages-enum';
import { CatalogoService } from '../../services/from-front/catalogo-services';
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdDTO, getCatUsuarioByIdReq } from '../../models/from-tables/catUsuario-dto';
import { CatCPDTO, getCatCPByIdDTO, getCatCPByIdReq, getLocalidadByCPReq, getLocalidadesByCPDTO } from '../../models/from-tables/catCP-dto';
import { CatDocumentosDataDTO, CatDocumentosDTO, getCatDocumentoByIdDTO, getCatDocumentoByIdReq } from '../../models/from-tables/catDocumentos-dto';
import { CatEstatusDTO, getCatEstatusByIdDTO, getCatEstatusByIdReq, getCatEstatusByTablaDTO, getCatEstatusByTablaReq } from '../../models/from-tables/catEstatus-dto';
import { CatLicenciasDTO, getCatLicenciaByIdDTO, getCatLicenciaByIdReq, getLicenciasByLicenciaDTO, getLicenciasByLicenciaReq } from '../../models/from-tables/catLicencias-dto';
import { CatLugaresDataDTO, CatLugaresDTO, getCatLugarByIdReq, getCatLugaresByIdDTO } from '../../models/from-tables/catLugares-dto';
import { CatPruebasDataDTO, CatPruebasDTO, getCatPruebaByIdReq, getCatPruebasByIdDTO } from '../../models/from-tables/catPruebas-dto';
import { CatVigenciaDataDTO, CatVigenciaDTO, getCatVigenciaByIdDTO, getCatVigenciaByIdReq } from '../../models/from-tables/catVigencia-dto';

@Injectable()
export class CatalogoExpose {
  constructor(private readonly catalogoService: CatalogoService) {}

  /**   
   * Obtiene la lista de todos los usuarios del catálogo.
   * @returns Array con los datos de todos los usuarios disponibles
   */
  public async catUsuarios(): Promise<BaseResponse<Array<CatUsuariosDataDTO>>> {
    const respuesta = await this.catalogoService.getCatUsuarios();
    const resultado = new BaseResponse<Array<CatUsuariosDataDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de un usuario específico por su ID.
   * @param request - Objeto con el ID del usuario a buscar
   * @returns Objeto con los datos del usuario si existe, de lo contrario un objeto con existe: false
   */
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

  /**   
   * Obtiene la lista de todas las localidades asociadas a un código postal.
   * @param request - Objeto con el código postal a buscar
   * @returns Array con los datos de todas las localidades disponibles para el código postal
   */
  public async catLocalidadByCP(request: getLocalidadByCPReq): Promise<BaseResponse<getLocalidadesByCPDTO>> {
    const respuesta = await this.catalogoService.getLocalidadByCP(request);
    const resultado = new BaseResponse<getLocalidadesByCPDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de una CP específica por su ID.
   * @param request - Objeto con el ID de la CP a buscar
   * @returns Objeto con los datos de la CP si existe, de lo contrario un objeto con existe: false
   */
  public async catCPById(
    request: getCatCPByIdReq,
  ): Promise<BaseResponse<getCatCPByIdDTO>> {
    const respuesta = await this.catalogoService.getCatCPById(request);
    const resultado = new BaseResponse<getCatCPByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene la lista de todos los documentos del catálogo.
   * @returns Array con los datos de todos los documentos disponibles
   */
  public async catDocumentos(): Promise<BaseResponse<Array<CatDocumentosDataDTO>>> {
    const respuesta = await this.catalogoService.getCatDocumentos();
    const resultado = new BaseResponse<Array<CatDocumentosDataDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de un documento específico por su ID.
   * @param request - Objeto con el ID del documento a buscar
   * @returns Objeto con los datos del documento si existe, de lo contrario un objeto con existe: false
   */
  public async catDocumentosById(
    request: getCatDocumentoByIdReq,
  ): Promise<BaseResponse<getCatDocumentoByIdDTO>> {
    const respuesta = await this.catalogoService.getCatDocumentosById(request);
    const resultado = new BaseResponse<getCatDocumentoByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene la lista de todos los estatus del catálogo.
   * @param request - Objeto con el nombre de la tabla para buscar los estatus
   * @returns Array con los datos de todos los estatus disponibles para la tabla
   */
  public async catEstatusByTabla(request: getCatEstatusByTablaReq): Promise<BaseResponse<getCatEstatusByTablaDTO>> {
    const respuesta = await this.catalogoService.getCatEstatusByTabla(request);
    const resultado = new BaseResponse<getCatEstatusByTablaDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de un estatus específico por su ID.
   * @param request - Objeto con el ID del estatus a buscar
   * @returns Objeto con los datos del estatus si existe, de lo contrario un objeto con existe: false
   */
  public async catEstatusById(
    request: getCatEstatusByIdReq,
  ): Promise<BaseResponse<getCatEstatusByIdDTO>> {
    const respuesta = await this.catalogoService.getCatEstatusById(request);
    const resultado = new BaseResponse<getCatEstatusByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene la lista de todas las licencias del catálogo.
   * @param request - Objeto con el nombre de la licencia a buscar
   * @returns Array con los datos de todas las licencias disponibles para el nombre
   */
  public async catLicenciasByLicencia(request: getLicenciasByLicenciaReq): Promise<BaseResponse<getLicenciasByLicenciaDTO>> {
    const respuesta = await this.catalogoService.getCatLicenciasByLicencia(request);
    const resultado = new BaseResponse<getLicenciasByLicenciaDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de una licencia específica por su ID.
   * @param request - Objeto con el ID de la licencia a buscar
   * @returns Objeto con los datos de la licencia si existe, de lo contrario un objeto con existe: false
   */
  public async catLicenciaById(
    request: getCatLicenciaByIdReq,
  ): Promise<BaseResponse<getCatLicenciaByIdDTO>> {
    const respuesta = await this.catalogoService.getCatLicenciaById(request);
    const resultado = new BaseResponse<getCatLicenciaByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene la lista de todos los lugares del catálogo.
   * @returns Array con los datos de todos los lugares disponibles
   */
  public async catLugares(): Promise<BaseResponse<Array<CatLugaresDataDTO>>> {
    const respuesta = await this.catalogoService.getCatLugares();
    const resultado = new BaseResponse<Array<CatLugaresDataDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de un lugar específico por su ID.
   * @param request - Objeto con el ID del lugar a buscar
   * @returns Objeto con los datos del lugar si existe, de lo contrario un objeto con existe: false
   */
  public async catLugarById(
    request: getCatLugarByIdReq,
  ): Promise<BaseResponse<getCatLugaresByIdDTO>> {
    const respuesta = await this.catalogoService.getCatLugaresById(request);
    const resultado = new BaseResponse<getCatLugaresByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene la lista de todas las pruebas del catálogo.
   * @returns Array con los datos de todas las pruebas disponibles
   */
  public async catPrueba(): Promise<BaseResponse<Array<CatPruebasDataDTO>>> {
    const respuesta = await this.catalogoService.getCatPruebas();
    const resultado = new BaseResponse<Array<CatPruebasDataDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de una prueba específica por su ID.
   * @param request - Objeto con el ID de la prueba a buscar
   * @returns Objeto con los datos de la prueba si existe, de lo contrario un objeto con existe: false
   */
  public async catPruebaById(
    request: getCatPruebaByIdReq,
  ): Promise<BaseResponse<getCatPruebasByIdDTO>> {
    const respuesta = await this.catalogoService.getCatPruebaById(request);
    const resultado = new BaseResponse<getCatPruebasByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene la lista de todas las vigencias del catálogo.
   * @returns Array con los datos de todas las vigencias disponibles
   */
  public async catVigencia(): Promise<BaseResponse<Array<CatVigenciaDataDTO>>> {
    const respuesta = await this.catalogoService.getCatVigencias();
    const resultado = new BaseResponse<Array<CatVigenciaDataDTO>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  /**   
   * Obtiene los datos de una vigencia específica por su ID.
   * @param request - Objeto con el ID de la vigencia a buscar
   * @returns Objeto con los datos de la vigencia si existe, de lo contrario un objeto con existe: false
   */
  public async catVigenciaById(
    request: getCatVigenciaByIdReq,
  ): Promise<BaseResponse<getCatVigenciaByIdDTO>> {
    const respuesta = await this.catalogoService.getCatVigenciaById(request);
    const resultado = new BaseResponse<getCatVigenciaByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

 
}
