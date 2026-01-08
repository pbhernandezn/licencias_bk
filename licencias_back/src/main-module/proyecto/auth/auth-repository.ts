import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { DetalleSesionEntity } from '@principal/core-module/proyecto/models/entities/detalle_sesion-entity';
import { ParametrosEntity } from '@principal/core-module/proyecto/models/entities/ParametrosEntity';
import { UsuariosEntity } from '@principal/core-module/proyecto/models/entities/usuarios-entity';
import {
  getAuthByEmailDTO,
  getAuthByEmailReq,
} from '@principal/core-module/proyecto/models/from-tables/Auth-dto';
import {
  createDetalleSesionDTO,
  createDetalleSesionReq,
  DetalleSesionDTO,
  getdetSeByIdDTO,
} from '@principal/core-module/proyecto/models/from-tables/DetalleSesion-dto';
import { ParametroDTO } from '@principal/core-module/proyecto/models/from-tables/Parametros-dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UsuariosEntity)
    private readonly authRepository: Repository<UsuariosEntity>,
    @InjectRepository(DetalleSesionEntity)
    private readonly detSeRepository: Repository<DetalleSesionEntity>,
    @InjectRepository(ParametrosEntity)
    private readonly parametrosRepository: Repository<ParametrosEntity>,
  ) {}
  public async getUsuarioByEmail(
    request: getAuthByEmailReq,
  ): Promise<getAuthByEmailDTO> {
    try {
      const result = await this.authRepository
        .createQueryBuilder('u')
        .innerJoin('cat_estatus', 'ce', 'u.idestatus = ce.id')
        .innerJoin('cat_usuarios', 'cu', 'u.idtipousuario = cu.id')
        .select([
          'u.id AS user_id',
          'ce.estatus AS estatus',
          'cu.usuario AS usuario',
          'cu.descripcion AS descripcion',
          'u.username AS username',
          'u.nombres || u.apellidos AS nombre_completo',
          'u.password AS password',
          'u.rfc AS rfc',
          'u.curp AS curp',
          'ce.id AS statusid',
        ])
        .where('u.username = :email', { email: request.email })
        .andWhere('ce.id = :estatusId', { estatusId: 1 })
        .getRawOne();

      const authResponse: getAuthByEmailDTO = {
        existe: !!result,
        usuario: result
          ? {
              user_Id: result['user_id'],
              username: result['username'],
              nombre_completo: result['nombre_completo'],
              rfc: result['rfc'],
              curp: result['curp'],
              password: result['password'],
              estatus: result['estatus'],
              usuario: result['usuario'],
              statusid: result['statusid'],
            }
          : undefined,
      };
      console.log(`this.authRepository result -- ${result}`);
      //return new Wrapper(queryParams, 1, [usuarioDTO], true, 'Usuario encontrado', null);
      return authResponse;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'AUTH-A-4b8e9f12-6d3a-4a0f-9c7e-2f5a8c1d9e44',
      );
    }
  }

  public async createDetalleSesion(
    request: createDetalleSesionReq,
  ): Promise<createDetalleSesionDTO> {
    try {
      const res: createDetalleSesionDTO = {
        creado: false,
        errores: null,
      };

      const newDetalleSesion = this.detSeRepository.create({
        idUsuario: request.idUsuario,
        fechaFin: request.fechaFin,
        ip: request.ip,
        exitoso: request.exitoso,
        token: request.token,
        idStatus: request.idStatus,
        comentarios: request.comentarios,
      });

      const saved = await this.detSeRepository.save(newDetalleSesion);

      res.creado = !!saved;
      return res;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'AUTH-A-4b8e9f12-DET-SESION',
      );
    }
  }

  public async getParametros(): Promise<ParametroDTO[]> {
    return this.parametrosRepository
      .createQueryBuilder('p')
      .select(['p.parametro AS parametro', 'p.valor AS valor'])
      .where('p.parametro IN (:...params)', {
        params: ['MAX_FAILED_ATTEMPTS', 'LOCK_TIME_MINUTES'],
      })
      .getRawMany<ParametroDTO>();
  }

  public async getDetalleSesionbyId(idRow: number): Promise<getdetSeByIdDTO> {
    try {
      const result = await this.detSeRepository
        .createQueryBuilder('ds')
        .innerJoin('ds.usuario', 'u')
        .select([
          'ds.id',
          'ds.id_usuario AS id_usuario',
          'ds.fecha_inicio AS fecha_inicio',
          'ds.fecha_fin AS fecha_fin',
          'ds.fecha_fin AS fecha_fin',
          'ds.exitoso AS exitoso',
          'ds.token AS token',
          'ds.comentarios AS comentarios',
          'ds.ip',
        ])
        .where('u.id = :idUsuario', { idUsuario: idRow })
        .getRawMany();

      const UDetSesDTO: getdetSeByIdDTO = {
        existe: !!result,
        catUsuario: result
          ? {
              id: result['id'],
              idUsuario: result['id_usuario'],
              fechaInicio: result['fecha_inicio'],
              fechaFin: result['fecha_fin'],
              ip: result['ip'],
              exitoso: result['exitoso'],
              token: result['token'],
              idStatus: result['estatus_estatus'],
              comentarios: result['comentarios'],
            }
          : undefined,
      };

      return UDetSesDTO;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cus2',
      );
    }
  }
}
