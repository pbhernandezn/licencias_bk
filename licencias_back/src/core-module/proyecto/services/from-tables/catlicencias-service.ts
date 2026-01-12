import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatLicenciasRepository } from '../../repository/catLicencias-repository';
import { CatLicenciasDataDTO, CatLicenciasDTO, getCatLicenciaByIdDTO, getCatLicenciaByIdReq, getLicenciasByLicenciaDTO, getLicenciasByLicenciaReq } from '../../models/from-tables/catLicencias-dto';


@Injectable()
export class CatLicenciasService {
  constructor(private readonly catLicenciasRepository: CatLicenciasRepository) {}

  /**
   * Obtiene los datos de una licencia específica por su ID.
   * @param request - Objeto con el ID de la licencia a buscar
   * @returns Objeto con los datos de la licencia si existe, de lo contrario un objeto con existe: false
   */
  public async getCatLicenciaById(
      request: getCatLicenciaByIdReq
    ): Promise<getCatLicenciaByIdDTO> {
      return await this.catLicenciasRepository.getCatLicenciasById(request);
    }
  
    /**
   * Obtiene las licencias asociadas a un nombre de licencia específico.
   * @param request - Objeto con el nombre de la licencia para buscar las licencias
   * @returns Objeto con las licencias asociadas al nombre de la licencia
   */
    public async getCatLicenciasByLicencia(
      request: getLicenciasByLicenciaReq
    ): Promise<getLicenciasByLicenciaDTO> {
      return await this.catLicenciasRepository.getCatLicenciasByLicencia(request);
    }

    public async getCatLicencias(): Promise<Array<CatLicenciasDataDTO>> {
      return await this.catLicenciasRepository.getCatLicencias();
    }

    /**
   * Crea una nueva licencia en la base de datos.
   * @param payload - Objeto con los datos de la licencia a crear
   */
  public async createCatLicencias(payload: CatLicenciasDTO): Promise<void> {
    // Reglas aqui
    await this.catLicenciasRepository.saveCatLicencias(payload);
  }

  /**
   * Actualiza los datos de una licencia existente.
   * @param id - ID de la licencia a actualizar
   * @param payload - Objeto con los nuevos datos a actualizar
   */
  public async updateCatLicencias(id: number, payload: Partial<CatLicenciasDTO>): Promise<void> {
    // Reglas aqui
    {
      const respuesta = await this.catLicenciasRepository.isExistsCatLicencias(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-B-2a0630a2-e82a-40c0-abeb-bc8b78002bfc',
        );
      }
    }
    await this.catLicenciasRepository.updateCatLicencias(id, payload);
  }

  /**
   * Elimina una licencia de la base de datos.
   * @param id - ID de la licencia a eliminar
   */
  public async deleteCatLicencias(id: number): Promise<void> {
    {
      const respuesta = await this.catLicenciasRepository.isExistsCatLicencias(id);
      if (!respuesta || respuesta === 0) {
        throw ManejadorErrores.getValidacionNoSatisfactoria(
          'el identificador no existe',
          'TYPE-C-8b934e37-1a8b-4920-8600-48eea22ec6b2',
        );
      }
    }
    await this.catLicenciasRepository.deleteCatLicencias(id);
  }
}
