import { Injectable } from "@nestjs/common";
import { RevisionesTService } from "../from-tables/revisiones-service";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";
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
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";

@Injectable()
export class RevisionesService {
  constructor(
    private readonly revisionesTService: RevisionesTService,
  ) {}

  public async getRevisiones(): Promise<getRevisionesDTO> {
    const queryParams = new QueryParams();
    const respuesta = await this.revisionesTService.getRevisiones(queryParams);
    if (!respuesta.revisionesData || respuesta.revisionesData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron revisiones.',
        'TYPE-A-revisiones-service-001',
      );
    }
    return respuesta;
  }

  public async getRevisionById(request: getRevisionByIdReq): Promise<getRevisionByIdDTO> {
    const respuesta = await this.revisionesTService.getRevisionById(request);
    if (!respuesta.existe) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontró la revisión.',
        'TYPE-A-revisiones-service-002',
      );
    }
    return respuesta;
  }

  public async getRevisionesBySolicitud(request: getRevisionesBySolicitudReq): Promise<getRevisionesDTO> {
    const respuesta = await this.revisionesTService.getRevisionesBySolicitud(request);
    if (!respuesta.revisionesData || respuesta.revisionesData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron revisiones para la solicitud.',
        'TYPE-A-revisiones-service-003',
      );
    }
    return respuesta;
  }

  public async getRevisionesByRevisor(request: getRevisionesByRevisorReq): Promise<getRevisionesDTO> {
    const respuesta = await this.revisionesTService.getRevisionesByRevisor(request);
    if (!respuesta.revisionesData || respuesta.revisionesData.length === 0) {
      throw ManejadorErrores.getBusquedaVacia(
        'No se encontraron revisiones para el revisor.',
        'TYPE-A-revisiones-service-004',
      );
    }
    return respuesta;
  }

  public async createRevision(payload: CreateRevisionRequest): Promise<void> {
    await this.revisionesTService.createRevision(payload);
  }

  public async updateRevision(payload: UpdateRevisionRequest): Promise<void> {
    await this.revisionesTService.updateRevision(payload);
  }

  public async deleteRevision(request: DeleteRevisionReq): Promise<void> {
    await this.revisionesTService.deleteRevision(request);
  }
}
