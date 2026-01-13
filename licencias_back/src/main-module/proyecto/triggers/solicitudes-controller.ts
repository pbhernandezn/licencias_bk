import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { SolicitudesExpose } from "@principal/core-module/proyecto/expose/from-front/solicitudes-expose";
import { CreateSolicitudRequest, getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO, UpdateSolicitudRequest } from "@principal/core-module/proyecto/models/from-tables/solicitudes-dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Solicitudes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('/api/solicitudes')
export class SolicitudesController {
  constructor(
    private readonly solicitudesExpose: SolicitudesExpose,
  ) {}

  @Get('/solicitudes')
  @ApiResponse({ status: 200, description: 'Solicitudes encontradas' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getSolicitudes(@Request() req): Promise<BaseResponse<getSolicitudesDTO>> {
    const respuesta = await this.solicitudesExpose.solicitudes();
    return respuesta;
  }

  @Post('/solicitudById')
  @ApiBody({ type: getSolicitudByIdReq })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getSolicitudById(@Body() request: getSolicitudByIdReq, @Request() req): Promise<BaseResponse<getSolicitudByIdDTO>> {
    const respuesta = await this.solicitudesExpose.solicitudById(request);
    return respuesta;
  }

  @Post('/solicitudesByIdUsuario')
  @ApiBody({ type: getSolicitudByIdUsuarioReq })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getSolicitudByIdUsuario(@Body() request: getSolicitudByIdUsuarioReq, @Request() req): Promise<BaseResponse<getSolicitudesDTO>> {
    const respuesta = await this.solicitudesExpose.solicitudesByIdUsuario(request);
    return respuesta;
  }
    
  @Post('/solicitudesByIdTipoLicencia')
  @ApiBody({ type: getSolicitudByIdTipoLicenciaReq })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getSolicitudByIdTipoLicencia(@Body() request: getSolicitudByIdTipoLicenciaReq, @Request() req): Promise<BaseResponse<getSolicitudesDTO>> {
    const respuesta = await this.solicitudesExpose.solicitudesByIdTipoLicencia(request);
    return respuesta;
  }
    
  @Post('/solicitudesByIdEstatus')
  @ApiBody({ type: getSolicitudByIdEstatusReq })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getSolicitudByIdEstatus(@Body() request: getSolicitudByIdEstatusReq, @Request() req): Promise<BaseResponse<getSolicitudesDTO>> {
    const respuesta = await this.solicitudesExpose.solicitudesByIdEstatus(request);
    return respuesta;
  }

  @Post('/createSolicitud')
  @ApiBody({ type: CreateSolicitudRequest })
  @ApiResponse({ status: 200, description: 'Solicitud creada.', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createSolicitud(@Body() request: CreateSolicitudRequest, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.solicitudesExpose.createSolicitud(request);
    return respuesta;
  }

  @Post('/updateSolicitud')
  @ApiBody({ type: UpdateSolicitudRequest })
  @ApiResponse({ status: 200, description: 'Solicitud actualizada.', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async updateSolicitud(@Body() request: UpdateSolicitudRequest, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.solicitudesExpose.updateSolicitud(request);
    return respuesta;
  }

}