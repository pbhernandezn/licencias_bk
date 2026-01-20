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

  private extractIPv4(ip: string | string[]): string {
    // Si es un array (x-forwarded-for puede tener múltiples IPs), tomar la primera
    let ipAddress = Array.isArray(ip) ? ip[0] : ip;

    if (!ipAddress) {
      return 'IP no disponible';
    }

    // Eliminar espacios
    ipAddress = ipAddress.trim();

    // Si hay múltiples IPs separadas por coma (formato x-forwarded-for), tomar la primera
    if (ipAddress.includes(',')) {
      ipAddress = ipAddress.split(',')[0].trim();
    }

    // Extraer IPv4 si está en formato IPv6-mapped (::ffff:192.168.1.1)
    if (ipAddress.includes('::ffff:')) {
      ipAddress = ipAddress.split('::ffff:')[1];
    }

    // Convertir ::1 (localhost IPv6) a 127.0.0.1 (localhost IPv4)
    if (ipAddress === '::1') {
      ipAddress = '127.0.0.1';
    }

    // Validar que sea una IPv4 válida
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Regex.test(ipAddress)) {
      return ipAddress;
    }

    // Si no es IPv4 válida, retornar la IP original o un mensaje
    return ipAddress || 'IP no disponible';
  }

  @ApiOperation({ summary: 'Login endpoint', description: 'Iniciar sesión con usuario y contraseña' })
  @ApiBody({ type: LoginReq, description: 'Credenciales de inicio de sesión' })
  @Post('login')
  async login(@Body() request: LoginReq, @Req() req: Request): Promise<BaseResponse<any>> {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipAddress = this.extractIPv4(rawIp as string);
    console.log(`IP Address (IPv4): ${ipAddress}`);

    const login = await this.authService.validateUser(request, ipAddress);

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
