import { Injectable } from '@nestjs/common';
import{BaseResponse,} from'@principal/commons-module/proyecto/models/base-response';
import {
  RESPONSE_CODES,
  INTERNAL_CODES,
  INTERNAL_MESSAGES,
} from '@principal/commons-module/proyecto/utils/messages-enum';
import { UsuariosService } from '../../services/from-front/usuarios-service';
import { getUsuarioByIdDTO, getUsuarioByIdReq } from '../../models/from-tables/usuarios-dto';

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
}
