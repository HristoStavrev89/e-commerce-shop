// src/modules/auth/strategies/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private auth: AuthService) {
    super({ usernameField: 'email' }); // use email instead of username
  }
  async validate(email: string, password: string) {
    return this.auth.validateUser(email, password);
  }
}
