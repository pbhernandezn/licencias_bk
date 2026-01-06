import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatDocumentosRepository } from '../../repository/catDocumentos-repository';
import { CatDocumentosDataDTO, CatDocumentosDTO, getCatDocumentoByIdDTO, getCatDocumentoByIdReq } from '../../models/from-tables/catDocumentos-dto';


@Injectable()
export class CatDocumentosService {
  constructor(private readonly catDocumentosRepository: CatDocumentosRepository) {}

  /**
   * Obtiene la lista de todos los documentos del catálogo.
   * @param queryParams - Parámetros de consulta para filtrado y paginación
   * @returns Array con los datos de todos los documentos disponibles
   */
  public async getCatDocumentos(
      queryParams: QueryParams,
    ): Promise<Array<CatDocumentosDataDTO>> {
      return await this.catDocumentosRepository.getCatDocumentos(queryParams);
    }

    /**
   * Obtiene los datos de un documento específico por su ID.
   * @param request - Objeto con el ID del documento a buscar
   * @returns Objeto con los datos del documento si existe, de lo contrario un objeto con existe: false
   */
    public async getCatDocumentosById(request: getCatDocumentoByIdReq): Promise<getCatDocumentoByIdDTO> {
      return await this.catDocumentosRepository.getCatDocumentosById(request);
    }

  /**
   * Crea un nuevo documento en la base de datos.
   * @param payload - Objeto con los datos del documento a crear
   */  
  public async createCatDocumentos(payload: CatDocumentosDTO): Promise<void> {
    // Reglas aqui
    await this.catDocumentosRepository.saveCatDocumentos(payload);
  }

  /**
   * Actualiza los datos de un documento existente.
   * @param id - ID del documento a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   */
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

  /**
   * Elimina un documento de la base de datos.
   * @param id - ID del documento a eliminar
   */
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
