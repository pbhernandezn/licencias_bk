import { Injectable } from "@nestjs/common";
import { SolicitudesRepository } from "../../repository/solicitudes-repository";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";
import { getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO } from "../../models/from-tables/solicitudes-dto";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";

@Injectable()
export class SolicitudesTService {
  constructor(private readonly solicitudesRepository: SolicitudesRepository) {}

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
  
  public async createSolicitud(payload: SolicitudesDTO): Promise<void> {
    // Reglas aqui
    await this.solicitudesRepository.saveSolicitud(payload);
  }
  
  
  public async updateSolicitud(id: number, payload: Partial<SolicitudesDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.solicitudesRepository.isExistsSolicitud(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.solicitudesRepository.updateSolicitud(id, payload);
  }

  
}