import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presentation/http/users.controller';
import { BetterAuthModule } from '../infrastructure/auth/better-auth/better-auth.module';

@Module({
  imports: [BetterAuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
