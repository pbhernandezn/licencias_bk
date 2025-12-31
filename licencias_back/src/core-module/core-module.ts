import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatUsuarioEntity } from './proyecto/models/entities/catUsuario-entity';
import { CatUsuarioRepository } from './proyecto/repository/catUsuario-repository';
import { CatUsuarioService } from './proyecto/services/from-tables/catusuario-service';
import { CatalogoService } from './proyecto/services/from-front/catalogo-services';
import { CatalogoExpose } from './proyecto/expose/from-front/catalogo-expose';
import { CatalogoController } from '../main-module/proyecto/triggers/catalogo-controller';

@Module({
  imports: [TypeOrmModule.forFeature([CatUsuarioEntity])],
  controllers: [CatalogoController],
  providers: [CatUsuarioRepository, CatUsuarioService, CatalogoService, CatalogoExpose],
  exports: [CatalogoExpose, CatalogoService, CatUsuarioService, CatUsuarioRepository],
})
export class CoreModule {}
