import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosEntity } from '../models/entities/usuarios-entity';
import { getParametrosDTO } from '../models/from-tables/parametros-dto';
import { ParametrosEntity } from '../models/entities/parametros-entity';


@Injectable()
export class ParametrosRepository {
    constructor(
        @InjectRepository(ParametrosEntity)
        private readonly parametrosRepository: Repository<ParametrosEntity>
    ) { }

    public async getParametros(
        parametro: string
    ): Promise<getParametrosDTO> {
        var response = new getParametrosDTO();
        try {
            const result = await this.parametrosRepository
                .createQueryBuilder('parametros')
                .select('parametros.valor', 'valor')
                .where('UPPER(parametros.parametro) = UPPER(:parametro)', { parametro })
                .getRawOne();

            if (!result) {
                response.encontrado = false;
                return response;
            }
            response.encontrado = true;
            response.parametro = result.valor;
            return response;
        } catch (error) {
                response.encontrado = false;
                return response;
        }
    }

}
