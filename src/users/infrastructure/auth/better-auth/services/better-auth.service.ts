import { Injectable } from '@nestjs/common';
import { auth } from './auth.config.service';
import { RegisterDto } from 'src/users/presentation/http/dto/register.dto';
// import { InjectDataSource } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';

@Injectable()
export class BetterAuthService {
  register(body: RegisterDto) {
    return auth.api.signUpEmail({ body });
  }

  verifyEmail(token: string) {
    return auth.api.verifyEmail({ query: { token }, asResponse: false });
  }

  getSession(headers: Headers) {
    return auth.api.getSession({ headers });
  }
}
