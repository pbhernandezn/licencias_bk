import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuariosRepository } from '@principal/core-module/proyecto/repository/usuarios-repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usuariosRepository: UsuariosRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    
    if (!secret) {
      console.error('❌ JWT_SECRET no está configurado en JwtStrategy');
      throw new Error('JWT_SECRET es requerido');
    }
    
    console.log('✅ JwtStrategy configurado con secret desde .env');
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    try {
      console.log('🔐 JWT Validation START');
      console.log('Payload:', JSON.stringify(payload));
      
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('❌ Token no proporcionado o formato inválido');
        throw new UnauthorizedException('Token no proporcionado o formato inválido');
      }

      const token = authHeader.split(' ')[1];
      console.log('✅ Token extraído');

      // Verify token signature
      try {
        this.jwtService.verify(token);
        console.log('✅ Token signature válida');
      } catch (error) {
        console.log('❌ Token inválido o expirado:', error.message);
        throw new UnauthorizedException('Token inválido o expirado');
      }

      // Validate user exists and get user data
      console.log(`🔍 Buscando usuario ID: ${payload.aData}`);
      const usuario = await this.usuariosRepository.getUsuarioById({ id: payload.aData });
      console.log('Usuario encontrado:', JSON.stringify(usuario));
      
      if (!usuario.existe || !usuario.usuario) {
        console.log('❌ Usuario no encontrado');
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Check if user is active
      console.log(`Usuario estatus: ${usuario.usuario.estatus}`);
      if (usuario.usuario.estatus !== 'Activo') {
        console.log(`❌ Usuario ${usuario.usuario.estatus}`);
        throw new UnauthorizedException(`Usuario ${usuario.usuario.estatus}`);
      }
      console.log('✅ Usuario activo');

      // Validate token belongs to an active session
      console.log('🔍 Consultando sesiones recientes...');
      const sesiones = await this.usuariosRepository.getSesionesRecientes(payload.aData);
      console.log(`Sesiones encontradas: ${sesiones.length}`, JSON.stringify(sesiones));
      
      const sesionActiva = sesiones.find(
        s => s.exitoso === true && s.estatus === 'Abierta' && s.token === token
      );

      if (!sesionActiva) {
        console.log('❌ Sesión inválida o cerrada');
        throw new UnauthorizedException('Sesión inválida o cerrada');
      }
      console.log('✅ Sesión activa encontrada:', JSON.stringify(sesionActiva));

      console.log('🎉 JWT Validation SUCCESS');
      // Return complete user data for req.user
      return {
        userId: payload.aData,
        username: payload.username,
        rol: payload.rol,
        perfil: payload.perfil,
        email: usuario.usuario.email,
        nombres: usuario.usuario.nombres,
        apellidopaterno: usuario.usuario.apellidopaterno,
        apellidomaterno: usuario.usuario.apellidomaterno,
        token: token,
        sesionId: sesionActiva.detalle_sesion_id,
      };
    } catch (error) {
      console.log('💥 JWT Validation ERROR:', error.message);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Error al validar token');
    }
  }
}
