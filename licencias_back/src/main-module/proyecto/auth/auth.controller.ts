import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '@principal/core-module/proyecto/models/from-tables/login.dto';
import { authexpose } from './auth-expose';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly authexpose: authexpose,
  ) {}
  @Post('login')
  @ApiOperation({ summary: 'Autenticación de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto, @Req() req: Request) {
    const network = req.ip;

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.connection?.remoteAddress;

    console.log('es una ip??', ip);

    console.log('es una netWork??', network);

    const respuesta = await this.authexpose.validateCredentials(body, ip);

    return respuesta;
  }
}
