import { Injectable, NotFoundException } from "@nestjs/common";
import { SolicitudesRepository } from "../../repository/solicitudes-repository";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";
import { CreateSolicitudRequest, getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO } from "../../models/from-tables/solicitudes-dto";
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
    const respuesta = await this.catLicenciasRepository.isExistsCatLicencias(payload.idtipolicencia);
    console.log('Respuesta de existencia de licencia:', respuesta);
    if (respuesta == 0) {
        
        throw new NotFoundException(
          'el identificador del tipo de licencia no existe. ',
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
    //await this.solicitudesRepository.updateSolicitud(id, payload);
  }

  
}