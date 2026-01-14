import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatUsuarioEntity } from '../models/entities/catUsuario-entity';
import { CatUsuarioDTO } from '../models/from-tables/catUsuario-dto';
import { CatUsuarioMapping } from '../utils/from-tables/catUsuario-mapping';
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq, updateUsuarioDTO, updateUsuarioReq } from '../models/from-tables/usuarios-dto';
import { UsuariosEntity } from '../models/entities/usuarios-entity';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';
import e from 'express';
import { CatCPRepository } from './catCP-repository';
import { CatCPEntity } from '../models/entities/catCP-entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginReq } from '../models/from-tables/auth-dto';
import { passwordEncrypt } from '../utils/common';
import { DetalleSesionEntity } from '../models/entities/detalleSesion-entity';


@Injectable()
export class SesionesRepository {
    constructor(
        @InjectRepository(DetalleSesionEntity)
        private readonly detalleSesionRepository: Repository<DetalleSesionEntity>,
    ) { }

    public async isTokenInBD(
        token: string
    ): Promise<boolean> {
        try {

            const session = await this.detalleSesionRepository.createQueryBuilder('detalle_sesion')
                .leftJoin('cat_estatus', 'estatus', 'detalle_sesion.id_estatus = estatus.id')
                .where('detalle_sesion.token = :token', { token })
                .andWhere('estatus.estatus = :estatus', { estatus: 'Abierta' })
                .getOne();
            return session ? true : false;

        } catch (error) {
            return false;
        }
    }

    public async updateSesionToken(oldToken: string, newToken: string): Promise<void> {
        try {
            const comment = `Token renovado en ${new Date().toISOString()} | `;
            await this.detalleSesionRepository.createQueryBuilder()
                .update(DetalleSesionEntity)
                .set({
                    token: newToken,
                    comentarios: comment
                })
                .where("token = :oldToken", { oldToken })
                .execute();
                console.log('Session token updated successfully');
        } catch (error) {
            console.error('Error updating session token:', error);
            throw error;
        }
    }

}
