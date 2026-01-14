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
import { CommonService, passwordEncrypt } from '../utils/common';
import { DetalleSesionEntity } from '../models/entities/detalleSesion-entity';
import { last } from 'rxjs';
import { parse } from 'path';
import { use } from 'passport';


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
        private commonService: CommonService,
        @InjectRepository(DetalleSesionEntity)
        private readonly detalleSesionRepository: Repository<DetalleSesionEntity>,
    ) { }

    public async getUsuarioById(
        request: getUsuarioByIdReq
    ): Promise<getUsuarioByIdDTO> {
        try {
            const result = await this.usuariosRepository
                .createQueryBuilder('usuarios')
                .leftJoin(
                    'cat_estatus',
                    'estatus',
                    'estatus.tabla = :tabla AND usuarios.idestatus = estatus.id',
                    { tabla: 'usuarios' },
                )
                .select([
                    'usuarios.nombres',
                    'usuarios.apellidopaterno',
                    'usuarios.apellidomaterno',
                    'usuarios.rfc',
                    'usuarios.curp',
                    'usuarios.email',
                    'usuarios.sexo',
                    'usuarios.conodico_telefono',
                    'estatus.estatus AS estatus_estatus',
                ])
                .where('usuarios.id = :id', { id: request.id })
                .getRawOne();

            const usuarioDTO: getUsuarioByIdDTO = {
                existe: !!result,
                usuario: result
                    ? {
                        nombres: result['usuarios_nombres'],
                        apellidopaterno: result['usuarios_apellidopaterno'],
                        apellidomaterno: result['usuarios_apellidomaterno'],
                        rfc: result['usuarios_rfc'],
                        curp: result['usuarios_curp'],
                        email: result['usuarios_email'],
                        sexo: result['usuarios_sexo'],
                        telefono: result['usuarios_conodico_telefono'],
                        estatus: result['estatus_estatus'],
                    }
                    : undefined,
            };

            //return new Wrapper(queryParams, 1, [usuarioDTO], true, 'Usuario encontrado', null);
            return usuarioDTO;
        } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55cafc',
            );
        }
    }

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


    public async updateUsuario(
        request: updateUsuarioReq
    ): Promise<updateUsuarioDTO> {
        try {
            const usuarioExists = await this.usuariosRepository
                .createQueryBuilder('usuarios')
                .select('1')
                .where('usuarios.id = :idUsuario', { idUsuario: request.idUsuario })
                .getRawOne();

            const res: updateUsuarioDTO = {
                actualizado: true,
                errores: {},
            };

            // const cpid = await this.validateCpExists(request.cp)
            // const cpcoid = await this.validateCpExists(request.conocidoCp)


            // if (request.cp && cpid === 0) {
            //     res.errores.cp = 'El código postal no existe.';
            //     res.actualizado = false;
            // } else if (request.conocidoCp && cpcoid === 0) {
            //     res.errores.cp = 'El código postal del conocido no existe.';
            //     res.actualizado = false;
            // } else 
            if (!usuarioExists) {
                res.actualizado = false;
                res.errores.necesarios = 'El usuario no existe.';
            } else {
                const updateData: Partial<UsuariosEntity> = {};
                if (request.nombres !== undefined) updateData.nombres = request.nombres;
                if (request.apellidopaterno !== undefined) updateData.apellidopaterno = request.apellidopaterno;
                if (request.apellidomaterno !== undefined) updateData.apellidomaterno = request.apellidomaterno;
                if (request.curp !== undefined) updateData.curp = request.curp;
                if (request.password !== undefined) updateData.password = passwordEncrypt(request.password);
                if (request.rfc !== undefined) updateData.rfc = request.rfc;
                if (request.domicilio !== undefined) updateData.domicilio = request.domicilio;
                if (request.colonia !== undefined) updateData.colonia = request.colonia;
                if (request.cp !== undefined) updateData.cp = request.cp;
                if (request.municipio !== undefined) updateData.municipio = request.municipio;
                if (request.localidad !== undefined) updateData.localidad = request.localidad;
                if (request.entidad !== undefined) updateData.entidad = request.entidad;
                if (request.nacionalidad !== undefined) updateData.nacionalidad = request.nacionalidad;
                if (request.sexo !== undefined) updateData.sexo = request.sexo;
                if (request.tipoSangre !== undefined) updateData.tiposangre = request.tipoSangre;
                if (request.donador !== undefined) updateData.donador = request.donador;
                if (request.lugarTrabajo !== undefined) updateData.lugartrabajo = request.lugarTrabajo;
                if (request.restricciones !== undefined) updateData.restricciones = request.restricciones;
                if (request.observaciones !== undefined) updateData.observacionmedica = request.observaciones;
                if (request.conocidoNombre !== undefined) updateData.conocido_nombres = request.conocidoNombre;
                if (request.conocidoApellidoPaterno !== undefined) updateData.conocido_apellidopaterno = request.conocidoApellidoPaterno;
                if (request.conocidoApellidoMaterno !== undefined) updateData.conocido_apellidomaterno = request.conocidoApellidoMaterno;
                if (request.conocidoDomicilio !== undefined) updateData.conocido_domicilio = request.conocidoDomicilio;
                if (request.conocidoCp !== undefined) updateData.conodico_cp = request.conocidoCp;
                if (request.conocidoColonia !== undefined) updateData.conodico_colonia = request.conocidoColonia;
                if (request.conocidoMunicipio !== undefined) updateData.conodico_municipio = request.conocidoMunicipio;
                if (request.conocidoLocalidad !== undefined) updateData.conodico_localidad = request.conocidoLocalidad;
                if (request.conocidoTelefono !== undefined) updateData.conodico_telefono = request.conocidoTelefono;
                if (request.idEstatus !== undefined) updateData.idestatus = request.idEstatus;
                if (request.tipoUsuario !== undefined) updateData.idtipousuario = request.tipoUsuario;

                await this.usuariosRepository.update(
                    { id: request.idUsuario },
                    updateData,
                );

                res.actualizado = true;
            }

            return res;
        } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55cafc',
            );
        }
    }

    private async validateCpExists(cp: string): Promise<number> {
        const cpRecord = await this.catCPRepository
            .createQueryBuilder('cat_cp')
            .select('cat_cp.id')
            .where('cat_cp.cp = :cp', { cp })
            .getRawOne();

        return cpRecord ? cpRecord.cat_cp_id : 0;
    }

    public async validateUserCredentials(request: LoginReq, ipAddress: string): Promise<{ status: string; token?: string }> {
        try {
            const user = await this.usuariosRepository
                .createQueryBuilder('usuarios')
                .leftJoin('cat_estatus', 'estatus', 'usuarios.idestatus = estatus.id')
                .leftJoin('cat_usuarios', 'tipoUsuario', 'usuarios.idtipousuario = tipoUsuario.id')
                .select('usuarios.*')
                .addSelect('estatus.estatus', 'estatus')
                .addSelect('tipoUsuario.usuario', 'rol')
                .where('usuarios.username = :username', { username: request.username })
                .getRawOne();

            var perfil = 'Incompleto';

            if (!user) {
                return { status: 'Usuario no encontrado' };
            } else {
                if (
                    user.nombres &&
                    user.apellidopaterno &&
                    user.email &&
                    user.curp &&
                    user.rfc &&
                    user.domicilio &&
                    user.colonia &&
                    user.cp &&
                    user.municipio &&
                    user.localidad &&
                    user.entidad &&
                    user.nacionalidad &&
                    user.sexo &&
                    user.tiposangre &&
                    user.lugartrabajo &&
                    user.conodico_telefono &&
                    user.conocido_nombres &&
                    user.conocido_apellidopaterno &&
                    user.conodico_cp &&
                    user.conodico_telefono &&
                    user.conodico_municipio &&
                    user.conodico_localidad &&
                    user.conodico_domicilio
                ) {
                    perfil = 'Completo';
                }
            }

            if (user.estatus !== 'Activo') {
                return { status: user.estatus };
            }

            const buffer = Buffer.from(request.password, 'utf-8');
            const b64 = buffer.toString('base64');
            if (bcrypt.compareSync(b64, user.password) === false) {
                return { status: 'Contraseña incorrecta' };
            }

            const recientes = await this.getSesionesRecientes(user.id);

            const exitosos = recientes.filter(s => s.exitoso === true);
            const lastSuccess = exitosos.length > 0 ? exitosos[0] : null;
            var fallidos = recientes.filter(s => s.exitoso === false);

            if (lastSuccess) {
                fallidos = fallidos.filter(s => s.fecha_inicio > lastSuccess.fecha_inicio);
            }
            const maxFails = parseInt(await this.commonService.getParametro("MAX_LOGIN_RETRIES"));

            if (fallidos.length >= maxFails) {
                return { status: 'Bloqueado por reintentos.' };
            }

            const payload = {
                username: user.username,
                rol: user.rol,
                aData: user.id,
                perfil: perfil
            };

            const sessionTime = parseInt(await this.commonService.getParametro("SESSION_TIME"));
            const token = this.jwtService.sign(payload, { expiresIn: sessionTime });

            if (lastSuccess && lastSuccess.estatus === 'Abierta') {
                var thisLastSession = await this.detalleSesionRepository.findOne({ where: { id: lastSuccess.detalle_sesion_id } });
                thisLastSession.comentarios = 'Sesión cerrada por nuevo inicio de sesión - ' + token;
                thisLastSession.fechaFin = new Date();
                thisLastSession.idEstatus = (await this.catEstatusRepository.findOne({ where: { tabla: 'detalle_sesion', estatus: 'Cerrada' } }))?.id || null;
                await this.detalleSesionRepository.save(thisLastSession);
            }


            const newSession = this.detalleSesionRepository.create({
                idUsuario: user.id,
                fechaInicio: new Date(),
                fechaFin: null,
                ip: ipAddress,
                exitoso: true,
                token: token,
                idEstatus: (await this.catEstatusRepository.findOne({ where: { tabla: 'detalle_sesion', estatus: 'Abierta' } }))?.id || null
            });
            await this.detalleSesionRepository.save(newSession);

            return { status: user.estatus, token };
        } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-validateUserCredentials',
            );
        }
    }

    public async getSesionesRecientes(userId: number): Promise<any[]> {
        try {
            const now = new Date();
            const fifteenMinutesAgo = new Date(now.getTime() - (15 * 60 * 1000) - (6 * 60 * 60 * 1000)); // 15 minutos atrás, considerando que la BD está en UTC
            console.log('Fifteen minutes ago:', fifteenMinutesAgo);

            const sessions = await this.detalleSesionRepository
                .createQueryBuilder('detalle_sesion')
                .leftJoinAndSelect('cat_estatus', 'estatus', 'detalle_sesion.id_estatus = estatus.id')
                .select('detalle_sesion.id')
                .addSelect('detalle_sesion.fecha_inicio', 'fecha_inicio')
                .addSelect('detalle_sesion.fecha_fin', 'fecha_fin')
                .addSelect('estatus.estatus', 'estatus')
                .addSelect('detalle_sesion.exitoso', 'exitoso')
                .addSelect('detalle_sesion.token', 'token')
                .where('detalle_sesion.id_usuario = :userId', { userId })
                .andWhere('detalle_sesion.fecha_inicio >= :fifteenMinutesAgo', { fifteenMinutesAgo })
                //.orWhere('detalle_sesion.fecha_fin >= :fifteenMinutesAgo', { fifteenMinutesAgo })
                .orderBy('detalle_sesion.fecha_inicio', 'DESC')
                .getRawMany();

            return sessions;
        } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-getRecentSessions',
            );
        }
    }


    public async getSesionByToken(token: string): Promise<any> {
        try {

            const sessions = await this.detalleSesionRepository
                .createQueryBuilder('detalle_sesion')
                .leftJoinAndSelect('cat_estatus', 'estatus', 'detalle_sesion.id_estatus = estatus.id')
                .select('detalle_sesion.id')
                .addSelect('detalle_sesion.id_usuario', 'id_usuario')
                .addSelect('detalle_sesion.fecha_fin', 'fecha_fin')
                .addSelect('estatus.estatus', 'estatus')
                .addSelect('detalle_sesion.exitoso', 'exitoso')
                .addSelect('detalle_sesion.token', 'token')
                .where('detalle_sesion.token = :token', { token })
                .getOne();

            return sessions;
        } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-getRecentSessions',
            );
        }
    }



    public async buildUserPayload(request: LoginReq, renew: boolean = false): Promise<{ payload?: any; error?: string; user?: any }> {
        const user = await this.usuariosRepository
            .createQueryBuilder('usuarios')
            .leftJoin('cat_estatus', 'estatus', 'usuarios.idestatus = estatus.id')
            .leftJoin('cat_usuarios', 'tipoUsuario', 'usuarios.idtipousuario = tipoUsuario.id')
            .select('usuarios.*')
            .addSelect('estatus.estatus', 'estatus')
            .addSelect('tipoUsuario.usuario', 'rol')
            .where('usuarios.username = :username', { username: request.username })
            .getRawOne();

        var perfil = 'Incompleto';

        if (!user) {
            return { error: 'Usuario no encontrado' };
        } else {
            if (
                user.nombres &&
                user.apellidopaterno &&
                user.email &&
                user.curp &&
                user.rfc &&
                user.domicilio &&
                user.colonia &&
                user.cp &&
                user.municipio &&
                user.localidad &&
                user.entidad &&
                user.nacionalidad &&
                user.sexo &&
                user.tiposangre &&
                user.lugartrabajo &&
                user.conodico_telefono &&
                user.conocido_nombres &&
                user.conocido_apellidopaterno &&
                user.conodico_cp &&
                user.conodico_telefono &&
                user.conodico_municipio &&
                user.conodico_localidad &&
                user.conodico_domicilio
            ) {
                perfil = 'Completo';
            }
        }

        if (user.estatus !== 'Activo') {
            return { error: user.estatus, user };
        }

        if (!renew) {
            const buffer = Buffer.from(request.password, 'utf-8');
            const b64 = buffer.toString('base64');
            if (bcrypt.compareSync(b64, user.password) === false) {
                return { error: 'Contraseña incorrecta', user };
            }
        }

        const recientes = await this.getSesionesRecientes(user.id);

        const exitosos = recientes.filter(s => s.exitoso === true);
        const lastSuccess = exitosos.length > 0 ? exitosos[0] : null;
        var fallidos = recientes.filter(s => s.exitoso === false);

        if (lastSuccess) {
            fallidos = fallidos.filter(s => s.fecha_inicio > lastSuccess.fecha_inicio);
        }
        const maxFails = parseInt(await this.commonService.getParametro("MAX_LOGIN_RETRIES"));

        if (fallidos.length >= maxFails) {
            return { error: 'Bloqueado por reintentos.', user };
        }

        const payload = {
            username: user.username,
            //rol: user.rol,
            rol: user.idtipousuario,
            aData: user.id,
            perfil: perfil,
        };

        return { payload, user };
    }

}
