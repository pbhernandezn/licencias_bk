import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SolicitudesEntity } from '../../models/entities/solicitudes-entity';
import { UsuariosEntity } from '../../models/entities/usuarios-entity';
import { RevisionesEntity } from '../../models/entities/revisiones-entity';
import { getDashboardTramiteDTO, getDashboardTramiteReq, getDashboardRevisorDTO, getDashboardRevisorReq } from '../../models/from-tables/dashboard-dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(SolicitudesEntity)
    private readonly solicitudesRepository: Repository<SolicitudesEntity>,
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepository: Repository<UsuariosEntity>,
    @InjectRepository(RevisionesEntity)
    private readonly revisionesRepository: Repository<RevisionesEntity>,
  ) {}

  public async getDashboardData() {
    try {
      // Aquí puedes implementar la lógica para obtener datos del dashboard
      const dashboardData = {
        totalSolicitudes: 0,
        solicitudesPendientes: 0,
        solicitudesAprobadas: 0,
        solicitudesRechazadas: 0,
      };

      return dashboardData;
    } catch (error) {
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'Error al obtener datos del dashboard',
        'dashboard-001',
      );
    }
  }

  public async getDashboardTramite(request: getDashboardTramiteReq): Promise<getDashboardTramiteDTO> {
    try {
      // Consulta con joins para obtener solicitudes, usuarios y licencias
      const solicitudes = await this.solicitudesRepository
        .createQueryBuilder('s')
        .innerJoinAndSelect('usuarios', 'u', 's.idusuario = u.id')
        .innerJoinAndSelect('cat_licencias', 'cl', 's.idtipolicencia = cl.id')
        .where('s.creacion BETWEEN :fechaInicio AND :fechaFin', {
          fechaInicio: request.FechaInicio,
          fechaFin: request.FechaFin,
        })
        .select([
          'u.municipio as municipio',
          'cl.descripcion as descripcion',
          'cl.precio as precio',
          'COUNT(*) as cantidad',
        ])
        .groupBy('u.municipio')
        .addGroupBy('cl.descripcion')
        .addGroupBy('cl.precio')
        .getRawMany();

      // Calcular totales
      let tramitesCreados = 0;
      let recaudacionTotal = 0;

      // Agrupar por municipio
      const municipiosMap = new Map<string, any>();

      for (const row of solicitudes) {
        const cantidad = parseInt(row.cantidad);
        const precio = parseFloat(row.precio);
        tramitesCreados += cantidad;
        recaudacionTotal += cantidad * precio;

        const municipio = row.municipio || 'Sin municipio';
        
        if (!municipiosMap.has(municipio)) {
          municipiosMap.set(municipio, {
            municipio: municipio,
            licenciaTotal: 0,
            tipos: [],
          });
        }

        const municipioData = municipiosMap.get(municipio);
        municipioData.licenciaTotal += cantidad;
        municipioData.tipos.push({
          cantidad: cantidad,
          nombre: row.descripcion,
          porcentaje: 0, // Se calculará después
        });
      }

      // Calcular porcentajes
      const desglose = Array.from(municipiosMap.values()).map((municipio) => {
        municipio.tipos = municipio.tipos.map((tipo: any) => ({
          ...tipo,
          porcentaje: parseFloat(((tipo.cantidad / municipio.licenciaTotal) * 100).toFixed(2)),
        }));
        return municipio;
      });

      return {
        tramitesCreados,
        recaudacionTotal: parseFloat(recaudacionTotal.toFixed(2)),
        desglose,
      };
    } catch (error) {
      console.error('Error en getDashboardTramite:', error);
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'Error al obtener estadísticas de trámites',
        'dashboard-002',
      );
    }
  }

  public async getDashboardRevisor(request: getDashboardRevisorReq): Promise<getDashboardRevisorDTO[]> {
    try {
      // Obtener todos los usuarios de tipo Revisor
      const usuarios = await this.usuariosRepository
        .createQueryBuilder('u')
        .innerJoin('cat_usuarios', 'cu', 'u.idtipousuario = cu.id')
        .innerJoin('cat_estatus', 'ce', 'u.idestatus = ce.id')
        .where('cu.usuario = :tipoUsuario', { tipoUsuario: 'Revisor' })
        .select([
          'u.id as id',
          'u.nombres as nombres',
          'u.apellidopaterno as apellidopaterno',
          'u.apellidomaterno as apellidomaterno',
          'u.email as email',
          'u.idestatus as idestatus',
          'ce.estatus as estatus',
        ])
        .getRawMany();

      // Array para almacenar los resultados de cada revisor
      const revisores = [];

      // Para cada revisor, obtener sus revisiones
      for (const usuario of usuarios) {
        // Obtener las revisiones del revisor en el rango de fechas
        const revisiones = await this.revisionesRepository
          .createQueryBuilder('r')
          .innerJoin('cat_estatus', 'ce', 'r.idestatus = ce.id')
          .where('r.idrevisor = :idrevisor', { idrevisor: usuario.id })
          .andWhere('r.creacion BETWEEN :fechaInicio AND :fechaFin', {
            fechaInicio: request.FechaInicio,
            fechaFin: request.FechaFin,
          })
          .select([
            'ce.estatus as estatus',
            'COUNT(*) as cantidad',
          ])
          .groupBy('ce.estatus')
          .getRawMany();

        // Construir el objeto de solicitudes agrupadas por estatus
        const solicitudes: any = {};
        for (const row of revisiones) {
          solicitudes[row.estatus] = parseInt(row.cantidad);
        }

        // Construir nombre completo
        const nombreCompleto = `${usuario.nombres} ${usuario.apellidopaterno}${usuario.apellidomaterno ? ' ' + usuario.apellidomaterno : ''}`.trim();

        revisores.push({
          Nombre: nombreCompleto,
          Correo: usuario.email || '',
          solicitudes: solicitudes,
          idEstatus: usuario.idestatus,
          estatus: usuario.estatus,
        });
      }

      return revisores;
    } catch (error) {
      console.error('Error en getDashboardRevisor:', error);
      throw ManejadorErrores.getDatosVitalesNoCargados(
        'Error al obtener estadísticas de los revisores',
        'dashboard-005',
      );
    }
  }
}
