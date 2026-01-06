import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatDocumentosRepository } from '../../repository/catDocumentos-repository';
import { CatDocumentosDataDTO, CatDocumentosDTO, getCatDocumentoByIdDTO, getCatDocumentoByIdReq } from '../../models/from-tables/catDocumentos-dto';


@Injectable()
export class CatDocumentosService {
  constructor(private readonly catDocumentosRepository: CatDocumentosRepository) {}

  public async getCatDocumentos(
      queryParams: QueryParams,
    ): Promise<Array<CatDocumentosDataDTO>> {
      return await this.catDocumentosRepository.getCatDocumentos(queryParams);
    }

    public async getCatDocumentosById(request: getCatDocumentoByIdReq): Promise<getCatDocumentoByIdDTO> {
      return await this.catDocumentosRepository.getCatDocumentosById(request);
    }

  public async createCatDocumentos(payload: CatDocumentosDTO): Promise<void> {
    // Reglas aqui
    await this.catDocumentosRepository.saveCatDocumentos(payload);
  }

  public async updateCatDocumentos(id: number, payload: Partial<CatDocumentosDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catDocumentosRepository.isExistsCatDocumentos(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catDocumentosRepository.updateCatDocumentos(id, payload);
  }

  public async deleteCatDocumentos(id: number): Promise<void> {
    {
      const respuesta = await this.catDocumentosRepository.isExistsCatDocumentos(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catDocumentosRepository.deleteCatDocumentos(id);
  }
}
