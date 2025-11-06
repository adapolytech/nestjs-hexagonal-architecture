import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema } from './persistence/orm/entities/account.entity';
import { UserSchema } from './persistence/orm/entities/user.entity';
import { SessionSchema } from './persistence/orm/entities/session.entity';
import { VerificationSchema } from './persistence/orm/entities/verification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountSchema,
      UserSchema,
      SessionSchema,
      VerificationSchema,
    ]),
  ],
})
export class UsersPersistenceModule {}
