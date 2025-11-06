import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserSchema } from './user.entity';

@Entity('account')
export class AccountSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  accountId: string;

  @Column()
  providerId: string; // google, github, etc.

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  accessTokenExpiresAt: Date;

  @Column({ nullable: true })
  refreshTokenExpiresAt: Date;

  @Column({ nullable: true })
  scope: string;

  @ManyToOne(() => UserSchema, (user): AccountSchema[] => user.accounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserSchema;
}
