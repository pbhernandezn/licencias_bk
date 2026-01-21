import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
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
import { FaceController } from '@principal/main-module/proyecto/triggers/face-controller';
import { SolicitudesEntity } from './proyecto/models/entities/solicitudes-entity';
import { SolicitudesController } from '@principal/main-module/proyecto/triggers/solicitudes-controller';
import { SolicitudesTService } from './proyecto/services/from-tables/solicitudes-service';
import { SolicitudesExpose } from './proyecto/expose/from-front/solicitudes-expose';
import { SolicitudesRepository } from './proyecto/repository/solicitudes-repository';
import { SolicitudesService } from './proyecto/services/from-front/solicitudes-service';
import { DocumentosEntity } from './proyecto/models/entities/documentos-entity';
import { DocumentosRepository } from './proyecto/repository/documentos-repository';
import { DocumentosTService } from './proyecto/services/from-tables/documentos-service';
import { DocumentosService } from './proyecto/services/from-front/documentos-service';
import { DocumentosExpose } from './proyecto/expose/from-front/documentos-expose';
import { DocumentosController } from '@principal/main-module/proyecto/triggers/documentos-controller';
import { AzureBlobService } from './proyecto/services/from-tables/azure-blob-service';
import { CommonModule } from './proyecto/utils/common.module';
import { DetalleSesionEntity } from './proyecto/models/entities/detalleSesion-entity';
import { RevisionesEntity } from './proyecto/models/entities/revisiones-entity';
import { RevisionesRepository } from './proyecto/repository/revisiones-repository';
import { RevisionesTService } from './proyecto/services/from-tables/revisiones-service';
import { RevisionesService } from './proyecto/services/from-front/revisiones-service';
import { RevisionesExpose } from './proyecto/expose/from-front/revisiones-expose';
import { RevisionesController } from '@principal/main-module/proyecto/triggers/revisiones-controller';
import { RevisionesDocumentosEntity } from './proyecto/models/entities/revisiones-documentos-entity';
import { RevisionesDocumentosRepository } from './proyecto/repository/revisiones-documentos-repository';
import { RevisionesDocumentosTService } from './proyecto/services/from-tables/revisiones-documentos-service';
import { RevisionesDocumentosService } from './proyecto/services/from-front/revisiones-documentos-service';
import { RevisionesDocumentosExpose } from './proyecto/expose/from-front/revisiones-documentos-expose';
import { RevisionesDocumentosController } from '@principal/main-module/proyecto/triggers/revisiones-documentos-controller';
import { PreguntasExamenEntity } from './proyecto/models/entities/preguntas-examen-entity';
import { IntentosExamenEntity } from './proyecto/models/entities/intentos-examen-entity';
import { RespuestasUsuarioEntity } from './proyecto/models/entities/respuestas-usuario-entity';
import { ExamenesRepository } from './proyecto/repository/examenes-repository';
import { PruebasRepository } from './proyecto/repository/pruebas-repository';
import { ExamenesService } from './proyecto/services/from-tables/examenes-service';
import { PruebasFisicasService } from './proyecto/services/from-tables/pruebas-fisicas-service';
import { PruebasController } from './proyecto/expose/from-front/pruebas-controller';
import { PruebasEntity } from './proyecto/models/entities/pruebas-entity';
import { DashboardService } from './proyecto/services/from-front/dashboard-service';
import { DashboardExpose } from './proyecto/expose/from-front/dashboard-expose';
import { DashboardController } from '@principal/main-module/proyecto/triggers/dashboard-controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
	CatUsuarioEntity, 
    UsuariosEntity, 
    CatEstatusEntity, 
    CatUsuarioEntity,
    CatCPEntity,
    CatDocumentosEntity,
    CatLicenciasEntity,
    CatLugaresEntity,
    CatPruebasEntity,
    CatVigenciaEntity,
    SolicitudesEntity,
    DocumentosEntity,
    DetalleSesionEntity,
    RevisionesEntity,
    RevisionesDocumentosEntity,
    PreguntasExamenEntity,
    IntentosExamenEntity,
    RespuestasUsuarioEntity,
    PruebasEntity
  ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'CHANGE_ME',
      signOptions: { expiresIn: '1h' },
    }),
    CommonModule,
  ],
  controllers: [CatalogoController, UsuariosController, SolicitudesController, FaceController, DocumentosController, RevisionesController, RevisionesDocumentosController, PruebasController, DashboardController],
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
    DocumentosRepository,
    DocumentosTService,
    DocumentosService,
    DocumentosExpose,
    AzureBlobService,
    RevisionesRepository,
    RevisionesTService,
    RevisionesService,
    RevisionesExpose,
    RevisionesDocumentosRepository,
    RevisionesDocumentosTService,
    RevisionesDocumentosService,
    RevisionesDocumentosExpose,
    ExamenesRepository,
    PruebasRepository,
    ExamenesService,
    PruebasFisicasService,
    DashboardService,
    DashboardExpose,
  ],
  exports: [
    CatalogoExpose,
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
    DocumentosRepository,
    DocumentosTService,
    DocumentosService,
    DocumentosExpose,
    AzureBlobService,
    RevisionesRepository,
    RevisionesTService,
    RevisionesService,
    RevisionesExpose,
    RevisionesDocumentosRepository,
    RevisionesDocumentosTService,
    RevisionesDocumentosService,
    RevisionesDocumentosExpose,
    DashboardService,
    DashboardExpose,
  ],
})
export class CoreModule {}
