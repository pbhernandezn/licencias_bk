import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametrosRepository } from '../repository/parametros-repository';
import { ParametrosEntity } from '../models/entities/parametros-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParametrosEntity])],
  providers: [ParametrosRepository],
  exports: [ParametrosRepository],
})
export class ParametrosModule {}