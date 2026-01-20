import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginReq } from '@principal/core-module/proyecto/models/from-tables/auth-dto';
import { isValidEmail, passwordEncrypt } from '@principal/core-module/proyecto/utils/common';
import { UsuariosRepository } from '@principal/core-module/proyecto/repository/usuarios-repository';
import { SesionesRepository } from '@principal/core-module/proyecto/repository/sesiones-repository';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuariosRepository: UsuariosRepository,
    private sesionesRepository: SesionesRepository,
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


      const tData = this.jwtService.decode(token);
      console.log("Payload del token: " + JSON.stringify(tData));



      return !!payload;
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }

  
  async renewToken(authorizationHeader: string): Promise<BaseResponse<string>> {

    var res = new BaseResponse<string>();
    const token = authorizationHeader.split(' ')[1];
    const isInBD = await this.sesionesRepository.isTokenInBD(token);

    if (!isInBD) {
      res.code = '305';
      res.message = 'Token no activo';
      res.data = null;
      return res;
    }else{
      const decoded: any = this.jwtService.decode(token);
      var loginReq: LoginReq = new LoginReq();
      loginReq.username = decoded.username;
      const payload = await this.usuariosRepository.buildUserPayload(loginReq, true);

      if (payload.error) {
        res.code = '301';
        res.message = 'Error al renovar el token: ' + payload.error;
        res.data = null;
        return res;
      }

      console.log('Payload para nuevo token:', JSON.stringify(payload.payload));
      const newToken = this.jwtService.sign(payload.payload);
      
      await this.sesionesRepository.updateSesionToken(token, newToken);


      res.code = '200';
      res.message = 'Token renovado';
      res.data = newToken;
    }

    return res;

  }

  async logout(authorizationHeader: string): Promise<BaseResponse<string>> {
    var res = new BaseResponse<string>();
    const token = authorizationHeader.split(' ')[1];
    
    try {
      // Verificar que el token sea válido
      const payload = this.jwtService.verify(token);
      
      if (!payload) {
        res.code = '401';
        res.message = 'Token inválido';
        res.data = null;
        return res;
      }

      // Verificar que el token esté en la BD
      const isInBD = await this.sesionesRepository.isTokenInBD(token);

      if (!isInBD) {
        res.code = '305';
        res.message = 'Sesión no encontrada o ya cerrada';
        res.data = null;
        return res;
      }

      // Cerrar la sesión actualizando el estatus y el detalle
      await this.sesionesRepository.closeSesion(token);

      res.code = '200';
      res.message = 'Sesión cerrada exitosamente';
      res.data = 'Logout exitoso';
      return res;

    } catch (error) {
      console.error('Error en logout:', error);
      res.code = '500';
      res.message = 'Error al cerrar sesión';
      res.data = null;
      return res;
    }
  }

}
