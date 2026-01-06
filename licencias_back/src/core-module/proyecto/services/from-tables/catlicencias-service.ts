import { Injectable } from '@nestjs/common';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { CatLicenciasRepository } from '../../repository/catLicencias-repository';
import { CatLicenciasDTO } from '../../models/from-tables/catLicencias-dto';


@Injectable()
export class CatLicenciasService {
  constructor(private readonly catLicenciasRepository: CatLicenciasRepository) {}

  public async getCatLicenciasById(idRow: number): Promise<CatLicenciasDTO> {
    return await this.catLicenciasRepository.getCatLicenciasById(idRow);
  }

  public async getCatLicenciasByLicencia(licencia: string): Promise<Wrapper<Array<CatLicenciasDTO>>> {
    return await this.catLicenciasRepository.getCatLicenciasByLicencia(licencia);
  }

  public async createCatLicencias(payload: CatLicenciasDTO): Promise<void> {
    // Reglas aqui
    await this.catLicenciasRepository.saveCatLicencias(payload);
  }

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
