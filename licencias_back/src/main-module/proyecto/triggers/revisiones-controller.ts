import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { BaseResponse } from "@principal/commons-module/proyecto/models/base-response";
import { RevisionesExpose } from "@principal/core-module/proyecto/expose/from-front/revisiones-expose";
import { 
  CreateRevisionRequest, 
  getRevisionByIdDTO, 
  getRevisionByIdReq, 
  getRevisionesBySolicitudReq,
  getRevisionesByRevisorReq,
  getRevisionesDTO,
  UpdateRevisionRequest,
  DeleteRevisionReq
} from "@principal/core-module/proyecto/models/from-tables/revisiones-dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Revisiones')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('/api/revisiones')
export class RevisionesController {
  constructor(
    private readonly revisionesExpose: RevisionesExpose,
  ) {}

  @Get('/revisiones')
  @ApiResponse({ status: 200, description: 'Revisiones encontradas', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getRevisiones(@Request() req): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesExpose.revisiones();
    return respuesta;
  }

  @Post('/revisionById')
  @ApiBody({ type: getRevisionByIdReq })
  @ApiResponse({ status: 200, description: 'Revisión encontrada', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getRevisionById(@Body() request: getRevisionByIdReq, @Request() req): Promise<BaseResponse<getRevisionByIdDTO>> {
    const respuesta = await this.revisionesExpose.revisionById(request);
    return respuesta;
  }

  @Post('/revisionesBySolicitud')
  @ApiBody({ type: getRevisionesBySolicitudReq })
  @ApiResponse({ status: 200, description: 'Revisiones encontradas', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getRevisionesBySolicitud(@Body() request: getRevisionesBySolicitudReq, @Request() req): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesExpose.revisionesBySolicitud(request);
    return respuesta;
  }

  @Post('/revisionesByRevisor')
  @ApiBody({ type: getRevisionesByRevisorReq })
  @ApiResponse({ status: 200, description: 'Revisiones encontradas', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getRevisionesByRevisor(@Body() request: getRevisionesByRevisorReq, @Request() req): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesExpose.revisionesByRevisor(request);
    return respuesta;
  }

  @Post('/createRevision')
  @ApiBody({ type: CreateRevisionRequest })
  @ApiResponse({ status: 200, description: 'Revisión creada.', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createRevision(@Body() request: CreateRevisionRequest, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.revisionesExpose.createRevision(request);
    return respuesta;
  }

  @Post('/updateRevision')
  @ApiBody({ type: UpdateRevisionRequest })
  @ApiResponse({ status: 200, description: 'Revisión actualizada.', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async updateRevision(@Body() request: UpdateRevisionRequest, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.revisionesExpose.updateRevision(request);
    return respuesta;
  }

  @Post('/deleteRevision')
  @ApiBody({ type: DeleteRevisionReq })
  @ApiResponse({ status: 200, description: 'Revisión eliminada.', type: BaseResponse })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async deleteRevision(@Body() request: DeleteRevisionReq, @Request() req): Promise<BaseResponse<void>> {
    const respuesta = await this.revisionesExpose.deleteRevision(request);
    return respuesta;
  }
}
