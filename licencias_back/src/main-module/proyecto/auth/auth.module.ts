import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsuariosRepository } from '@principal/core-module/proyecto/repository/usuarios-repository';
import { UsuariosEntity } from '@principal/core-module/proyecto/models/entities/usuarios-entity';
import { CatEstatusEntity } from '@principal/core-module/proyecto/models/entities/catEstatus-entity';
import { CatCPEntity } from '@principal/core-module/proyecto/models/entities/catCP-entity';
import { CatUsuarioEntity } from '@principal/core-module/proyecto/models/entities/catUsuario-entity';
import { CommonService } from '@principal/core-module/proyecto/utils/common';
import { ParametrosModule } from '@principal/core-module/proyecto/repository/parametros.module';
import { DetalleSesionEntity } from '@principal/core-module/proyecto/models/entities/detalleSesion-entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'LaLluviaÁcidaCubríaMadrid'
    }),
    TypeOrmModule.forFeature([UsuariosEntity, CatEstatusEntity, CatCPEntity, CatUsuarioEntity, DetalleSesionEntity]),
    ParametrosModule,
    
  ],
  providers: [AuthService, JwtStrategy, UsuariosRepository, CommonService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
