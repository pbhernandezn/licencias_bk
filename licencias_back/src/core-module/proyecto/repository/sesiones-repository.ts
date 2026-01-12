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


@Injectable()
export class UsuariosRepository {
    constructor(
        @InjectRepository(UsuariosEntity)
        private readonly usuariosRepository: Repository<UsuariosEntity>,
        @InjectRepository(CatEstatusEntity)
        private readonly catEstatusRepository: Repository<CatEstatusEntity>,
        @InjectRepository(CatCPEntity)
        private readonly catCPRepository: Repository<CatCPEntity>,
        @InjectRepository(CatUsuarioEntity)
        private readonly catUsuarioRepository: Repository<CatUsuarioEntity>,
        private readonly jwtService: JwtService,
    ) { }

    public async createUsuario(
        request: createUsuarioReq
    ): Promise<createUsuarioDTO> {
        try {

            const tipoUsuarioExists = await this.catUsuarioRepository
                .createQueryBuilder('cat_tipoUsuario')
                .select('1')
                .where('cat_tipoUsuario.id = :tipoUsuario', { tipoUsuario: request.tipoUsuario })
                .getRawOne();

            const emailOrCurpExists = await this.usuariosRepository
                .createQueryBuilder('usuarios')
                .select('1')
                .where('usuarios.email = :email', { email: request.email })
                .orWhere('usuarios.curp = :curp', { curp: request.curp })
                .getRawOne();

            var res: createUsuarioDTO = {
                creado: true,
                errores: {
                    nombres: null,
                    apellidopaterno: null,
                    apellidomaterno: null,
                    curp: null,
                    email: null,
                    password: null,
                    fechanacimiento: null,
                    necesarios: null
                },
            };

            if (!tipoUsuarioExists) {
                res.creado = false;
                res.errores.necesarios = 'El tipo de usuario no es válido.';
            } else if (emailOrCurpExists) {
                res.creado = false;
                res.errores.necesarios = 'El usuario ya ha sido dado de alta.';
            } else {

                const newUsuario = this.usuariosRepository.create({
                    idtipousuario: request.tipoUsuario,
                    nombres: request.nombres,
                    apellidopaterno: request.apellidopaterno,
                    apellidomaterno: request.apellidomaterno,
                    curp: request.curp,
                    email: request.email,
                    password: passwordEncrypt(request.password),
                    username: request.email,
                    logintype: 'all',
                    idestatus: 1,
                    // Not implemented
                    //fecha: request.fechanacimiento,
                });

                var nvoUsr = await this.usuariosRepository.save(newUsuario);
                res.creado = nvoUsr ? true : false;
            }

            return res;
        } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55cafc',
            );
        }
    }

}
