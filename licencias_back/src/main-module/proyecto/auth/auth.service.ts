import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginReq } from '@principal/core-module/proyecto/models/from-tables/auth-dto';
import { isValidEmail, passwordEncrypt } from '@principal/core-module/proyecto/utils/common';
import { UsuariosRepository } from '@principal/core-module/proyecto/repository/usuarios-repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuariosRepository: UsuariosRepository,
  ) {}

  async validateUser(request: LoginReq, ipAddress: string): Promise<any> {
    if (isValidEmail(request.username.trim())) {
      const user = await this.usuariosRepository.validateUserCredentials(request, ipAddress);
      return user;
    }
    return null;
  }

  async validateToken(authorizationHeader: string): Promise<boolean> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('El encabezado de autorización debe contener un token Bearer');
    }

    const token = authorizationHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);

      

      return !!payload;
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }

}
