import { Controller, Post, Body, HttpException, HttpStatus, Headers, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginReq } from '@principal/core-module/proyecto/models/from-tables/auth-dto';
import { CommonService } from '@principal/core-module/proyecto/utils/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}


  @ApiOperation({ summary: 'Login endpoint', description: 'Iniciar sesión con usuario y contraseña' })
  @ApiBody({ type: LoginReq, description: 'Credenciales de inicio de sesión' })
  @Post('login')
  async login(@Body() request: LoginReq) {
    const login = await this.authService.validateUser(request);
    return login;
  }


  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validar Token', description: 'Valida un Bearer Token' })
  @Get('isValidToken')
  async isValidToken(@Headers('authorization') authorizationHeader: string) {
    if (!authorizationHeader) {
      throw new HttpException('Authorization header is required', HttpStatus.BAD_REQUEST);
    }else{
      const isValid = await this.authService.validateToken(authorizationHeader);
      return isValid;
    }
  }

  @ApiOperation({ summary: 'Obtener parámetro', description: 'Obtiene el valor de un parámetro dado' })
  @Get('parametro/:parametro')
  async obtenerParametro(@Param('parametro') parametro: string) {
    try {
      const valor = await this.commonService.getParametro(parametro);
      return { parametro, valor };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
