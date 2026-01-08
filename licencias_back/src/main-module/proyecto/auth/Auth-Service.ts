import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth-repository';
import {
  getAuthByEmailDTO,
  getAuthByEmailReq,
} from '@principal/core-module/proyecto/models/from-tables/Auth-dto';

@Injectable()
export class AuthTService {
  constructor(
    // Inyectar dependencias necesarias aquí
    private readonly authRepository: AuthRepository,
  ) {}

  public async getAuthInfoByEmail(
    request: getAuthByEmailReq,
  ): Promise<getAuthByEmailDTO> {
    return await this.authRepository.getUsuarioByEmail(request);
  }
}
