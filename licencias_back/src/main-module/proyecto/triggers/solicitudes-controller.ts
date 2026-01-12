import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { SolicitudesExpose } from "@principal/core-module/proyecto/expose/from-front/solicitudes-expose";
import { CreateSolicitudRequest, getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO, UpdateSolicitudRequest } from "@principal/core-module/proyecto/models/from-tables/solicitudes-dto";


@Controller('/api/solicitudes')
export class SolicitudesController {
  constructor(
    private readonly solicitudesExpose: SolicitudesExpose,
  ) {}

  @Get('/solicitudes')
    async getSolicitudes(): Promise<BaseResponse<getSolicitudesDTO>> {
      const respuesta = await this.solicitudesExpose.solicitudes();
      return respuesta;
    }

    @Post('/solicitudById')
      @ApiBody({ type: getSolicitudByIdReq })
      @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
        async getSolicitudById(@Body() request: getSolicitudByIdReq): Promise<BaseResponse<getSolicitudByIdDTO>> {
          const respuesta = await this.solicitudesExpose.solicitudById(request);
          return respuesta;
    }

    @Post('/solicitudesByIdUsuario')
    @ApiBody({ type: getSolicitudByIdUsuarioReq })
    @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
    async getSolicitudByIdUsuario(@Body() request: getSolicitudByIdUsuarioReq): Promise<BaseResponse<getSolicitudesDTO>> {
        const respuesta = await this.solicitudesExpose.solicitudesByIdUsuario(request);
        return respuesta;
    }
    
    @Post('/solicitudesByIdTipoLicencia')
    @ApiBody({ type: getSolicitudByIdTipoLicenciaReq })
    @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
    async getSolicitudByIdTipoLicencia(@Body() request: getSolicitudByIdTipoLicenciaReq): Promise<BaseResponse<getSolicitudesDTO>> {
        const respuesta = await this.solicitudesExpose.solicitudesByIdTipoLicencia(request);
        return respuesta;
    }
    
    @Post('/solicitudesByIdEstatus')
    @ApiBody({ type: getSolicitudByIdEstatusReq })
    @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: BaseResponse })
    async getSolicitudByIdEstatus(@Body() request: getSolicitudByIdEstatusReq): Promise<BaseResponse<getSolicitudesDTO>> {
        const respuesta = await this.solicitudesExpose.solicitudesByIdEstatus(request);
        return respuesta;
    }

    @Post('/createSolicitud')
      @ApiBody({ type: CreateSolicitudRequest })
      @ApiResponse({ status: 200, description: 'Solicitud creada.', type: BaseResponse })
      async createSolicitud(@Body() request: CreateSolicitudRequest): Promise<BaseResponse<void>> {
        const respuesta = await this.solicitudesExpose.createSolicitud(request);
        return respuesta;
      }

    @Post('/updateSolicitud')
      @ApiBody({ type: UpdateSolicitudRequest })
      @ApiResponse({ status: 200, description: 'Solicitud actualizada.', type: BaseResponse })
      async updateSolicitud(@Body() request: UpdateSolicitudRequest): Promise<BaseResponse<void>> {
        const respuesta = await this.solicitudesExpose.updateSolicitud(request);
        return respuesta;
      }

}