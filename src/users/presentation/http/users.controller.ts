import { Body, Controller, Get, Headers, Logger, Post } from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { RegisterDto, VerificationEmailDto } from './dto/register.dto';
import { RegisterCommand } from 'src/users/application/commands/register.command';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.usersService.register(
      new RegisterCommand(body.name, body.email, body.password),
    );
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: VerificationEmailDto) {
    this.logger.debug(body);
    return await this.usersService.verifyEmail(body.token);
  }

  @Get('me')
  async me(@Headers() headers: Headers) {
    return await this.usersService.me(headers);
  }
}
