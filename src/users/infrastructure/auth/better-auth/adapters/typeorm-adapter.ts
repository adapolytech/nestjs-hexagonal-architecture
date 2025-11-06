// src/infrastructure/auth/adapters/typeorm-adapter.ts
import { AccountSchema } from 'src/users/infrastructure/persistence/orm/entities/account.entity';
import { SessionSchema } from 'src/users/infrastructure/persistence/orm/entities/session.entity';
import { UserSchema } from 'src/users/infrastructure/persistence/orm/entities/user.entity';
import { VerificationSchema } from 'src/users/infrastructure/persistence/orm/entities/verification.entity';
import { DataSource } from 'typeorm';

export function typeORMAdapter(dataSource: DataSource) {
  return {
    // User operations
    async createUser(data: any) {
      const userRepo = dataSource.getRepository(UserSchema);
      const user = userRepo.create(data);
      return await userRepo.save(user);
    },

    async getUser(userId: string) {
      const userRepo = dataSource.getRepository(UserSchema);
      return await userRepo.findOne({ where: { id: userId } });
    },

    async getUserByEmail(email: string) {
      const userRepo = dataSource.getRepository(UserSchema);
      return await userRepo.findOne({ where: { email } });
    },

    async updateUser(userId: string, data: any) {
      const userRepo = dataSource.getRepository(UserSchema);
      await userRepo.update(userId, data);
      return await userRepo.findOne({ where: { id: userId } });
    },

    async deleteUser(userId: string) {
      const userRepo = dataSource.getRepository(UserSchema);
      await userRepo.delete(userId);
    },

    // Session operations
    async createSession(data: any) {
      const sessionRepo = dataSource.getRepository(SessionSchema);
      const session = sessionRepo.create(data);
      return await sessionRepo.save(session);
    },

    async getSession(token: string) {
      const sessionRepo = dataSource.getRepository(SessionSchema);
      return await sessionRepo.findOne({
        where: { token },
        relations: ['user'],
      });
    },

    async updateSession(sessionId: string, data: any) {
      const sessionRepo = dataSource.getRepository(SessionSchema);
      await sessionRepo.update(sessionId, data);
      return await sessionRepo.findOne({ where: { id: sessionId } });
    },

    async deleteSession(token: string) {
      const sessionRepo = dataSource.getRepository(SessionSchema);
      await sessionRepo.delete({ token });
    },

    async deleteExpiredSessions() {
      const sessionRepo = dataSource.getRepository(SessionSchema);
      await sessionRepo
        .createQueryBuilder()
        .delete()
        .where('expiresAt < :now', { now: new Date() })
        .execute();
    },

    // Account operations (OAuth providers)
    async createAccount(data: any) {
      const accountRepo = dataSource.getRepository(AccountSchema);
      const account = accountRepo.create(data);
      return await accountRepo.save(account);
    },

    async getAccount(providerId: string, accountId: string) {
      const accountRepo = dataSource.getRepository(AccountSchema);
      return await accountRepo.findOne({
        where: { providerId, accountId },
        relations: ['user'],
      });
    },

    async updateAccount(accountId: string, data: any) {
      const accountRepo = dataSource.getRepository(AccountSchema);
      await accountRepo.update(accountId, data);
      return await accountRepo.findOne({ where: { id: accountId } });
    },

    async deleteAccount(providerId: string, accountId: string) {
      const accountRepo = dataSource.getRepository(AccountSchema);
      await accountRepo.delete({ providerId, accountId });
    },

    // Verification operations (email verification, password reset)
    async createVerification(data: any) {
      const verificationRepo = dataSource.getRepository(VerificationSchema);
      const verification = verificationRepo.create(data);
      return await verificationRepo.save(verification);
    },

    async getVerification(identifier: string, value: string) {
      const verificationRepo = dataSource.getRepository(VerificationSchema);
      return await verificationRepo.findOne({
        where: { identifier, value },
      });
    },

    async deleteVerification(identifier: string, value: string) {
      const verificationRepo = dataSource.getRepository(VerificationSchema);
      await verificationRepo.delete({ identifier, value });
    },

    async deleteExpiredVerifications() {
      const verificationRepo = dataSource.getRepository(VerificationSchema);
      await verificationRepo
        .createQueryBuilder()
        .delete()
        .where('expiresAt < :now', { now: new Date() })
        .execute();
    },
  };
}
