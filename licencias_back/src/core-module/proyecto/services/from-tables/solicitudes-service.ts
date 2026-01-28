import { Injectable, NotFoundException } from "@nestjs/common";
import { SolicitudesRepository } from "../../repository/solicitudes-repository";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";
import { CreateSolicitudRequest, getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO, UpdateSolicitudRequest } from "../../models/from-tables/solicitudes-dto";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";
import { CatLicenciasRepository } from "../../repository/catLicencias-repository";
import { randomUUID } from "crypto";
import { getCatLicenciaByIdReq } from "../../models/from-tables/catLicencias-dto";
import { EmailNotificationsService } from "../from-front/email-notifications-service";
import { UsuariosTService } from "./usuarios-service";

@Injectable()
export class SolicitudesTService {
  constructor(
    private readonly solicitudesRepository: SolicitudesRepository,
    private readonly catLicenciasRepository: CatLicenciasRepository,
    private readonly emailNotificationsService: EmailNotificationsService,
    private readonly usuariosTService: UsuariosTService,
  ) {}

  public async getSolicitudes(
    queryParams: QueryParams,
  ): Promise<getSolicitudesDTO> {
    return await this.solicitudesRepository.getSolicitudes(queryParams);
  }
  
  public async getSolicitudById(
    request: getSolicitudByIdReq
  ): Promise<getSolicitudByIdDTO> {
    return await this.solicitudesRepository.getSolicitudById(request);
  }

  public async getSolicitudesByIdUsuario(
    request: getSolicitudByIdUsuarioReq
  ): Promise<getSolicitudesDTO> {
    return await this.solicitudesRepository.getSolicitudesByIdUsuario(request);
  }

  public async getSolicitudesByIdTipoLicencia(
    request: getSolicitudByIdTipoLicenciaReq
  ): Promise<getSolicitudesDTO> {
    return await this.solicitudesRepository.getSolicitudesByIdTipoLicencia(request);
  }

  public async getSolicitudesByIdEstatus(
    request: getSolicitudByIdEstatusReq
  ): Promise<getSolicitudesDTO> {
    return await this.solicitudesRepository.getSolicitudesByIdEstatus(request);
  }
  
  public async createSolicitud(payload: CreateSolicitudRequest): Promise<void> {
    // Reglas aqui
    try
    {
    const respuesta = await this.solicitudesRepository.isExistsSolicitudByUsuarioTipoLicencia(payload.idusuario, payload.idtipolicencia);
    const respuesta2 = await this.catLicenciasRepository.isExistsCatLicencias(payload.idtipolicencia);
    
    if (respuesta > 0) {
        
        throw new NotFoundException(
          'No es posible guardar, el usuario ya tiene una solicitud activa con este tipo de licencia. ',
        );
      }
    if (respuesta2 == 0) {
        
        throw new NotFoundException(
          'El identificador del tipo de licencia no existe. ',
        );
      }
      await this.solicitudesRepository.saveSolicitud(payload);
    } 
    catch (error)
    {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          error.message,
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bf1',
        );
    }
    //
  }
  
  
  public async updateSolicitud(payload: UpdateSolicitudRequest): Promise<void> {
    
    {
      const request: getSolicitudByIdReq = {id: payload.idsolicitud};
      const respuesta = await this.getSolicitudById(request);
      if (!respuesta.existe) {
          throw new NotFoundException(
            'La solicitud no existe. ',
          );
      }

      //Si la revisi�n de la solicitud es aceptada
      //El estatus de la solicitud se cambiara a aceptada
      if(payload.idestatus==24) {//Este n�mero 22 corresponde al identificador de la tabla de cat_estatus
        const requestLicencia: getCatLicenciaByIdReq = {id: respuesta.solicitudData.idtipolicencia};
        const consultaLicencia = await this.catLicenciasRepository.getCatLicenciasById(requestLicencia);

        const numLicencia=this.generarNumeroLicencia();
        const fechaExpedicion=this.fechaExpedicionActual();
        const fechaVigencia=this.calcularVigencia(fechaExpedicion,consultaLicencia.catLicencia.anios);

        respuesta.solicitudData.numerolicencia = numLicencia;
        respuesta.solicitudData.expedicion = fechaExpedicion.toDateString(),
        respuesta.solicitudData.vigencia = fechaVigencia.toDateString();
      }
      

      const solicitudToUpdate: SolicitudesDTO = {
        id:respuesta.solicitudData.id,
        idusuario: respuesta.solicitudData.idusuario,
        creacion: respuesta.solicitudData.creacion,
        modificacion: respuesta.solicitudData.modificacion,
        idtipolicencia: respuesta.solicitudData.idtipolicencia,
        numerolicencia: respuesta.solicitudData.numerolicencia,
        expedicion: respuesta.solicitudData.expedicion,
        vigencia: respuesta.solicitudData.vigencia,
        idestatus: payload.idestatus,
        idmetodopago: respuesta.solicitudData.idmetodopago,
      };
      await this.solicitudesRepository.updateSolicitud(payload.idsolicitud, solicitudToUpdate);

      // Enviar notificación por email si el estatus cambia a 22
      if (payload.idestatus === 22) {
        try {
          // Obtener información del usuario
          const usuarioData = await this.usuariosTService.getUsuariosById({ id: respuesta.solicitudData.idusuario });
          
          if (usuarioData && usuarioData.usuario && usuarioData.usuario.email) {
            // Obtener información de la licencia
            const licencia = await this.catLicenciasRepository.getCatLicenciasById({ 
              id: respuesta.solicitudData.idtipolicencia 
            });
            
            const nombreCompleto = `${usuarioData.usuario.nombres} ${usuarioData.usuario.apellidopaterno} ${usuarioData.usuario.apellidomaterno || ''}`.trim();
            const tipoLicencia = licencia?.catLicencia?.licencia || 'Licencia';
            
            await this.emailNotificationsService.notificarSolicitudCreada(
              usuarioData.usuario.email,
              nombreCompleto,
              respuesta.solicitudData.id,
              tipoLicencia,
            );
          }
        } catch (emailError) {
          // No lanzar error si falla el email, solo log
          console.error('Error al enviar notificación de solicitud con estatus 22:', emailError);
        }
      }
    }
    
  }

  private generarNumeroLicencia(): string {
    // Ejemplo: LIC-2026-A3F9C2
    const uuid = randomUUID().split('-')[0].toUpperCase();
    const year = new Date().getFullYear();

    return `LIC-${year}-${uuid}`;
  }

  private fechaExpedicionActual(): Date {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // evita problemas de hora
    return hoy;
  }
  
  private calcularVigencia(expedicion: Date, aniosVigencia: number): Date {
    const vigencia = new Date(expedicion);
    vigencia.setFullYear(vigencia.getFullYear() + aniosVigencia);
    return vigencia;
  }
}