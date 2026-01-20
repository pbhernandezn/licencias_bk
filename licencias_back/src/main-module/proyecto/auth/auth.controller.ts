import { Controller, Post, Body, HttpException, HttpStatus, Headers, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginReq } from '@principal/core-module/proyecto/models/from-tables/auth-dto';
import { CommonService } from '@principal/core-module/proyecto/utils/common';
import { Request } from 'express';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { JwtAuthGuard } from './jwt-auth.guard';
import { json } from 'stream/consumers';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }


  @ApiOperation({ summary: 'Login endpoint', description: 'Iniciar sesión con usuario y contraseña' })
  @ApiBody({ type: LoginReq, description: 'Credenciales de inicio de sesión' })
  @Post('login')
  async login(@Body() request: LoginReq, @Req() req: Request): Promise<BaseResponse<any>> {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'IP no disponible';
    console.log(`IP Address: ${ipAddress}`);

    const login = await this.authService.validateUser(request, ipAddress.toString());

    var res = new BaseResponse<any>();
    res.code = login.status === 'Activo' ? '200' : '330';
    res.message = login.status === 'Activo' ? 'Login correcto' : 'Login incorrecto';
    res.data = login;

    return res;
  }



  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validar Token', description: 'Valida un Bearer Token' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('isValidToken')
  async isValidToken(@Headers() headers: any) {
  const authorizationHeader = headers['authorization'];
    if (!authorizationHeader) {
      throw new HttpException('Authorization header is required', HttpStatus.BAD_REQUEST);
    } else {
      const isValid = await this.authService.validateToken(authorizationHeader);
      return isValid;
    }
  }


  @ApiBearerAuth()
  @ApiOperation({ summary: 'Renueva Token', description: 'Renueva un Bearer Token' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('renewToken')
  async renewToken(@Headers() headers: any): Promise<BaseResponse<any>> {
      const authorizationHeader = headers['authorization'];
      var res = new BaseResponse<any>();

    if (!authorizationHeader) {
      throw new HttpException('Authorization header is required', HttpStatus.BAD_REQUEST);
    } else {
      const renewed = await this.authService.renewToken(authorizationHeader);
      console.log('Renewed token response:', JSON.stringify(renewed));
      res.code = renewed.code;
      res.message = renewed.message;
      res.data = renewed;
      return res;
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout', description: 'Cierra la sesión del usuario' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Headers() headers: any): Promise<BaseResponse<any>> {
    const authorizationHeader = headers['authorization'];
    var res = new BaseResponse<any>();

    if (!authorizationHeader) {
      throw new HttpException('Authorization header is required', HttpStatus.BAD_REQUEST);
    } else {
      const logoutResult = await this.authService.logout(authorizationHeader);
      res.code = logoutResult.code;
      res.message = logoutResult.message;
      res.data = logoutResult.data;
      return res;
    }
  }
}
