import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatDocumentosEntity } from '../models/entities/catDocumentos-entity';
import { CatDocumentosDataDTO, CatDocumentosDTO, getCatDocumentoByIdDTO, getCatDocumentoByIdReq } from '../models/from-tables/catDocumentos-dto';
import { CatDocumentosMapping } from '../utils/from-tables/catDocumentos-mapping';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';

@Injectable()
export class CatDocumentosRepository {
  constructor(
    @InjectRepository(CatDocumentosEntity)
    private readonly repository: Repository<CatDocumentosEntity>,
    @InjectRepository(CatEstatusEntity)
    private readonly catEstatusRepository: Repository<CatEstatusEntity>,
  ) {}

  public async getCatDocumentos(
      queryParams: QueryParams
    ): Promise<Array<CatDocumentosDataDTO>> {
      try {
        const result: any[] = await this.repository
          .createQueryBuilder('cat_documentos')
          .leftJoin(
            'cat_estatus',
            'estatus',
            'estatus.tabla = :tabla AND cat_documentos.idestatus = estatus.id',
            { tabla: 'cat_documentos' },
          )
          .select([
            'cat_documentos.id',
            'cat_documentos.documento',
            'cat_documentos.descripcion',
            'cat_documentos.idestatus',
            'estatus.estatus AS estatus_estatus',
          ])
          .getRawMany();
  
        if (!result || result.length === 0) return [];
  
        const documentos: Array<CatDocumentosDataDTO> = result.map((r) => ({
          id: r['cat_documentos_id'],
          documento: r['cat_documentos_documento'],
          descripcion: r['cat_documentos_descripcion'],
          idestatus: r['cat_documentos_idestatus'],
          estatus: r['estatus_estatus'],
        }));
  
        return documentos;
          } catch (error) {
            throw ManejadorErrores.getFallaBaseDatos(
              error.message,
              'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cdo1',
            );
          }
    }
  
    public async getCatDocumentosById(
        request: getCatDocumentoByIdReq
      ): Promise<getCatDocumentoByIdDTO> {
        try {
          const result = await this.repository
            .createQueryBuilder('cat_documentos')
            .leftJoin(
              'cat_estatus',
              'estatus',
              'estatus.tabla = :tabla AND cat_documentos.idestatus = estatus.id',
               { tabla: 'cat_documentos' },
            )
            .select([
              'cat_documentos.id',
              'cat_documentos.documento',
              'cat_documentos.descripcion',
              'cat_documentos.idestatus',
              'estatus.estatus AS estatus_estatus',
            ])
            .where('cat_documentos.id = :id', { id: request.id })
            .getRawOne();
    
          const catDocumentosDTO: getCatDocumentoByIdDTO = {
            existe: !!result,
            catDocumentos: result
              ? {
                  id: result['cat_documentos_id'],
                  documento: result['cat_documentos_documento'],
                  descripcion: result['cat_documentos_descripcion'],
                  idestatus: result['cat_documentos_idestatus'],
                  estatus: result['estatus_estatus'],
                }
              : undefined,
          };
    
          return catDocumentosDTO;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c5_cdo2',
          );
        }
      }

  
  public async isExistsCatDocumentos(idRow: number): Promise<number> {
    try {
      const query = this.repository
        .createQueryBuilder()
        .select('count(*)', 'cuenta')
        .where('id = :idRow', { idRow });
      const unit: any = await query.getRawMany();
      if (!unit) return null;
      return unit[0].cuenta;
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-C-1f355201-aa52-4f57-94a6-53892d6d4a20',
      );
    }
  }

  public async saveCatDocumentos(payload: Partial<CatDocumentosDTO>): Promise<void> {
    try {
      const unit = CatDocumentosMapping.dTOToEntity(payload);
      await this.repository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  public async updateCatDocumentos(id: number, payload: Partial<CatDocumentosDTO>): Promise<void> {
    try {
      const unit = CatDocumentosMapping.dTOToEntity(payload);
      await this.repository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  public async deleteCatDocumentos(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-E-7b1f24a3-00fd-42b6-a0fd-32b38ff99ebe',
      );
    }
  }
}
