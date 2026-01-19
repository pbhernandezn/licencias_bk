import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { DashboardExpose } from '@principal/core-module/proyecto/expose/from-front/dashboard-expose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getDashboardTramiteDTO, getDashboardTramiteReq, getDashboardRevisorDTO, getDashboardRevisorReq } from '@principal/core-module/proyecto/models/from-tables/dashboard-dto';

@ApiTags('Dashboard')
@Controller('/api/dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardExpose: DashboardExpose,
  ) {}

  @Post('/getDashboardTramite')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: getDashboardTramiteReq })
  @ApiResponse({ status: 200, description: 'Estadísticas de trámites obtenidas', type: BaseResponse<getDashboardTramiteDTO> })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getDashboardTramite(@Body() request: getDashboardTramiteReq, @Request() req): Promise<BaseResponse<getDashboardTramiteDTO>> {
    const respuesta = await this.dashboardExpose.getDashboardTramite(request);
    return respuesta;
  }

  @Post('/getDashboardRevisor')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: getDashboardRevisorReq })
  @ApiResponse({ status: 200, description: 'Estadísticas del revisor obtenidas', type: BaseResponse<getDashboardRevisorDTO> })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getDashboardRevisor(@Body() request: getDashboardRevisorReq, @Request() req): Promise<BaseResponse<getDashboardRevisorDTO>> {
    const respuesta = await this.dashboardExpose.getDashboardRevisor(request);
    return respuesta;
  }
}
