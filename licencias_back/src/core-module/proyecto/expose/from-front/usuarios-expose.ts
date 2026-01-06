import { Injectable } from '@nestjs/common';
import{BaseResponse,} from'@principal/commons-module/proyecto/models/base-response';
import {
  RESPONSE_CODES,
  INTERNAL_CODES,
  INTERNAL_MESSAGES,
} from '@principal/commons-module/proyecto/utils/messages-enum';
import { UsuariosService } from '../../services/from-front/usuarios-service';
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq } from '../../models/from-tables/usuarios-dto';

@Injectable()
export class UsuariosExpose {
  constructor(private readonly usuariosService: UsuariosService) {}

  async getUsuarioById(request: getUsuarioByIdReq): Promise<BaseResponse<getUsuarioByIdDTO>> {
    const respuesta = await this.usuariosService.getUsuarioById(request);
    const resultado = new BaseResponse<getUsuarioByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async createUsuario(request: createUsuarioReq): Promise<BaseResponse<createUsuarioDTO>> {
    const respuesta = await this.usuariosService.createUsuario(request);
    const resultado = new BaseResponse<createUsuarioDTO>();
    resultado.code = respuesta.creado ? RESPONSE_CODES.SUCCESFULL : RESPONSE_CODES.ERROR_CUSTOM;
    resultado.internalCode = respuesta.creado ? INTERNAL_CODES.SUCCESFULL : INTERNAL_CODES.ERROR_CODE;
    resultado.message = respuesta.creado ? INTERNAL_MESSAGES.SUCCESFULL : INTERNAL_MESSAGES.NOT_VALID_ERROR_CODE;
    resultado.data = respuesta;
    return resultado;
  }
}
