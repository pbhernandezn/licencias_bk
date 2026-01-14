import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { SesionesRepository } from '@principal/core-module/proyecto/repository/sesiones-repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRATION', '36000s');
        
        if (!secret) {
          console.error('❌ ERROR: JWT_SECRET no está definido en las variables de entorno');
          throw new Error('JWT_SECRET es requerido para la autenticación');
        }
        
        console.log('✅ JWT Module configurado correctamente');
        console.log(`   - Secret: ${secret.substring(0, 10)}... (oculto)`);
        console.log(`   - Expiration: ${expiresIn}`);
        
        return {
          secret: secret,
          signOptions: { 
            expiresIn: expiresIn as any,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UsuariosEntity, CatEstatusEntity, CatCPEntity, CatUsuarioEntity, DetalleSesionEntity]),
    ParametrosModule,
    
  ],
  providers: [AuthService, CommonService, JwtStrategy, UsuariosRepository, CommonService, SesionesRepository],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule { }
