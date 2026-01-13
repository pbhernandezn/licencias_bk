import { Injectable } from "@nestjs/common";
import { RevisionesRepository } from "../../repository/revisiones-repository";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";
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
import { RevisionesMapping } from "../../utils/from-tables/revisiones-mapping";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";

@Injectable()
export class RevisionesTService {
  constructor(
    private readonly revisionesRepository: RevisionesRepository
  ) {}

  public async getRevisiones(queryParams: QueryParams): Promise<getRevisionesDTO> {
    return await this.revisionesRepository.getRevisiones(queryParams);
  }

  public async getRevisionById(request: getRevisionByIdReq): Promise<getRevisionByIdDTO> {
    return await this.revisionesRepository.getRevisionById(request);
  }

  public async getRevisionesBySolicitud(request: getRevisionesBySolicitudReq): Promise<getRevisionesDTO> {
    return await this.revisionesRepository.getRevisionesBySolicitud(request);
  }

  public async getRevisionesByRevisor(request: getRevisionesByRevisorReq): Promise<getRevisionesDTO> {
    return await this.revisionesRepository.getRevisionesByRevisor(request);
  }

  public async createRevision(payload: CreateRevisionRequest): Promise<void> {
    try {
      const revision = RevisionesMapping.createRequestToEntity(payload);
      await this.revisionesRepository.saveRevision(revision);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al crear revisión: ${error.message}`,
        'TYPE-D-revisiones-create-001'
      );
    }
  }

  public async updateRevision(payload: UpdateRevisionRequest): Promise<void> {
    try {
      const exists = await this.revisionesRepository.isExistsRevision(payload.id);
      if (!exists || exists === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'La revisión no existe',
          'TYPE-U-revisiones-update-001'
        );
      }

      const updateData = RevisionesMapping.updateRequestToEntity(payload);
      await this.revisionesRepository.updateRevision(payload.id, updateData);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al actualizar revisión: ${error.message}`,
        'TYPE-U-revisiones-update-002'
      );
    }
  }

  public async deleteRevision(request: DeleteRevisionReq): Promise<void> {
    try {
      const exists = await this.revisionesRepository.isExistsRevision(request.id);
      if (!exists || exists === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'La revisión no existe',
          'TYPE-E-revisiones-delete-001'
        );
      }

      await this.revisionesRepository.deleteRevision(request.id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        `Error al eliminar revisión: ${error.message}`,
        'TYPE-E-revisiones-delete-002'
      );
    }
  }
}
