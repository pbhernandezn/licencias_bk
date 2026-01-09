import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { authResponse } from './authResponse';
import { LoginDto } from '@principal/core-module/proyecto/models/from-tables/login.dto';
import { AuthService } from './auth.service';
import {
  getAuthByEmailReq,
  userlockreq,
} from '@principal/core-module/proyecto/models/from-tables/Auth-dto';
import {
  isValidEmail,
  isValidPassword,
} from '@principal/core-module/proyecto/utils/common';
import { AuthRepository } from './auth-repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  INTERNAL_CODES,
  INTERNAL_MESSAGES,
  RESPONSE_CODES,
} from '@principal/commons-module/proyecto/utils/messages-enum';
import { createDetalleSesionReq } from '@principal/core-module/proyecto/models/from-tables/DetalleSesion-dto';

@Injectable()
export class authexpose {
  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(
    loginDto: LoginDto,
    ip: string,
  ): Promise<BaseResponse<authResponse>> {
    const resultado = new BaseResponse<authResponse>();
    const detalleSesionRequest = new createDetalleSesionReq();

    // TODO: reemplazar por lookup real de usuarios

    const request: getAuthByEmailReq = { email: loginDto.username };

    if (!loginDto.username.trim()) {
      throw new BadRequestException('Invalid authentication data');
    }

    console.log('Validating user:', loginDto.username);

    if (!isValidEmail(loginDto.username.trim())) {
      console.log('Invalid email format');
      //throw new BadRequestException('Invalid format');
      console.log('password no valido');
      resultado.code = RESPONSE_CODES.ERROR_CODE;
      resultado.internalCode = INTERNAL_CODES.ERROR_CODE;
      resultado.message = INTERNAL_MESSAGES.LOGIN_INVALID_CREDENTIALS;
      resultado.WasSuccess = false;
      resultado.data = {
        token: null,
        username: loginDto.username,
        roles: [],
      };
      return resultado;
    }

    if (!isValidPassword(loginDto.password)) {
      console.log('Invalid password format');
      //throw new BadRequestException('Invalid format');
      resultado.code = RESPONSE_CODES.ERROR_CODE;
      resultado.internalCode = INTERNAL_CODES.ERROR_CODE;
      resultado.message = INTERNAL_MESSAGES.LOGIN_INVALID_CREDENTIALS;
      resultado.WasSuccess = false;
      resultado.data = {
        token: null,
        username: loginDto.username,
        roles: [],
      };
      return resultado;
    }
    /* 1 . Parámetros */
    const params = await this.authRepository.getParametros();

    const map = Object.fromEntries(params.map((p) => [p.parametro, p.valor]));

    const maxFailed = Number(map['MAX_FAILED_ATTEMPTS']);
    const lockMinutes = Number(map['LOCK_TIME_MINUTES']);
    const status_locked_id = Number(map['USER_STATUS_LOCKED_ID']);

    console.log('maxFailed', maxFailed);
    console.log('lockMinutes', lockMinutes);

    /* 2. Usuario */

    const respuesta = await this.authRepository.getUsuarioByEmail(request);

    if (!respuesta.existe) {
      console.log('algo paso aqui no hay datos db');
      resultado.code = RESPONSE_CODES.ERROR_CODE;
      resultado.internalCode = INTERNAL_CODES.ERROR_CODE;
      resultado.message = INTERNAL_MESSAGES.LOGIN_INVALID_CREDENTIALS;
      resultado.WasSuccess = false;
      resultado.data = {
        token: null,
        username: loginDto.username,
        roles: [],
      };
      return resultado;
    } else {
      /*
        aqui todo va bien!!!
      
      3. Intentos fallidos */

      console.log('Auth repository response:', respuesta);

      const failedAttempts = await this.authRepository.getFAttchronologically(
        respuesta.usuario.user_Id,
        lockMinutes,
      );

      console.log('Failed attempts chronologically --:-- ', failedAttempts);

      if (Number(failedAttempts) >= Number(maxFailed)) {
        /* EN ESTA PARTE SE RTIENE QUE HACER UN INSERT DETALLE_SESION =>  actualizar el usuario bloquearlo*/
        const request: userlockreq = {
          idUsuario: respuesta.usuario.user_Id,
          username: respuesta.usuario.username,
          statuslockedid: status_locked_id,
        };

        const userlock = await this.authRepository.updateUserLock(request);

        if (!userlock.existe) {
          console.log('algo paso aqui se bloquea el usuario');
          resultado.code = RESPONSE_CODES.ERROR_CODE;
          resultado.internalCode = INTERNAL_CODES.ERROR_CODE;
          resultado.message = userlock.autorizado.errores;
          resultado.WasSuccess = false;
          resultado.data = {
            token: null,
            username: loginDto.username,
            roles: [],
          };
          return resultado;
        } else {
          resultado.code = RESPONSE_CODES.ERROR_CODE;
          resultado.internalCode = INTERNAL_CODES.ERROR_CODE;
          resultado.message = userlock.autorizado.errores;
          resultado.WasSuccess = false;
          resultado.data = {
            token: null,
            username: loginDto.username,
            roles: [],
          };
          return resultado;
        }
      }

      /* 4. Validar password */
      const passwordOk = await bcrypt.compare(
        loginDto.password,
        respuesta.usuario.password,
      );

      if (!passwordOk) {
        /* aqui va los intentos fallidos */

        console.log('password no valido');

        detalleSesionRequest.idUsuario = respuesta.usuario.user_Id;
        detalleSesionRequest.fechaInicio = new Date();
        detalleSesionRequest.fechaFin = null;
        detalleSesionRequest.ip = ip;
        detalleSesionRequest.exitoso = false;
        detalleSesionRequest.token = 'N/D';
        detalleSesionRequest.idStatus = respuesta.usuario.statusid;
        detalleSesionRequest.comentarios = 'Falla el password';
        const sesionesactivas =
          await this.authRepository.crearSesionUnica(detalleSesionRequest);

        resultado.code = RESPONSE_CODES.ERROR_CODE;
        resultado.internalCode = INTERNAL_CODES.ERROR_CODE;
        resultado.message = INTERNAL_MESSAGES.LOGIN_INVALID_CREDENTIALS;
        resultado.WasSuccess = false;
        resultado.data = {
          token: null,
          username: respuesta.usuario.username,
          roles: [],
        };
        return resultado;
      }

      const userLogin = {
        id: respuesta.usuario.user_Id,
        username: respuesta.usuario.username,
        role: respuesta.usuario.usuario,
      };

      const token = await this.createAccessToken(userLogin);

      /*
        en esta parte es donde vamos a trabajar con los detalles de las sesiones
      */

      console.log(`Bearer ${token.access_token}`);

      detalleSesionRequest.idUsuario = respuesta.usuario.user_Id;
      detalleSesionRequest.fechaInicio = new Date();
      detalleSesionRequest.fechaFin = null;
      detalleSesionRequest.ip = ip;
      detalleSesionRequest.exitoso = true;
      detalleSesionRequest.token = token.access_token;
      detalleSesionRequest.idStatus = respuesta.usuario.statusid;
      detalleSesionRequest.comentarios = 'Login exitoso';

      /* 5. Cerrar sesiones activas */
      const sesionesactivas =
        await this.authRepository.crearSesionUnica(detalleSesionRequest);

      if (sesionesactivas.creado && sesionesactivas.errores.sesionActiva) {
        console.log('sesiones activas');
        resultado.code = RESPONSE_CODES.SUCCESFULL;
        resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
        resultado.message = INTERNAL_MESSAGES.LOGIN_SUCCESS;
        resultado.WasSuccess = true;
        resultado.data = {
          token: token.access_token,
          username: respuesta.usuario.username,
          roles: [respuesta.usuario.usuario],
        };

        return resultado;
      }

      console.log('sesiones Normal');
      const DSrespuesta =
        await this.authRepository.createDetalleSesion(detalleSesionRequest);

      console.log(DSrespuesta);

      resultado.code = RESPONSE_CODES.SUCCESFULL;
      resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.LOGIN_SUCCESS;
      resultado.WasSuccess = true;
      resultado.data = {
        token: token.access_token,
        username: respuesta.usuario.username,
        roles: [respuesta.usuario.usuario],
      };
      return resultado;
    }
  }

  async createAccessToken(user: any) {
    const payload = { username: user.username, sub: user.id, rol: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
