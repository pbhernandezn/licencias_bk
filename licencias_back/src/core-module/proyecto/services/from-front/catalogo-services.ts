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
import { CatLicenciasDTO, getCatLicenciaByIdDTO, getCatLicenciaByIdReq, getLicenciasByLicenciaDTO, getLicenciasByLicenciaReq } from '../../models/from-tables/catLicencias-dto';
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

  public async getCatUsuarios(): Promise<Array<CatUsuariosDataDTO>> {
    let catUsuario: Array<CatUsuariosDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.catUsuarioService.getCatUsuarios(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de usuarios',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catUsuario = respuesta as Array<CatUsuariosDataDTO>;

    return catUsuario;
  }

  public async getCatUsuarioById(request: getCatUsuarioByIdReq): Promise<getCatUsuarioByIdDTO>{
      let catUsuario: getCatUsuarioByIdDTO;
      {
        try {
          const respuesta = await this.catUsuarioService.getCatUsuariosById(request);
          catUsuario = respuesta;
        } catch (error) {
          throw ManejadorErrores.getDatosVitalesNoCargados(
            'No se encontro el dato en el catalogo de usuarios',
            'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
          );
        }
      }
  
      return catUsuario;
    }

  
  public async getLocalidadByCP(request: getLocalidadByCPReq): Promise<getLocalidadesByCPDTO> {
    const respuesta = await this.catCPService.getLocalidadByCP(request);
    if (!respuesta.catCPs || respuesta.catCPs.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de cp',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }

    return respuesta;
  }
  
  public async getCatCPById(request: getCatCPByIdReq): Promise<getCatCPByIdDTO> {
    const respuesta = await this.catCPService.getCatCPById(request);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontro el dato en el catalogo de cp',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async getCatDocumentos(): Promise<Array<CatDocumentosDataDTO>> {
    let catDocumentos: Array<CatDocumentosDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.catDocumentosService.getCatDocumentos(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de documentos',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catDocumentos = respuesta as Array<CatDocumentosDataDTO>;

    return catDocumentos;
  }

  public async getCatDocumentosById(request: getCatDocumentoByIdReq): Promise<getCatDocumentoByIdDTO>{
      let catDocumentos: getCatDocumentoByIdDTO;
      {
        try {
          const respuesta = await this.catDocumentosService.getCatDocumentosById(request);
          catDocumentos = respuesta;
        } catch (error) {
          throw ManejadorErrores.getDatosVitalesNoCargados(
            'No se encontro el dato en el catalogo de documentos',
            'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
          );
        }
      }
  
      return catDocumentos;
    }

  public async getCatEstatusByTabla(request: getCatEstatusByTablaReq): Promise<getCatEstatusByTablaDTO> {
    const respuesta = await this.CatEstatusService.getCatEstatusByTabla(request);
    if (!respuesta.catEstatus || respuesta.catEstatus.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de estatus',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }

    return respuesta;
  }
  
  public async getCatEstatusById(request: getCatEstatusByIdReq): Promise<getCatEstatusByIdDTO> {
    const respuesta = await this.CatEstatusService.getCatEstatusById(request);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontro el dato en el catalogo de estatus',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async getCatLicenciasByLicencia(request: getLicenciasByLicenciaReq): Promise<getLicenciasByLicenciaDTO> {
    const respuesta = await this.CatLicenciasService.getCatLicenciasByLicencia(request);
    if (!respuesta.catLicencias || respuesta.catLicencias.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de licencias',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }

    return respuesta;
  }
  
  public async getCatLicenciaById(request: getCatLicenciaByIdReq): Promise<getCatLicenciaByIdDTO> {
    const respuesta = await this.CatLicenciasService.getCatLicenciaById(request);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontro el dato en el catalogo de licencias',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async getCatLugares(): Promise<Array<CatLugaresDataDTO>> {
    let catLugares: Array<CatLugaresDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatLugaresService.getCatLugares(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de lugares',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catLugares = respuesta as Array<CatLugaresDataDTO>;

    return catLugares;
  }

  public async getCatLugaresById(request: getCatLugarByIdReq): Promise<getCatLugaresByIdDTO>{
      let catLugares: getCatLugaresByIdDTO;
      {
        try {
          const respuesta = await this.CatLugaresService.getCatLugaresById(request);
          catLugares = respuesta;
        } catch (error) {
          throw ManejadorErrores.getDatosVitalesNoCargados(
            'No se encontro el dato en el catalogo de lugares',
            'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
          );
        }
      }

      return catLugares;
    }

  public async getCatPruebas(): Promise<Array<CatPruebasDataDTO>> {
    let catPruebas: Array<CatPruebasDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatPruebasService.getCatPruebas(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de pruebas',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catPruebas = respuesta as Array<CatPruebasDataDTO>;

    return catPruebas;
  }

  public async getCatPruebaById(request: getCatPruebaByIdReq): Promise<getCatPruebasByIdDTO>{
      let catPruebas: getCatPruebasByIdDTO;
      {
        try {
          const respuesta = await this.CatPruebasService.getCatPruebaById(request);
          catPruebas = respuesta;
        } catch (error) {
          throw ManejadorErrores.getDatosVitalesNoCargados(
            'No se encontro el dato en el catalogo de pruebas',
            'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
          );
        }
      }
  
      return catPruebas;
    }

  public async getCatVigencias(): Promise<Array<CatVigenciaDataDTO>> {
    let catVigencias: Array<CatVigenciaDataDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatVigenciaService.getCatVigencias(queryParams);
    if (!respuesta || respuesta.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de vigencias',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catVigencias = respuesta as Array<CatVigenciaDataDTO>;

    return catVigencias;
  }

  public async getCatVigenciaById(request: getCatVigenciaByIdReq): Promise<getCatVigenciaByIdDTO>{
      let catVigencias: getCatVigenciaByIdDTO;
      {
        try {
          const respuesta = await this.CatVigenciaService.getCatVigenciaById(request);
          catVigencias = respuesta;
        } catch (error) {
          throw ManejadorErrores.getDatosVitalesNoCargados(
            'No se encontro el dato en el catalogo de vigencias',
            'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
          );
        }
      }
  
      return catVigencias;
    }

}