import { Injectable } from '@nestjs/common';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { UsuariosTService } from '../from-tables/usuarios-service';
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq } from '../../models/from-tables/usuarios-dto';
import { isDateMatchingCURP, isValidCURP, isValidDate, isValidName, isValidRFC } from '../../utils/common';

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
            errores: {
                nombres: '',
                apellidopaterno: '',
                apellidomaterno: '',
                curp: '',
                email: '',
                password: '',
                fechanacimiento: '',
                necesarios: ''
            },
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

                if(
                    !request.nombres ||
                    !request.apellidopaterno ||
                    !request.curp ||
                    !request.email ||
                    !request.password ||
                    !request.fechanacimiento
                ){
                    respuesta.creado = false;
                    respuesta.errores.necesarios = 'Nombre, Apellidos Paterno y Materno, CURP, Email, Contraseña y Fecha de Nacimiento son obligatorios.';
                }

                if (!respuesta.errores) {
            console.log('Creating user with data:', request);
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
}
