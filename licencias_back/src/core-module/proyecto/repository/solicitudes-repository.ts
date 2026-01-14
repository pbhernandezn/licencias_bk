import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { SolicitudesEntity } from '../models/entities/solicitudes-entity';
import { UsuariosEntity } from '../models/entities/usuarios-entity';
import { CatLicenciasEntity } from '../models/entities/catLicencias-entity';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';
import { CreateSolicitudRequest, getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDataDTO, SolicitudesDTO } from '../models/from-tables/solicitudes-dto';
import { SolicitudesMapping } from '../utils/from-tables/solicitudes-mapping';

@Injectable()
export class SolicitudesRepository {
  constructor(
    @InjectRepository(SolicitudesEntity)
    private readonly SolicitudesRepository: Repository<SolicitudesEntity>,
    @InjectRepository(UsuariosEntity)
    private readonly UsuariosRepository: Repository<UsuariosEntity>,
    @InjectRepository(CatLicenciasEntity)
    private readonly CatLicenciasRepository: Repository<CatLicenciasEntity>,
    @InjectRepository(CatEstatusEntity)
    private readonly CatEstatusRepository: Repository<CatEstatusEntity>,
  ) {}

 
  public async getSolicitudes(
    queryParams: QueryParams
  ): Promise<getSolicitudesDTO> {
    try {
      const result: any[] = await this.SolicitudesRepository
        .createQueryBuilder('solicitudes')
        .leftJoin(
          'usuarios',
          'usuarios',
          'solicitudes.idusuario = usuarios.id',
        )
        .leftJoin(
          'cat_licencias',
          'licencias',
          'solicitudes.idtipolicencia = licencias.id',
        )
        .leftJoin(
          'cat_estatus',
          'estatus',
          'estatus.tabla = :tabla AND solicitudes.idestatus = estatus.id',
          { tabla: 'solicitudes_licencias' },
        )
        .select([
            'solicitudes.id',
            'solicitudes.idusuario',
            'usuarios.nombres AS usuarios_nombres',
            'usuarios.apellidopaterno AS usuarios_apellidopaterno',
            'usuarios.apellidomaterno AS usuarios_apellidomaterno',
            'solicitudes.creacion',
            'solicitudes.modificacion',
            'solicitudes.idtipolicencia',
            'licencias.licencia AS licencias_licencia',
            'licencias.descripcion AS licencias_descripcion',
            'solicitudes.numerolicencia',
            'solicitudes.expedicion',
            'solicitudes.vigencia',
            'solicitudes.idestatus',
            'estatus.estatus AS estatus_estatus',
            'solicitudes.idmetodopago',
        ])
        .getRawMany();

      if (!result) {
        throw new NotFoundException('No se encontraron solicitudes. ');
        }

        const solicitudesData: Array<SolicitudesDataDTO> = result.map((r) => ({
            id: r['solicitudes_id'],
            idusuario: r['solicitudes_idusuario'],
            nombres: r['usuarios_nombres'],
            apellidopaterno: r['usuarios_apellidopaterno'],
            apellidomaterno: r['usuarios_apellidomaterno'],
            creacion: r['solicitudes_creacion'],
            modificacion: r['solicitudes_modificacion'],
            idtipolicencia: r['solicitudes_idtipolicencia'],
            licencia: r['licencias_licencia'],
            descripcion: r['licencias_descripcion'],
            numerolicencia: r['solicitudes_numerolicencia'],
            expedicion: r['solicitudes_expedicion'],
            vigencia: r['solicitudes_vigencia'],
            idestatus: r['solicitudes_idestatus'],
            estatus: r['estatus_estatus'],
            idmetodopago: r['solicitudes_idmetodopago']
        }));

        const solicitudesDataDTO: getSolicitudesDTO = {
        existe: result && result.length > 0,
        solicitudesData: solicitudesData,
        };
     
        return solicitudesDataDTO;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cus1',
          );
        }
  }

  public async getSolicitudById(
        request: getSolicitudByIdReq
  ): Promise<getSolicitudByIdDTO> {
        try {
        const result = await this.SolicitudesRepository
            .createQueryBuilder('solicitudes')
        .leftJoin(
            'usuarios',
            'usuarios',
            'solicitudes.idusuario = usuarios.id',
        )
        .leftJoin(
            'cat_licencias',
            'licencias',
            'solicitudes.idtipolicencia = licencias.id',
        )
        .leftJoin(
            'cat_estatus',
            'estatus',
            'estatus.tabla = :tabla AND solicitudes.idestatus = estatus.id',
            { tabla: 'solicitudes_licencias' },
        )
        .select([
                'solicitudes.id',
                'solicitudes.idusuario',
                'usuarios.nombres AS usuarios_nombres',
                'usuarios.apellidopaterno AS usuarios_apellidopaterno',
                'usuarios.apellidomaterno AS usuarios_apellidomaterno',
                'solicitudes.creacion',
                'solicitudes.modificacion',
                'solicitudes.idtipolicencia',
                'licencias.licencia AS licencias_licencia',
                'licencias.descripcion AS licencias_descripcion',
                'solicitudes.numerolicencia',
                'solicitudes.expedicion',
                'solicitudes.vigencia',
                'solicitudes.idestatus',
                'estatus.estatus AS estatus_estatus',
                'solicitudes.idmetodopago'
            ])
            .where('solicitudes.id = :id', { id: request.id })
            .getRawOne();

        const solicitudDTO: getSolicitudByIdDTO = {
            existe: !!result,
            solicitudData: result
            ? {
                id: result['solicitudes_id'],
                idusuario: result['solicitudes_idusuario'],
                nombres: result['usuarios_nombres'],
                apellidopaterno: result['usuarios_apellidopaterno'],
                apellidomaterno: result['usuarios_apellidomaterno'],
                creacion: result['solicitudes_creacion'],
                modificacion: result['solicitudes_modificacion'],
                idtipolicencia: result['solicitudes_idtipolicencia'],
                licencia: result['licencias_licencia'],
                descripcion: result['licencias_descripcion'],
                numerolicencia: result['solicitudes_numerolicencia'],
                expedicion: result['solicitudes_expedicion'],
                vigencia: result['solicitudes_vigencia'],
                idestatus: result['solicitudes_idestatus'],
                estatus: result['estatus_estatus'],
                idmetodopago: result['solicitudes_idmetodopago']
                }
            : undefined,
        };

        return solicitudDTO;
        } catch (error) {
        throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cus2',
        );}
    }

  public async isExistsSolicitud(idRow: number): Promise<number> {
    try {
      const query = this.SolicitudesRepository
        .createQueryBuilder()
        .select('count(*)', 'cuenta')
        .where('id = :idRow', { idRow });
      const unit: any = await query.getRawMany();
      if (!unit) return null;
      return unit[0].cuenta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-1f355201-aa52-4f57-94a6-53892d6d4a20',
      );
    }
  }

  public async getSolicitudesByIdUsuario(
    request: getSolicitudByIdUsuarioReq
  ): Promise<getSolicitudesDTO> {
    try {
      const result: any[] = await this.SolicitudesRepository
        .createQueryBuilder('solicitudes')
        .leftJoin(
          'usuarios',
          'usuarios',
          'solicitudes.idusuario = usuarios.id',
        )
        .leftJoin(
          'cat_licencias',
          'licencias',
          'solicitudes.idtipolicencia = licencias.id',
        )
        .leftJoin(
          'cat_estatus',
          'estatus',
          'estatus.tabla = :tabla AND solicitudes.idestatus = estatus.id',
          { tabla: 'solicitudes_licencias' },
        )
        .select([
            'solicitudes.id',
            'solicitudes.idusuario',
            'usuarios.nombres AS usuarios_nombres',
            'usuarios.apellidopaterno AS usuarios_apellidopaterno',
            'usuarios.apellidomaterno AS usuarios_apellidomaterno',
            'solicitudes.creacion',
            'solicitudes.modificacion',
            'solicitudes.idtipolicencia',
            'licencias.licencia AS licencias_licencia',
            'licencias.descripcion AS licencias_descripcion',
            'solicitudes.numerolicencia',
            'solicitudes.expedicion',
            'solicitudes.vigencia',
            'solicitudes.idestatus',
            'estatus.estatus AS estatus_estatus',
            'solicitudes.idmetodopago'
        ])
        .where('solicitudes.idusuario = :idusuario', { idusuario: request.idUsuario })
        .getRawMany();

      if (!result) {
        throw new NotFoundException('No se encontraron solicitudes para el usuario proporcionado.');
        }

        const solicitudesData: Array<SolicitudesDataDTO> = result.map((r) => ({
            id: r['solicitudes_id'],
            idusuario: r['solicitudes_idusuario'],
            nombres: r['usuarios_nombres'],
            apellidopaterno: r['usuarios_apellidopaterno'],
            apellidomaterno: r['usuarios_apellidomaterno'],
            creacion: r['solicitudes_creacion'],
            modificacion: r['solicitudes_modificacion'],
            idtipolicencia: r['solicitudes_idtipolicencia'],
            licencia: r['licencias_licencia'],
            descripcion: r['licencias_descripcion'],
            numerolicencia: r['solicitudes_numerolicencia'],
            expedicion: r['solicitudes_expedicion'],
            vigencia: r['solicitudes_vigencia'],
            idestatus: r['solicitudes_idestatus'],
            estatus: r['estatus_estatus'],
            idmetodopago: r['solicitudes_idmetodopago'],
        }));

        const solicitudesDataDTO: getSolicitudesDTO = {
        existe: result && result.length > 0,
        solicitudesData: solicitudesData,
        };
     
        return solicitudesDataDTO;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cus1',
          );
        }
  }

  public async getSolicitudesByIdTipoLicencia(
    request: getSolicitudByIdTipoLicenciaReq
  ): Promise<getSolicitudesDTO> {
    try {
      const result: any[] = await this.SolicitudesRepository
        .createQueryBuilder('solicitudes')
        .leftJoin(
          'usuarios',
          'usuarios',
          'solicitudes.idusuario = usuarios.id',
        )
        .leftJoin(
          'cat_licencias',
          'licencias',
          'solicitudes.idtipolicencia = licencias.id',
        )
        .leftJoin(
          'cat_estatus',
          'estatus',
          'estatus.tabla = :tabla AND solicitudes.idestatus = estatus.id',
          { tabla: 'solicitudes_licencias' },
        )
        .select([
            'solicitudes.id',
            'solicitudes.idusuario',
            'usuarios.nombres AS usuarios_nombres',
            'usuarios.apellidopaterno AS usuarios_apellidopaterno',
            'usuarios.apellidomaterno AS usuarios_apellidomaterno',
            'solicitudes.creacion',
            'solicitudes.modificacion',
            'solicitudes.idtipolicencia',
            'licencias.licencia AS licencias_licencia',
            'licencias.descripcion AS licencias_descripcion',
            'solicitudes.numerolicencia',
            'solicitudes.expedicion',
            'solicitudes.vigencia',
            'solicitudes.idestatus',
            'estatus.estatus AS estatus_estatus',
            'solicitudes.idmetodopago'
        ])
        .where('solicitudes.idtipolicencia = :idtipolicencia', { idtipolicencia: request.idTipoLicencia })
        .getRawMany();

      if (!result) {
        throw new NotFoundException('No se encontraron solicitudes para el tipo de licencia proporcionado.');
        }

        const solicitudesData: Array<SolicitudesDataDTO> = result.map((r) => ({
            id: r['solicitudes_id'],
            idusuario: r['solicitudes_idusuario'],
            nombres: r['usuarios_nombres'],
            apellidopaterno: r['usuarios_apellidopaterno'],
            apellidomaterno: r['usuarios_apellidomaterno'],
            creacion: r['solicitudes_creacion'],
            modificacion: r['solicitudes_modificacion'],
            idtipolicencia: r['solicitudes_idtipolicencia'],
            licencia: r['licencias_licencia'],
            descripcion: r['licencias_descripcion'],
            numerolicencia: r['solicitudes_numerolicencia'],
            expedicion: r['solicitudes_expedicion'],
            vigencia: r['solicitudes_vigencia'],
            idestatus: r['solicitudes_idestatus'],
            estatus: r['estatus_estatus'],
            idmetodopago: r['solicitudes_idmetodopago'],
        }));

        const solicitudesDataDTO: getSolicitudesDTO = {
        existe: result && result.length > 0,
        solicitudesData: solicitudesData,
        };
     
        return solicitudesDataDTO;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cus1',
          );
        }
  }

  public async getSolicitudesByIdEstatus(
    request: getSolicitudByIdEstatusReq
  ): Promise<getSolicitudesDTO> {
    try {
      const result: any[] = await this.SolicitudesRepository
        .createQueryBuilder('solicitudes')
        .leftJoin(
          'usuarios',
          'usuarios',
          'solicitudes.idusuario = usuarios.id',
        )
        .leftJoin(
          'cat_licencias',
          'licencias',
          'solicitudes.idtipolicencia = licencias.id',
        )
        .leftJoin(
          'cat_estatus',
          'estatus',
          'estatus.tabla = :tabla AND solicitudes.idestatus = estatus.id',
          { tabla: 'solicitudes_licencias' },
        )
        .select([
            'solicitudes.id',
            'solicitudes.idusuario',
            'usuarios.nombres AS usuarios_nombres',
            'usuarios.apellidopaterno AS usuarios_apellidopaterno',
            'usuarios.apellidomaterno AS usuarios_apellidomaterno',
            'solicitudes.creacion',
            'solicitudes.modificacion',
            'solicitudes.idtipolicencia',
            'licencias.licencia AS licencias_licencia',
            'licencias.descripcion AS licencias_descripcion',
            'solicitudes.numerolicencia',
            'solicitudes.expedicion',
            'solicitudes.vigencia',
            'solicitudes.idestatus',
            'estatus.estatus AS estatus_estatus',
            'solicitudes.idmetodopago',
        ])
        .where('solicitudes.idestatus = :idestatus', { idestatus: request.idEstatus })
        .getRawMany();

      if (!result) {
        throw new NotFoundException('No se encontraron solicitudes para el tipo de licencia proporcionado.');
        }

        const solicitudesData: Array<SolicitudesDataDTO> = result.map((r) => ({
            id: r['solicitudes_id'],
            idusuario: r['solicitudes_idusuario'],
            nombres: r['usuarios_nombres'],
            apellidopaterno: r['usuarios_apellidopaterno'],
            apellidomaterno: r['usuarios_apellidomaterno'],
            creacion: r['solicitudes_creacion'],
            modificacion: r['solicitudes_modificacion'],
            idtipolicencia: r['solicitudes_idtipolicencia'],
            licencia: r['licencias_licencia'],
            descripcion: r['licencias_descripcion'],
            numerolicencia: r['solicitudes_numerolicencia'],
            expedicion: r['solicitudes_expedicion'],
            vigencia: r['solicitudes_vigencia'],
            idestatus: r['solicitudes_idestatus'],
            estatus: r['estatus_estatus'],
            idmetodopago: r['solicitudes_idmetodopago'],
        }));

        const solicitudesDataDTO: getSolicitudesDTO = {
        existe: result && result.length > 0,
        solicitudesData: solicitudesData,
        };
     
        return solicitudesDataDTO;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cus1',
          );
        }
  }

  public async isExistsSolicitudByUsuarioTipoLicencia(idUsuario: number,idTipoLicencia: number): Promise<number> {
    try {
      const query = this.SolicitudesRepository
        .createQueryBuilder()
        .select('count(*)', 'cuenta')
        .where('idusuario = :idUsuario AND idtipolicencia = :idTipoLicencia AND idestatus != :estatusRechazada', 
          { idUsuario, idTipoLicencia, estatusRechazada: 25 });
      const unit: any = await query.getRawMany();
      if (!unit) return null;
      return unit[0].cuenta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-1f355201-aa52-4f57-94a6-53892d6d4a20',
      );
    }
  }

  public async saveSolicitud(request: CreateSolicitudRequest): Promise<void> {
    try {
      const unit = this.SolicitudesRepository.create({
        idusuario: request.idusuario,
        idtipolicencia: request.idtipolicencia,
        idmetodopago: request.idmetodopago,
        idestatus: 20,
      });

      await this.SolicitudesRepository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  
  public async updateSolicitud(id: number, payload: SolicitudesDTO): Promise<void> {
    try {
      const unit: Partial<SolicitudesEntity>={};
      unit.idusuario = payload.idusuario;
      unit.idtipolicencia = payload.idtipolicencia;
      unit.numerolicencia = payload.numerolicencia;
      unit.expedicion = payload.expedicion;
      unit.vigencia = payload.vigencia;
      unit.idestatus = payload.idestatus;

      await this.SolicitudesRepository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }
  

  
}