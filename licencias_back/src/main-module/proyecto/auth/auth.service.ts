import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isValidEmail } from '@principal/core-module/proyecto/utils/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    if (isValidEmail(username.trim())) {
      return null;
    }

    // TODO: reemplazar por lookup real de usuarios
    const demoUser = {
      id: 1,
      username: 'demo',
      passwordHash: await bcrypt.hash('secret', 10),
    };
    const valid = await bcrypt.compare(password, demoUser.passwordHash);
    if (valid) {
      const { passwordHash, ...result } = demoUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
