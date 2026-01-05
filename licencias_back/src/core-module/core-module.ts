import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatUsuarioEntity } from './proyecto/models/entities/catUsuario-entity';
import { CatUsuarioRepository } from './proyecto/repository/catUsuario-repository';
import { CatUsuarioService } from './proyecto/services/from-tables/catusuario-service';
import { CatalogoService } from './proyecto/services/from-front/catalogo-services';
import { CatalogoExpose } from './proyecto/expose/from-front/catalogo-expose';
import { CatalogoController } from '../main-module/proyecto/triggers/catalogo-controller';
import { UsuariosController } from '@principal/main-module/proyecto/triggers/usuarios-controller';
import { UsuariosService } from './proyecto/services/from-front/usuarios-service';
import { UsuariosExpose } from './proyecto/expose/from-front/usuarios-expose';
import { UsuariosTService } from './proyecto/services/from-tables/usuarios-service';
import { UsuariosRepository } from './proyecto/repository/usuarios-repository';
import { UsuariosEntity } from './proyecto/models/entities/usuarios-entity';
import { CatEstatusEntity } from './proyecto/models/entities/catEstatus-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatUsuarioEntity, UsuariosEntity, CatEstatusEntity])],
  controllers: [CatalogoController, UsuariosController],
  providers: [
    CatUsuarioRepository,
    CatUsuarioService,
    CatalogoService,
    CatalogoExpose,
    UsuariosRepository,
    UsuariosExpose,
    UsuariosService,
    UsuariosTService,
    UsuariosEntity,
  ],
  exports: [
    CatalogoExpose,
    CatalogoService,
    CatUsuarioService,
    CatUsuarioRepository,
    UsuariosExpose,
    UsuariosService,
    UsuariosTService,
    UsuariosRepository,
    UsuariosEntity,
  ],
})
export class CoreModule {}
