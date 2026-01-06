import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { UsuariosExpose } from '@principal/core-module/proyecto/expose/from-front/usuarios-expose';
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq } from '@principal/core-module/proyecto/models/from-tables/usuarios-dto';

@ApiTags('Usuarios')
@Controller('/api/usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosExpose: UsuariosExpose,
  ) {}

  @Post('/getUsuarioById')
  @ApiBody({ type: getUsuarioByIdReq })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: BaseResponse })
  async getUsuarioById(@Body() request: getUsuarioByIdReq): Promise<BaseResponse<getUsuarioByIdDTO>> {
    const respuesta = await this.usuariosExpose.getUsuarioById(request);
    return respuesta;
  }

  @Post('/createUsuario')
  @ApiBody({ type: createUsuarioReq })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: BaseResponse })
  async createUsuario(@Body() request: createUsuarioReq): Promise<BaseResponse<createUsuarioDTO>> {
    const respuesta = await this.usuariosExpose.createUsuario(request);
    return respuesta;
  }

}
