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
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdReq } from '../../models/from-tables/catusuario-dto';
import { CatCPDTO } from '../../models/from-tables/catCP-dto';
import { CatDocumentosDTO } from '../../models/from-tables/catDocumentos-dto';
import { CatEstatusDTO } from '../../models/from-tables/catEstatus-dto';
import { CatLicenciasDTO } from '../../models/from-tables/catLicencias-dto';
import { CatLugaresDTO } from '../../models/from-tables/catLugares-dto';
import { CatPruebasDTO } from '../../models/from-tables/catPruebas-dto';
import { CatVigenciaDTO } from '../../models/from-tables/catVigencia-dto';
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

  public async catUsuario(): Promise<Array<CatUsuariosDataDTO>> {
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

  public async getCatUsuarioById(request: getCatUsuarioByIdReq) {
      let catUsuario: getUsuarioByIdDTO;
      {
        try {
          const respuesta = await this.catUsuarioService.getCatUsuariosById(request);
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

  

  public async catCPByCP(cp: string): Promise<Array<CatCPDTO>>{
    let catCP: Array<CatCPDTO>;
    const respuesta = await this.catCPService.getCatCPByCP(cp);
    if (!respuesta.result || respuesta.result.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de usuarios',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catCP = respuesta.result as Array<CatCPDTO>;
    return catCP;
  }
  
  public async catCPById(idRow: number): Promise<CatCPDTO> {
    const respuesta = await this.catCPService.getCatCPById(idRow);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'Sin resultados',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async catDocumentos(): Promise<Array<CatDocumentosDTO>> {
    let catDocumentos: Array<CatDocumentosDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.catDocumentosService.getCatDocumentos(queryParams);
    if (!respuesta.result || respuesta.result.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de documentos',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catDocumentos = respuesta.result as Array<CatDocumentosDTO>;

    return catDocumentos;
  }

  public async catDocumentoById(idRow: number): Promise<CatDocumentosDTO> {

    const respuesta = await this.catDocumentosService.getCatDocumentosById(idRow);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'Sin resultados',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async catEstatusByTabla(tabla: string): Promise<Array<CatEstatusDTO>>{
    let catEstatus: Array<CatEstatusDTO>;
    const respuesta = await this.CatEstatusService.getCatEstatusByTabla(tabla);
    if (!respuesta.result || respuesta.result.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de estatus',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catEstatus = respuesta.result as Array<CatEstatusDTO>;
    return catEstatus;
  }
  
  public async catEstatusById(idRow: number): Promise<CatEstatusDTO> {
    const respuesta = await this.CatEstatusService.getCatEstatusById(idRow);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'Sin resultados',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async catLicenciasByLicencias(localidad: string): Promise<Array<CatLicenciasDTO>>{
    let catLicencias: Array<CatLicenciasDTO>;
    const respuesta = await this.CatLicenciasService.getCatLicenciasByLicencia(localidad);
    if (!respuesta.result || respuesta.result.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de licencias',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catLicencias = respuesta.result as Array<CatLicenciasDTO>;
    return catLicencias;
  }
  
  public async catLicenciaById(idRow: number): Promise<CatLicenciasDTO> {
    const respuesta = await this.CatLicenciasService.getCatLicenciasById(idRow);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'Sin resultados',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async catLugares(): Promise<Array<CatLugaresDTO>> {
    let catLugares: Array<CatLugaresDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatLugaresService.getCatLugares(queryParams);
    if (!respuesta.result || respuesta.result.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de lugares',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catLugares = respuesta.result as Array<CatLugaresDTO>;

    return catLugares;
  }

  public async catLugarById(idRow: number): Promise<CatLugaresDTO> {

    const respuesta = await this.CatLugaresService.getCatLugaresById(idRow);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'Sin resultados',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async catPruebas(): Promise<Array<CatPruebasDTO>> {
    let catPruebas: Array<CatPruebasDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatPruebasService.getCatPruebas(queryParams);

    if (!respuesta.result || respuesta.result.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de pruebas',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catPruebas = respuesta.result as Array<CatPruebasDTO>;

    return catPruebas;
  }

  public async catPruebaById(idRow: number): Promise<CatPruebasDTO> {

    const respuesta = await this.CatPruebasService.getCatPruebasById(idRow);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'Sin resultados',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }

  public async catVigencias(): Promise<Array<CatVigenciaDTO>> {
    let catVigencias: Array<CatVigenciaDTO>;
    const queryParams = new QueryParams();
    const respuesta = await this.CatVigenciaService.getCatVigencia(queryParams);
    if (!respuesta.result || respuesta.result.length === 0) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'No se encontraron datos en el catalogo de vigencias',
        'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
      );
    }
    catVigencias = respuesta.result as Array<CatVigenciaDTO>;

    return catVigencias;
  }

  public async catVigenciaById(idRow: number): Promise<CatVigenciaDTO> {

    const respuesta = await this.CatVigenciaService.getCatVigenciaById(idRow);
    if (!respuesta) {
      throw ManejadorErrores.getBusquedaVacia(
        'Sin resultados',
        'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832a23f6',
      );
    }
    return respuesta;
  }
}