import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SessionSchema } from './session.entity';
import { AccountSchema } from './account.entity';

@Entity('user')
export class UserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  emailVerified: boolean;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SessionSchema, (session) => session.user)
  sessions: SessionSchema[];

  @OneToMany(() => AccountSchema, (account) => account.user)
  accounts: AccountSchema[];
}
