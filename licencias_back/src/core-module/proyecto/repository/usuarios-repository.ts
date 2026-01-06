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
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq } from '../models/from-tables/usuarios-dto';
import { UsuariosEntity } from '../models/entities/usuarios-entity';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';

@Injectable()
export class UsuariosRepository {
    constructor(
        @InjectRepository(UsuariosEntity)
        private readonly usuariosRepository: Repository<UsuariosEntity>,
        @InjectRepository(CatEstatusEntity)
        private readonly catEstatusRepository: Repository<CatEstatusEntity>,
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

            var res: createUsuarioDTO;
            console.log('Creating user with data:', request);
            const newUsuario = this.usuariosRepository.create({
                nombres: request.nombres,
                apellidopaterno: request.apellidopaterno,
                apellidomaterno: request.apellidomaterno,
                curp: request.curp,
                email: request.email,
                password: request.password,
                // Not implemented
                //fecha: request.fechanacimiento,
            });

            var nvoUsr = await this.usuariosRepository.save(newUsuario);
            res.creado = nvoUsr ? true : false;

            return res;
        } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
                error.message,
                'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55cafc',
            );
        }
    }

}
