import { Injectable } from '@nestjs/common';
import { RegisterCommand } from './commands/register.command';
import { Email } from '../domain/value-objects/email';
import { BetterAuthService } from '../infrastructure/auth/better-auth/services/better-auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly authService: BetterAuthService) {}

  register(data: RegisterCommand) {
    const email = Email.create(data.email);
    return this.authService.register({
      email: email.getValue(),
      name: data.name,
      password: data.password,
    });
  }

  verifyEmail(token: string) {
    return this.authService.verifyEmail(token);
  }

  async me(headers: Headers) {
    return this.authService.getSession(headers);
  }
}
