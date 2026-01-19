import { Injectable } from '@nestjs/common';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import {
  RESPONSE_CODES,
  INTERNAL_CODES,
  INTERNAL_MESSAGES,
} from '@principal/commons-module/proyecto/utils/messages-enum';
import { DashboardService } from '../../services/from-front/dashboard-service';
import { getDashboardTramiteDTO, getDashboardTramiteReq, getDashboardRevisorDTO, getDashboardRevisorReq } from '../../models/from-tables/dashboard-dto';

@Injectable()
export class DashboardExpose {
  constructor(private readonly dashboardService: DashboardService) {}

  async getDashboardData(): Promise<BaseResponse<any>> {
    const respuesta = await this.dashboardService.getDashboardData();
    const resultado = new BaseResponse<any>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async getDashboardTramite(request: getDashboardTramiteReq): Promise<BaseResponse<getDashboardTramiteDTO>> {
    const respuesta = await this.dashboardService.getDashboardTramite(request);
    const resultado = new BaseResponse<getDashboardTramiteDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }

  async getDashboardRevisor(request: getDashboardRevisorReq): Promise<BaseResponse<getDashboardRevisorDTO>> {
    const respuesta = await this.dashboardService.getDashboardRevisor(request);
    const resultado = new BaseResponse<getDashboardRevisorDTO>();
    resultado.code = RESPONSE_CODES.SUCCESFULL;
    resultado.internalCode = INTERNAL_CODES.SUCCESFULL;
    resultado.message = INTERNAL_MESSAGES.SUCCESFULL;
    resultado.data = respuesta;
    return resultado;
  }
}
