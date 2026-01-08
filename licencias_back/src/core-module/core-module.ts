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
import { CatCPEntity } from './proyecto/models/entities/catCP-entity';
import { CatDocumentosEntity } from './proyecto/models/entities/catDocumentos-entity';
import { CatLicenciasEntity } from './proyecto/models/entities/catLicencias-entity';
import { CatLugaresEntity } from './proyecto/models/entities/catLugares-entity';
import { CatPruebasEntity } from './proyecto/models/entities/catPruebas-entity';
import { CatVigenciaEntity } from './proyecto/models/entities/catVigencia-entity';
import { CatCPRepository } from './proyecto/repository/catCP-repository';
import { CatDocumentosRepository } from './proyecto/repository/catDocumentos-repository';
import { CatEstatusRepository } from './proyecto/repository/catEstatus-repository';
import { CatLicenciasRepository } from './proyecto/repository/catLicencias-repository';
import { CatLugaresRepository } from './proyecto/repository/catLugares-repository';
import { CatPruebasRepository } from './proyecto/repository/catPruebas-repository';
import { CatVigenciaRepository } from './proyecto/repository/catVigencia-repository';
import { CatCPService } from './proyecto/services/from-tables/catcp-service';
import { CatDocumentosService } from './proyecto/services/from-tables/catdocumentos-service';
import { CatEstatusService } from './proyecto/services/from-tables/catestatus-service';
import { CatLicenciasService } from './proyecto/services/from-tables/catlicencias-service';
import { CatLugaresService } from './proyecto/services/from-tables/catlugares-service';
import { CatPruebasService } from './proyecto/services/from-tables/catpruebas-service';
import { CatVigenciaService } from './proyecto/services/from-tables/catvigencia-service';
import { SolicitudesEntity } from './proyecto/models/entities/solicitudes-entity';
import { SolicitudesController } from '@principal/main-module/proyecto/triggers/solicitudes-controller';
import { SolicitudesTService } from './proyecto/services/from-tables/solicitudes-service';
import { SolicitudesExpose } from './proyecto/expose/from-front/solicitudes-expose';
import { SolicitudesRepository } from './proyecto/repository/solicitudes-repository';
import { SolicitudesService } from './proyecto/services/from-front/solicitudes-service';

@Module({
  imports: [TypeOrmModule.forFeature([CatUsuarioEntity, 
    UsuariosEntity, 
    CatEstatusEntity, 
    CatUsuarioEntity,
    CatCPEntity,
    CatDocumentosEntity,
    CatLicenciasEntity,
    CatLugaresEntity,
    CatPruebasEntity,
    CatVigenciaEntity,
    SolicitudesEntity])],
  controllers: [CatalogoController, UsuariosController, SolicitudesController],
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
    CatCPRepository,
    CatDocumentosRepository,
    CatEstatusRepository,
    CatLicenciasRepository,
    CatLugaresRepository,
    CatPruebasRepository,
    CatVigenciaRepository,
    CatCPService,
    CatDocumentosService,
    CatEstatusService,
    CatLicenciasService,
    CatLugaresService,
    CatPruebasService,
    CatVigenciaService,
    SolicitudesRepository,
    SolicitudesTService,
    SolicitudesExpose,
    SolicitudesService,
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
    SolicitudesTService,
    SolicitudesExpose
  ],
})
export class CoreModule {}
