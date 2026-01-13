import { Injectable } from "@nestjs/common";
import { RevisionesService } from "../../services/from-front/revisiones-service";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { INTERNAL_CODES, INTERNAL_MESSAGES, RESPONSE_CODES } from "@principal/commons-module/proyecto/utils/messages-enum";
import { 
  CreateRevisionRequest, 
  getRevisionByIdDTO, 
  getRevisionByIdReq, 
  getRevisionesBySolicitudReq,
  getRevisionesByRevisorReq,
  getRevisionesDTO,
  UpdateRevisionRequest,
  DeleteRevisionReq
} from "../../models/from-tables/revisiones-dto";

@Injectable()
export class RevisionesExpose {
  constructor(private readonly revisionesService: RevisionesService) {}

  public async revisiones(): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesService.getRevisiones();
    const resultado = new BaseResponse<getRevisionesDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async revisionById(request: getRevisionByIdReq): Promise<BaseResponse<getRevisionByIdDTO>> {
    const respuesta = await this.revisionesService.getRevisionById(request);
    const resultado = new BaseResponse<getRevisionByIdDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async revisionesBySolicitud(request: getRevisionesBySolicitudReq): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesService.getRevisionesBySolicitud(request);
    const resultado = new BaseResponse<getRevisionesDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async revisionesByRevisor(request: getRevisionesByRevisorReq): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesService.getRevisionesByRevisor(request);
    const resultado = new BaseResponse<getRevisionesDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  public async createRevision(payload: CreateRevisionRequest): Promise<BaseResponse<void>> {
    await this.revisionesService.createRevision(payload);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Revisión creada exitosamente';
    return resultado;
  }

  public async updateRevision(payload: UpdateRevisionRequest): Promise<BaseResponse<void>> {
    await this.revisionesService.updateRevision(payload);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Revisión actualizada exitosamente';
    return resultado;
  }

  public async deleteRevision(request: DeleteRevisionReq): Promise<BaseResponse<void>> {
    await this.revisionesService.deleteRevision(request);
    const resultado = new BaseResponse<void>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = 'Revisión eliminada exitosamente';
    return resultado;
  }
}
