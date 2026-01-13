import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { UsuariosExpose } from '@principal/core-module/proyecto/expose/from-front/usuarios-expose';
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq, updateUsuarioDTO, updateUsuarioReq } from '@principal/core-module/proyecto/models/from-tables/usuarios-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Usuarios')
@Controller('/api/usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosExpose: UsuariosExpose,
  ) {}

  @Post('/getUsuarioById')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: getUsuarioByIdReq })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: BaseResponse<getUsuarioByIdDTO> })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getUsuarioById(@Body() request: getUsuarioByIdReq, @Request() req): Promise<BaseResponse<getUsuarioByIdDTO>> {
    const respuesta = await this.usuariosExpose.getUsuarioById(request);
    return respuesta;
  }

  @Post('/createUsuario')
  @ApiBody({ type: createUsuarioReq })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: BaseResponse<createUsuarioDTO> })
  async createUsuario(@Body() request: createUsuarioReq): Promise<BaseResponse<createUsuarioDTO>> {
    const respuesta = await this.usuariosExpose.createUsuario(request);
    return respuesta;
  }

  @Post('/updateUsuario')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: updateUsuarioReq })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: BaseResponse<updateUsuarioDTO> })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async updateUsuario(@Body() request: updateUsuarioReq, @Request() req): Promise<BaseResponse<updateUsuarioDTO>> {
    console.log("Request recibido en controller: " + JSON.stringify(request));
    const respuesta = await this.usuariosExpose.updateUsuario(request);
    return respuesta;
  }

}
