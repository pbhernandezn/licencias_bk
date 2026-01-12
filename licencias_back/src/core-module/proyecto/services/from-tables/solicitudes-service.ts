import { Injectable, NotFoundException } from "@nestjs/common";
import { SolicitudesRepository } from "../../repository/solicitudes-repository";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";
import { CreateSolicitudRequest, getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO, UpdateSolicitudRequest } from "../../models/from-tables/solicitudes-dto";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";
import { CatLicenciasRepository } from "../../repository/catLicencias-repository";

@Injectable()
export class SolicitudesTService {
  constructor(private readonly solicitudesRepository: SolicitudesRepository,
    private readonly catLicenciasRepository: CatLicenciasRepository
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
    
    if (respuesta !== 0) {
        
        throw new NotFoundException(
          'No es posible guardar, el usuario ya existe con el tipo de licencia. ',
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
    }
    
  }

  
}