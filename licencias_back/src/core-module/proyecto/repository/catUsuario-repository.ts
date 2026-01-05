import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManejadorErrores } from '@principal/commons-module/proyecto/utils/manejador-errores';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { Wrapper } from '@principal/commons-module/proyecto/utils/wrapper';
import { QueryFinder } from '@principal/commons-module/proyecto/utils/query-finder';
import { CatUsuarioEntity } from '../models/entities/catUsuario-entity';
import { CatUsuarioDTO, CatUsuariosDataDTO, getCatUsuarioByIdDTO, getCatUsuarioByIdReq } from '../models/from-tables/catUsuario-dto';
import { CatUsuarioMapping } from '../utils/from-tables/catUsuario-mapping';
import { CatEstatusEntity } from '../models/entities/catEstatus-entity';

@Injectable()
export class CatUsuarioRepository {
  constructor(
    @InjectRepository(CatUsuarioEntity)
    private readonly CatUsuarioRepository: Repository<CatUsuarioEntity>,
    @InjectRepository(CatEstatusEntity)
        private readonly catEstatusRepository: Repository<CatEstatusEntity>,
  ) {}

  public async getCatUsuarios(
    queryParams: QueryParams
  ): Promise<Array<CatUsuariosDataDTO>> {
    try {
      const result: any[] = await this.CatUsuarioRepository
        .createQueryBuilder('cat_usuarios')
        .leftJoin(
          'cat_estatus',
          'estatus',
          'cat_usuarios.idestatus = estatus.id',
        )
        .select([
          'cat_usuarios.id',
          'cat_usuarios.usuario',
          'cat_usuarios.descripcion',
          'cat_usuarios.idestatus',
          'estatus.estatus AS estatus_estatus',
        ])
        .getRawMany();

      if (!result || result.length === 0) return [];

      const usuarios: Array<CatUsuariosDataDTO> = result.map((r) => ({
        id: r['cat_usuarios_id'],
        usuario: r['cat_usuarios_usuario'],
        descripcion: r['cat_usuarios_descripcion'],
        idestatus: r['cat_usuarios_idestatus'],
        estatus: r['estatus_estatus'],
      }));

      return usuarios;
        } catch (error) {
          throw ManejadorErrores.getFallaBaseDatos(
            error.message,
            'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55_cug1',
          );
        }
  }

  public async getCatUsuarioById(
      request: getCatUsuarioByIdReq
    ): Promise<getCatUsuarioByIdDTO> {
      try {
        const result = await this.CatUsuarioRepository
          .createQueryBuilder('cat_usuarios')
          .leftJoin(
            'cat_estatus',
            'estatus',
            'cat_usuarios.idestatus = estatus.id',
          )
          .select([
            'cat_usuarios.id',
            'cat_usuarios.usuario',
            'cat_usuarios.descripcion',
            'cat_usuarios.idestatus',
            'estatus.estatus AS estatus_estatus',
          ])
          .where('cat_usuarios.id = :id', { id: request.id })
          .getRawOne();
  
        const catUsuarioDTO: getCatUsuarioByIdDTO = {
          existe: !!result,
          catUsuario: result
            ? {
                id: result['cat_usuarios_id'],
                usuario: result['cat_usuarios_usuario'],
                descripcion: result['cat_usuarios_descripcion'],
                idestatus: result['cat_usuarios_idestatus'],
                estatus: result['estatus_estatus'],
              }
            : undefined,
        };
  
        console.log(result);
  
        //return new Wrapper(queryParams, 1, [usuarioDTO], true, 'Usuario encontrado', null);
        return catUsuarioDTO;
      } catch (error) {
        throw ManejadorErrores.getFallaBaseDatos(
          error.message,
          'TYPE-A-c6eed039-90ad-40a7-9316-381f5c55cafc',
        );
      }
    }

  
  public async isExistsCatUsuario(idRow: number): Promise<number> {
    try {
      const query = this.CatUsuarioRepository
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

  public async saveCatUsuario(payload: Partial<CatUsuarioDTO>): Promise<void> {
    try {
      const unit = CatUsuarioMapping.dTOToEntity(payload);
      await this.CatUsuarioRepository.save(unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-931140a5-7bd7-49f1-a8b6-5b467cd25fcc',
      );
    }
  }

  public async updateCatUsuario(id: number, payload: Partial<CatUsuarioDTO>): Promise<void> {
    try {
      const unit = CatUsuarioMapping.dTOToEntity(payload);
      await this.CatUsuarioRepository.update(id, unit);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-D-813f1edd-de7c-4e14-b516-1f6045db5690',
      );
    }
  }

  public async deleteCatUsuario(id: number): Promise<void> {
    try {
      await this.CatUsuarioRepository.delete(id);
    } catch (error) {
      throw ManejadorErrores.getFallaBaseDatos(
        error.message,
        'TYPE-E-7b1f24a3-00fd-42b6-a0fd-32b38ff99ebe',
      );
    }
  }
}
