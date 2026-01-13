import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Si hay un error explícito, lo lanzamos (viene del strategy)
    if (err) {
      throw err;
    }
    
    // Si no hay usuario y hay info de error de Passport
    if (!user) {
      if (info?.message) {
        throw new UnauthorizedException(info.message);
      }
      throw new UnauthorizedException('No autorizado');
    }
    
    return user;
  }
}
