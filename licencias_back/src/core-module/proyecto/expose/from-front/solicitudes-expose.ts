import { Injectable } from "@nestjs/common";
import { SolicitudesService } from "../../services/from-front/solicitudes-service";
import { getLocalidadesByCPDTO } from "../../models/from-tables/catCP-dto";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { INTERNAL_CODES, INTERNAL_MESSAGES, RESPONSE_CODES } from "@principal/commons-module/proyecto/utils/messages-enum";
import { getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO } from "../../models/from-tables/solicitudes-dto";

@Injectable()
export class SolicitudesExpose {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  public async solicitudes(): Promise<BaseResponse<getSolicitudesDTO>> {
      const respuesta = await this.solicitudesService.getSolicitudes();
      const resultado = new BaseResponse<getSolicitudesDTO>();
      resultado.code = RESPONSE_CODES.SUCCESFULL;
      resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
      resultado.data = respuesta;
      return resultado;
    }
  
    
    public async solicitudById(
      request: getSolicitudByIdReq,
    ): Promise<BaseResponse<getSolicitudByIdDTO>> {
      const respuesta = await this.solicitudesService.getSolicitudById(request);
      const resultado = new BaseResponse<getSolicitudByIdDTO>();
      resultado.code = RESPONSE_CODES.SUCCESFULL;
      resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
      resultado.data = respuesta;
      return resultado;
    }

    public async solicitudesByIdUsuario(request: getSolicitudByIdUsuarioReq,): Promise<BaseResponse<getSolicitudesDTO>> {
      const respuesta = await this.solicitudesService.getSolicitudesByIdUsuario(request);
      const resultado = new BaseResponse<getSolicitudesDTO>();
      resultado.code = RESPONSE_CODES.SUCCESFULL;
      resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
      resultado.data = respuesta;
      return resultado;
    }

    public async solicitudesByIdTipoLicencia(request: getSolicitudByIdTipoLicenciaReq,): Promise<BaseResponse<getSolicitudesDTO>> {
      const respuesta = await this.solicitudesService.getSolicitudesByIdTipoLicencia(request);
      const resultado = new BaseResponse<getSolicitudesDTO>();
      resultado.code = RESPONSE_CODES.SUCCESFULL;
      resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
      resultado.data = respuesta;
      return resultado;
    }

    public async solicitudesByIdEstatus(request: getSolicitudByIdEstatusReq,): Promise<BaseResponse<getSolicitudesDTO>> {
      const respuesta = await this.solicitudesService.getSolicitudesByIdEstatus(request);
      const resultado = new BaseResponse<getSolicitudesDTO>();
      resultado.code = RESPONSE_CODES.SUCCESFULL;
      resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
      resultado.data = respuesta;
      return resultado;
    }

    public async createSolicitud(payload: SolicitudesDTO): Promise<BaseResponse<void>> {
      const respuesta = await this.solicitudesService.createSolicitud(payload);
      const resultado = new BaseResponse<void>();
      resultado.code = RESPONSE_CODES.SUCCESFULL;
       resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
      resultado.data = respuesta;
      return resultado;
    }

    public async updateSolicitud(id: number, payload: Partial<SolicitudesDTO>): Promise<BaseResponse<void>> {
      const respuesta = await this.solicitudesService.updateSolicitud(id,payload);
      const resultado = new BaseResponse<void>();
      resultado.code = RESPONSE_CODES.SUCCESFULL;
       resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
      resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
      resultado.data = respuesta;
      return resultado;
    }

}