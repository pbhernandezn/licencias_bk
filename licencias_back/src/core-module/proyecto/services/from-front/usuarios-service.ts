import { Injectable } from '@nestjs/common';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { UsuariosTService } from '../from-tables/usuarios-service';
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq, updateUsuarioDTO, updateUsuarioReq } from '../../models/from-tables/usuarios-dto';
import { isDateMatchingCURP, isValidCURP, isValidDate, isValidName, isValidRFC } from '../../utils/common';
import { response } from 'express';

@Injectable()
export class UsuariosService {
    constructor(
        private readonly usuariosTService: UsuariosTService,
    ) { }

    public async getUsuarioById(request: getUsuarioByIdReq) {
        let usuarioDat: getUsuarioByIdDTO;
        {
            try {
                const respuesta = await this.usuariosTService.getUsuariosById(request);
                usuarioDat = respuesta;
            } catch (error) {
                throw ManejadorErrores.getDatosVitalesNoCargados(
                    'tipo de roles no encontrados',
                    'ccd1b7d9-afb6-5f06-b81e-9250a00ef904',
                );
            }
        }

        return usuarioDat;
    }

    

    public async createUsuario(request: createUsuarioReq) {
        var respuesta: createUsuarioDTO = {
            creado: true,
            errores: {},
        };
        {
            try {
                if (!isValidName(request.nombres)) {
                    respuesta.creado = false;
                    respuesta.errores.nombres = 'El nombre contiene caracteres no válidos.';
                }
                if (!isValidName(request.apellidopaterno)) {
                    respuesta.creado = false;
                    respuesta.errores.apellidopaterno = 'El apellido paterno contiene caracteres no válidos.';
                }
                if (request.apellidomaterno && !isValidName(request.apellidomaterno)) {
                    respuesta.creado = false;
                    respuesta.errores.apellidomaterno = 'El apellido materno contiene caracteres no válidos.';
                }
                if (isValidCURP(request.curp)) {
                    respuesta.creado = false;
                    respuesta.errores.curp = 'La CURP no es válida.';
                } else {
                    if (!isDateMatchingCURP(request.fechanacimiento, request.curp)) {
                        respuesta.creado = false;
                        respuesta.errores.fechanacimiento = 'La fecha de nacimiento no coincide con la CURP.';
                    }
                }
                if (!isValidDate(request.fechanacimiento)) {
                    respuesta.creado = false;
                    respuesta.errores.fechanacimiento = 'La fecha de nacimiento no es válida.';
                }

                if (
                    !request.nombres ||
                    !request.apellidopaterno ||
                    !request.curp ||
                    !request.email ||
                    !request.password ||
                    !request.fechanacimiento
                ) {
                    respuesta.creado = false;
                    respuesta.errores.necesarios = 'Nombre, Apellidos Paterno y Materno, CURP, Email, Contraseña y Fecha de Nacimiento son obligatorios.';
                }

                if (!respuesta.errores.apellidomaterno && !respuesta.errores.nombres && !respuesta.errores.apellidopaterno &&
                    !respuesta.errores.curp && !respuesta.errores.fechanacimiento && !respuesta.errores.necesarios) {
                    respuesta = await this.usuariosTService.createUsuario(request);
                }
            } catch (error) {
                console.log(error);
                throw ManejadorErrores.getDatosVitalesNoCargados(
                    'tipo de roles no encontrados',
                    '31d6cfe-0d16-ae93-1b73-c59d7e0c089c0',
                );
            }
        }

        return respuesta;
    }



    public async updateUsuario(request: updateUsuarioReq) {
        var respuesta: updateUsuarioDTO = {
            actualizado: true,
            errores: {},
        };
        {
            try {
                if (request.nombres && !isValidName(request.nombres)) {
                    respuesta.actualizado = false;
                    respuesta.errores.nombres = 'El nombre contiene caracteres no válidos.';
                }
                if (request.apellidopaterno && !isValidName(request.apellidopaterno)) {
                    respuesta.actualizado = false;
                    respuesta.errores.apellidopaterno = 'El apellido paterno contiene caracteres no válidos.';
                }
                if (request.apellidomaterno && !isValidName(request.apellidomaterno)) {
                    respuesta.actualizado = false;
                    respuesta.errores.apellidomaterno = 'El apellido materno contiene caracteres no válidos.';
                }
                if (request.curp) {
                    if (isValidCURP(request.curp)) {
                        respuesta.actualizado = false;
                        respuesta.errores.curp = 'La CURP no es válida.';
                    } else if (!isDateMatchingCURP(request.fechanacimiento, request.curp)) {
                        respuesta.actualizado = false;
                        respuesta.errores.fechanacimiento = 'La fecha de nacimiento no coincide con la CURP.';
                    }
                }

                if (request.fechanacimiento && !isValidDate(request.fechanacimiento)) {
                    respuesta.actualizado = false;
                    respuesta.errores.fechanacimiento = 'La fecha de nacimiento no es válida.';
                }
                
                if ( !respuesta.actualizado ) {
                    respuesta.actualizado = false;
                }else{
                    respuesta = await this.usuariosTService.updateUsuario(request);
                }
            } catch (error) {
                console.log(error);
                throw ManejadorErrores.getDatosVitalesNoCargados(
                    'tipo de roles no encontrados',
                    'c8b111d3-0543-4085-bab2-3dde02c1e094',
                );
            }
        }

        return respuesta;
    }
}
