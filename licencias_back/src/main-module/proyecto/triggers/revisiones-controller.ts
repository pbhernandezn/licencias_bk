import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
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

@ApiTags('Revisiones')
@Controller('/api/revisiones')
export class RevisionesController {
  constructor(
    private readonly revisionesExpose: RevisionesExpose,
  ) {}

  @Get('/revisiones')
  @ApiResponse({ status: 200, description: 'Revisiones encontradas', type: BaseResponse })
  async getRevisiones(): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesExpose.revisiones();
    return respuesta;
  }

  @Post('/revisionById')
  @ApiBody({ type: getRevisionByIdReq })
  @ApiResponse({ status: 200, description: 'Revisión encontrada', type: BaseResponse })
  async getRevisionById(@Body() request: getRevisionByIdReq): Promise<BaseResponse<getRevisionByIdDTO>> {
    const respuesta = await this.revisionesExpose.revisionById(request);
    return respuesta;
  }

  @Post('/revisionesBySolicitud')
  @ApiBody({ type: getRevisionesBySolicitudReq })
  @ApiResponse({ status: 200, description: 'Revisiones encontradas', type: BaseResponse })
  async getRevisionesBySolicitud(@Body() request: getRevisionesBySolicitudReq): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesExpose.revisionesBySolicitud(request);
    return respuesta;
  }

  @Post('/revisionesByRevisor')
  @ApiBody({ type: getRevisionesByRevisorReq })
  @ApiResponse({ status: 200, description: 'Revisiones encontradas', type: BaseResponse })
  async getRevisionesByRevisor(@Body() request: getRevisionesByRevisorReq): Promise<BaseResponse<getRevisionesDTO>> {
    const respuesta = await this.revisionesExpose.revisionesByRevisor(request);
    return respuesta;
  }

  @Post('/createRevision')
  @ApiBody({ type: CreateRevisionRequest })
  @ApiResponse({ status: 200, description: 'Revisión creada.', type: BaseResponse })
  async createRevision(@Body() request: CreateRevisionRequest): Promise<BaseResponse<void>> {
    const respuesta = await this.revisionesExpose.createRevision(request);
    return respuesta;
  }

  @Post('/updateRevision')
  @ApiBody({ type: UpdateRevisionRequest })
  @ApiResponse({ status: 200, description: 'Revisión actualizada.', type: BaseResponse })
  async updateRevision(@Body() request: UpdateRevisionRequest): Promise<BaseResponse<void>> {
    const respuesta = await this.revisionesExpose.updateRevision(request);
    return respuesta;
  }

  @Post('/deleteRevision')
  @ApiBody({ type: DeleteRevisionReq })
  @ApiResponse({ status: 200, description: 'Revisión eliminada.', type: BaseResponse })
  async deleteRevision(@Body() request: DeleteRevisionReq): Promise<BaseResponse<void>> {
    const respuesta = await this.revisionesExpose.deleteRevision(request);
    return respuesta;
  }
}
