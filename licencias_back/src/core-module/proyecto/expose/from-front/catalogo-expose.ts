import { Injectable } from '@nestjs/common';
import{BaseResponse,} from'@principal/commons-module/proyecto/models/base-response';
import {
  RESPONSE_CODES,
  INTERNAL_CODES,
  INTERNAL_MESSAGES,
} from '@principal/commons-module/proyecto/utils/messages-enum';
import { CatalogoService } from '../../services/from-front/catalogo-services';

@Injectable()
export class CatalogoExpose {
  constructor(private readonly catalogoService: CatalogoService) {}

  async catUsuarios(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoService.catUsuario();
    const resultado = new BaseResponse<Array<string>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

 /* async catLicencias(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoService.catLicencias();
    const resultado = new BaseResponse<Array<string>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catVigencia(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoService.catVigencia();
    const resultado = new BaseResponse<Array<string>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catEstatus(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoService.catEstatus();
    const resultado = new BaseResponse<Array<string>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catPrueba(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoService.catPrueba();
    const resultado = new BaseResponse<Array<string>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async catLugares(): Promise<BaseResponse<Array<string>>> {
    const respuesta = await this.catalogoService.catLugares();
    const resultado = new BaseResponse<Array<string>>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }*/
}
