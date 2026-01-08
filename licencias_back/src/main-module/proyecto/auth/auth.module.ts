import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { authexpose } from './auth-expose';
import { AuthTService } from './Auth-Service';
import { AuthRepository } from './auth-repository';
import { UsuariosEntity } from '@principal/core-module/proyecto/models/entities/usuarios-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleSesionEntity } from '@principal/core-module/proyecto/models/entities/detalle_sesion-entity';
import { ParametrosEntity } from '@principal/core-module/proyecto/models/entities/ParametrosEntity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'CHANGE_ME',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([
      UsuariosEntity,
      DetalleSesionEntity,
      ParametrosEntity,
    ]), // 🔴 OBLIGATORIO
  ],
  providers: [
    AuthService,
    JwtStrategy,
    authexpose,
    AuthTService,
    AuthRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
