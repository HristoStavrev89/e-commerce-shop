// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  // called by LocalStrategy
  async validateUser(email: string, password: string) {
    const user = await this.users.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user; // { id, email, role, ... }
  }

  async login(user: { id: number; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwt.signAsync(payload),
      user,
    };
  }
}
