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

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'CHANGE_ME',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([UsuariosEntity, CatEstatusEntity, CatCPEntity, CatUsuarioEntity]),
  ],
  providers: [AuthService, JwtStrategy, UsuariosRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
