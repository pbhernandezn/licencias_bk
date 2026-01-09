import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { DetalleSesionEntity } from '@principal/core-module/proyecto/models/entities/detalle_sesion-entity';
import { ParametrosEntity } from '@principal/core-module/proyecto/models/entities/parametros-entity';
import { UsuariosEntity } from '@principal/core-module/proyecto/models/entities/usuarios-entity';
import {
  getAuthByEmailDTO,
  getAuthByEmailReq,
  userlockDTO,
  userlockreq,
} from '@principal/core-module/proyecto/models/from-tables/Auth-dto';
import {
  createDeatilSedsionDTO,
  createDetalleSesionDTO,
  createDetalleSesionReq,
  DetalleSesionDTO,
  getdetSeByIdDTO,
} from '@principal/core-module/proyecto/models/from-tables/DetalleSesion-dto';
import { ParametroDTO } from '@principal/core-module/proyecto/models/from-tables/Parametros-dto';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UsuariosEntity)
    private readonly authRepository: Repository<UsuariosEntity>,
    @InjectRepository(DetalleSesionEntity)
    private readonly detSeRepository: Repository<DetalleSesionEntity>,
    @InjectRepository(ParametrosEntity)
    private readonly parametrosRepository: Repository<ParametrosEntity>,
    private readonly dataSource: DataSource,
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
        params: [
          'MAX_FAILED_ATTEMPTS',
          'LOCK_TIME_MINUTES',
          'USER_STATUS_LOCKED_ID',
        ],
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
        'TYPE-A-4b72d8a6-1c9e-4a2e-9e7d-6f3b1a8c0e55_cus3',
      );
    }
  }

  public async getFAttchronologically(
    idUsuario: number,
    lockTimeMinutes: number,
  ): Promise<Number> {
    try {
      const result = await this.detSeRepository
        .createQueryBuilder('ds')
        .select('COUNT(*)', 'total')
        .where('ds.id_usuario = :idUsuario', { idUsuario })
        .andWhere('ds.exitoso = false')
        .andWhere(
          `ds.fecha_inicio >= NOW() - INTERVAL '${lockTimeMinutes} minutes'`,
        )
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('MAX(ds2.fecha_inicio)')
            .from('detalle_sesion', 'ds2')
            .where('ds2.id_usuario = :idUsuario')
            .andWhere('ds2.exitoso = true')
            .getQuery();

          return `ds.fecha_inicio > COALESCE((${subQuery}), '1900-01-01')`;
        })
        .setParameter('idUsuario', idUsuario)
        .getRawOne();

      return Number(result.total);
    } catch (error) {}
  }

  /* updateUsuarioReq ,updateUsuarioDTO  */

  public async updateUserLock(request: userlockreq): Promise<userlockDTO> {
    try {
      const usuarioExists = await this.authRepository
        .createQueryBuilder('u')
        .select('1')
        .where('u.id = :idUsuario', { idUsuario: request.idUsuario })
        .andWhere('u.email = :email', { email: request.username })
        .getRawOne();

      const result: userlockDTO = {
        existe: true,
        autorizado: {
          errores: null,
        },
      };
      if (!usuarioExists) {
        result.existe = false;
        result.autorizado.errores = 'El usuario no existe.';
      } else {
        const updateResult = await this.authRepository
          .createQueryBuilder()
          .update(UsuariosEntity)
          .set({ idestatus: request.statuslockedid })
          .where('id = :idUsuario', { idUsuario: request.idUsuario })
          .andWhere('email = :email', { email: request.username })
          .execute();

        if (updateResult.affected === 0) {
          result.autorizado.errores =
            'No fue posible actualizar el estatus del usuario.';
          result.existe = false;
        } else {
          result.existe = true;
          result.autorizado.errores =
            'Usuario bloqueado por intentos fallidos.';
        }
      }

      return result;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55cadr',
      );
    }
  }

  async crearSesionUnica(
    request: createDetalleSesionReq,
  ): Promise<createDeatilSedsionDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const result: createDeatilSedsionDTO = {
      creado: false,
      errores: null,
    };
    try {
      // 1. Verificar sesión activa (único criterio válido)
      const sesionActiva = await queryRunner.manager
        .createQueryBuilder()
        .select('1')
        .from('detalle_sesion', 'ds')
        .where('ds.id_usuario = :idUsuario', {
          idUsuario: request.idUsuario,
        })
        .andWhere('ds.fecha_fin IS NULL')
        .andWhere('ds.exitoso IS TRUE')
        /* .andWhere('DATE(ds.fecha_inicio) = CURRENT_DATE')*/
        .getRawOne();

      console.log(`sesion Activa Select ^^^   id   ${request.idUsuario}`);

      // 2. Cerrar sesión activa si existe
      if (sesionActiva) {
        await queryRunner.manager
          .createQueryBuilder()
          .update('detalle_sesion')
          .set({
            fechaFin: () => 'NOW()',
            exitoso: false,
            idStatus: 2, // CERRADA (informativo)
          })
          .where('id_usuario = :idUsuario', {
            idUsuario: request.idUsuario,
          })
          .andWhere('fecha_fin IS NULL')
          .execute();

        // 3. Crear nueva sesión
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('detalle_sesion')
          .values({
            idUsuario: request.idUsuario,
            fechaInicio: () => 'NOW()',
            token: request.token,
            exitoso: true,
            idStatus: 1, // ACTIVA (informativo)
            comentarios: 'Crear nueva sesión (única activa)',
            ip: request.ip ?? null,
          })
          .execute();
      } else {
        result.creado = true;
        result.errores = {
          sesionActiva: !!sesionActiva,
          note: sesionActiva
            ? 'Sesión activa anterior cerrada y nueva sesión creada'
            : 'Nueva sesión creada (no existían sesiones activas)',
        };
        return result;
      }

      await queryRunner.commitTransaction();

      result.creado = true;
      result.errores = {
        sesionActiva: !!sesionActiva,
        note: sesionActiva
          ? 'Sesión activa anterior cerrada y nueva sesión creada'
          : 'Nueva sesión creada (no existían sesiones activas)',
      };
      return result;

      return result;
    } catch (error) {
      console.error('ERROR crearSesionUnica:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        detail: error?.detail,
        stack: error?.stack,
      });
      await queryRunner.rollbackTransaction();
      result.creado = false;
      result.errores = {
        sesionActiva: false,
        note: false
          ? 'todo fallo'
          : 'Nueva sesión creada (no existían sesiones activas)',
      };
      return result;
    } finally {
      await queryRunner.release();
    }
  }
}
