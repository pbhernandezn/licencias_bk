import { Injectable } from '@nestjs/common';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { CatUsuarioService } from '../from-tables/catusuario-service';
import { CatCPService } from '../from-tables/catcp-service';
import { CatDocumentosService } from '../from-tables/catdocumentos-service';
import { CatEstatusService } from '../from-tables/catestatus-service';
import { CatLicenciasService } from '../from-tables/catlicencias-service';
import { CatLugaresService } from '../from-tables/catlugares-service';
import { CatPruebasService } from '../from-tables/catpruebas-service';
import { CatVigenciaService } from '../from-tables/catvigencia-service';
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdDTO, getCatUsuarioByIdReq } from '../../models/from-tables/catusuario-dto';
import { CatCPDTO, getCatCPByIdDTO, getCatCPByIdReq, getLocalidadByCPReq, getLocalidadesByCPDTO } from '../../models/from-tables/catCP-dto';
import { CatDocumentosDataDTO, CatDocumentosDTO, getCatDocumentoByIdDTO, getCatDocumentoByIdReq } from '../../models/from-tables/catDocumentos-dto';
import { CatEstatusDTO, getCatEstatusByIdDTO, getCatEstatusByIdReq, getCatEstatusByTablaDTO, getCatEstatusByTablaReq } from '../../models/from-tables/catEstatus-dto';
import { CatLicenciasDataDTO, CatLicenciasDTO, getCatLicenciaByIdDTO, getCatLicenciaByIdReq, getLicenciasByLicenciaDTO, getLicenciasByLicenciaReq } from '../../models/from-tables/catLicencias-dto';
import { CatLugaresDataDTO, CatLugaresDTO, getCatLugarByIdReq, getCatLugaresByIdDTO } from '../../models/from-tables/catLugares-dto';
import { CatPruebasDataDTO, CatPruebasDTO, getCatPruebaByIdReq, getCatPruebasByIdDTO } from '../../models/from-tables/catPruebas-dto';
import { CatVigenciaDataDTO, CatVigenciaDTO, getCatVigenciaByIdDTO, getCatVigenciaByIdReq } from '../../models/from-tables/catVigencia-dto';
import { getUsuarioByIdDTO } from '../../models/from-tables/usuarios-dto';




@Injectable()
export class CatalogoService {
  constructor(
    private readonly catUsuarioService: CatUsuarioService,
    private readonly catCPService: CatCPService,
    private readonly catDocumentosService: CatDocumentosService,
    private readonly CatEstatusService: CatEstatusService,
    private readonly CatLicenciasService: CatLicenciasService,
    private readonly CatLugaresService: CatLugaresService,
    private readonly CatPruebasService: CatPruebasService,
    private readonly CatVigenciaService: CatVigenciaService,
  ) {}

  /**
   * Obtiene la lista de todos los usuarios del catálogo.
   * @returns Array con los datos de todos los usuarios disponibles
   */
  public async getCatUsuarios(): Promise<Array<CatUsuariosDataDTO>> {
    let catUsuario: Array<CatUsuariosDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.catUsuarioService.getCatUsuarios(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de usuarios.',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cus1',
      );
    }
    catUsuario = respuesta as Array<CatUsuariosDataDTO>;

    return catUsuario;
  }

  /**
   * Obtiene los datos de un usuario específico por su ID.
   * @param request - Objeto con el ID del usuario a buscar
   * @returns Objeto con los datos del usuario si existe, de lo contrario un objeto con existe: false
   */
  public async getCatUsuarioById(request: getCatUsuarioByIdReq): Promise<getCatUsuarioByIdDTO>{
      let catUsuario: getCatUsuarioByIdDTO;
      {
        try {
          const respuesta = await this.catUsuarioService.getCatUsuariosById(request);
          catUsuario = respuesta;
          if (!respuesta.existe) {
            throw ManejadorErrores.getBusquedaVacia(
              'No se encontro el dato en el catalogo de usuarios.',
            );
          }      
        } catch (error) {
          throw ManejadorErrores.getBusquedaVacia(
            error.message,
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cus2',
          );
        }
      }
      
  
      return catUsuario;
    }

  /**   
   * Obtiene la lista de todas las localidades por código postal.
   * @param request - Objeto con el código postal a buscar
   * @returns Array con los datos de todas las localidades disponibles para el código postal
   */
  public async getLocalidadByCP(request: getLocalidadByCPReq): Promise<getLocalidadesByCPDTO> {
    const respuesta = await this.catCPService.getLocalidadByCP(request);
    if (!respuesta.catCPs || respuesta.catCPs.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de cp. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_ccp1',
      );
    }

    return respuesta;
  }
  
  /**
   * Obtiene los datos de un código postal específico por su ID.
   * @param request - Objeto con el ID del código postal a buscar
   * @returns Objeto con los datos del código postal si existe, de lo contrario un objeto con existe: false
   */
  public async getCatCPById(request: getCatCPByIdReq): Promise<getCatCPByIdDTO> {
    const respuesta = await this.catCPService.getCatCPById(request);
    if (!respuesta.existe) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontro el dato en el catalogo de cp. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_ccp2',
      );
    }
    return respuesta;
  }

  /**   
   * Obtiene la lista de todos los documentos del catálogo.
   * @returns Array con los datos de todos los documentos disponibles
   */
  public async getCatDocumentos(): Promise<Array<CatDocumentosDataDTO>> {
    let catDocumentos: Array<CatDocumentosDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.catDocumentosService.getCatDocumentos(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de documentos. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cdo1',
      );
    }
    catDocumentos = respuesta as Array<CatDocumentosDataDTO>;

    return catDocumentos;
  }

  /**
   * Obtiene los datos de un documento específico por su ID.
   * @param request - Objeto con el ID del documento a buscar
   * @returns Objeto con los datos del documento si existe, de lo contrario un objeto con existe: false
   */
  public async getCatDocumentosById(request: getCatDocumentoByIdReq): Promise<getCatDocumentoByIdDTO>{
      let catDocumentos: getCatDocumentoByIdDTO;
      {
        try {
          const respuesta = await this.catDocumentosService.getCatDocumentosById(request);
          catDocumentos = respuesta;
          if (!respuesta.existe) {
            throw ManejadorErrores.getBusquedaVacia(
              'No se encontro el dato en el catalogo de documentos. ',
            );
          }
        } catch (error) {
          throw ManejadorErrores.getBusquedaVacia(
            error.message,
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cdo2',
          );
        }
      }
  
      return catDocumentos;
    }

  /**   
   * Obtiene la lista de todos los estatus del catálogo.
   * @param request - Objeto con el nombre de la tabla a buscar
   * @returns Array con los datos de todos los estatus disponibles
   */  
  public async getCatEstatusByTabla(request: getCatEstatusByTablaReq): Promise<getCatEstatusByTablaDTO> {
    const respuesta = await this.CatEstatusService.getCatEstatusByTabla(request);
    if (!respuesta.catEstatus || respuesta.catEstatus.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de estatus. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_ces1',
      );
    }

    return respuesta;
  }
  
  /**   
   * Obtiene los datos de un estatus específico por su ID.
   * @param request - Objeto con el ID del estatus a buscar
   * @returns Objeto con los datos del estatus si existe, de lo contrario un objeto con existe: false
   */
  public async getCatEstatusById(request: getCatEstatusByIdReq): Promise<getCatEstatusByIdDTO> {
    const respuesta = await this.CatEstatusService.getCatEstatusById(request);
    if (!respuesta.existe) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontro el dato en el catalogo de estatus. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_ces2',
      );
    }
    return respuesta;
  }

  /**   
   * Obtiene la lista de todas las licencias del catálogo.
   * @param request - Objeto con el código de licencia a buscar
   * @returns Array con los datos de todas las licencias disponibles para el código
   */
  public async getCatLicenciasByLicencia(request: getLicenciasByLicenciaReq): Promise<getLicenciasByLicenciaDTO> {
    const respuesta = await this.CatLicenciasService.getCatLicenciasByLicencia(request);
    if (!respuesta.catLicencias || respuesta.catLicencias.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de licencias. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cli1',
      );
    }

    return respuesta;
  }
  
  /**   
   * Obtiene los datos de una licencia específica por su ID.
   * @param request - Objeto con el ID de la licencia a buscar
   * @returns Objeto con los datos de la licencia si existe, de lo contrario un objeto con existe: false
   */
  public async getCatLicenciaById(request: getCatLicenciaByIdReq): Promise<getCatLicenciaByIdDTO> {
    const respuesta = await this.CatLicenciasService.getCatLicenciaById(request);
    if (!respuesta.existe) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontro el dato en el catalogo de licencias. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cli2',
      );
    }
    return respuesta;
  }

  public async getCatLicencias(): Promise<Array<CatLicenciasDataDTO>> {
    let catLicencias: Array<CatLicenciasDataDTO>;
    
    const respuesta = await this.CatLicenciasService.getCatLicencias();
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de licencias. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cli3',
      );
    }
    catLicencias = respuesta as Array<CatLicenciasDataDTO>;

    return catLicencias;
  }

  /**   
   * Obtiene la lista de todos los lugares del catálogo.
   * @returns Array con los datos de todos los lugares disponibles
   */
  public async getCatLugares(): Promise<Array<CatLugaresDataDTO>> {
    let catLugares: Array<CatLugaresDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatLugaresService.getCatLugares(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de lugares. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_clu1',
      );
    }
    catLugares = respuesta as Array<CatLugaresDataDTO>;

    return catLugares;
  }

  /**   
   * Obtiene los datos de un lugar específico por su ID.
   * @param request - Objeto con el ID del lugar a buscar
   * @returns Objeto con los datos del lugar si existe, de lo contrario un objeto con existe: false
   */
  public async getCatLugaresById(request: getCatLugarByIdReq): Promise<getCatLugaresByIdDTO>{
      let catLugares: getCatLugaresByIdDTO;
      {
        try {
          const respuesta = await this.CatLugaresService.getCatLugaresById(request);
          catLugares = respuesta;
          if (!respuesta.existe) {
            throw ManejadorErrores.getBusquedaVacia(
              'No se encontro el dato en el catalogo de lugares. ',
            );
          }
        } catch (error) {
          throw ManejadorErrores.getBusquedaVacia(
            error.message,
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_clu2',
          );
        }
      }

      return catLugares;
    }

  /**   
   * Obtiene la lista de todas las pruebas del catálogo.
   * @returns Array con los datos de todas las pruebas disponibles
   */  
  public async getCatPruebas(): Promise<Array<CatPruebasDataDTO>> {
    let catPruebas: Array<CatPruebasDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatPruebasService.getCatPruebas(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de pruebas. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cpr1',
      );
    }
    catPruebas = respuesta as Array<CatPruebasDataDTO>;

    return catPruebas;
  }

  /**   
   * Obtiene los datos de una prueba específica por su ID.
   * @param request - Objeto con el ID de la prueba a buscar
   * @returns Objeto con los datos de la prueba si existe, de lo contrario un objeto con existe: false
   */
  public async getCatPruebaById(request: getCatPruebaByIdReq): Promise<getCatPruebasByIdDTO>{
      let catPruebas: getCatPruebasByIdDTO;
      {
        try {
          const respuesta = await this.CatPruebasService.getCatPruebaById(request);
          catPruebas = respuesta;
          if (!respuesta.existe) {
            throw ManejadorErrores.getBusquedaVacia(
              'No se encontro el dato en el catalogo de pruebas. ',
            );
          }
        } catch (error) {
          throw ManejadorErrores.getBusquedaVacia(
            error.message,
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cpr2',
          );
        }
      }
  
      return catPruebas;
    }

  /**   
   * Obtiene la lista de todas las vigencias del catálogo.
   * @returns Array con los datos de todas las vigencias disponibles
   */
  public async getCatVigencias(): Promise<Array<CatVigenciaDataDTO>> {
    let catVigencias: Array<CatVigenciaDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatVigenciaService.getCatVigencias(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron datos en el catalogo de vigencias. ',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cvi1',
      );
    }
    catVigencias = respuesta as Array<CatVigenciaDataDTO>;

    return catVigencias;
  }

  /**   
   * Obtiene los datos de una vigencia específica por su ID.
   * @param request - Objeto con el ID de la vigencia a buscar
   * @returns Objeto con los datos de la vigencia si existe, de lo contrario un objeto con existe: false
   */
  public async getCatVigenciaById(request: getCatVigenciaByIdReq): Promise<getCatVigenciaByIdDTO>{
      let catVigencias: getCatVigenciaByIdDTO;
      {
        try {
          const respuesta = await this.CatVigenciaService.getCatVigenciaById(request);
          catVigencias = respuesta;
          if (!respuesta.existe) {
            throw ManejadorErrores.getBusquedaVacia(
              'No se encontro el dato en el catalogo de vigencias. ',
            );
          }
        } catch (error) {
          throw ManejadorErrores.getBusquedaVacia(
            error.message,
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_cvi2',
          );
        }
      }
  
      return catVigencias;
    }

}