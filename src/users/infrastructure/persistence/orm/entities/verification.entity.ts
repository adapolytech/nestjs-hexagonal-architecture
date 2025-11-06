// src/infrastructure/persistence/typeorm/entities/verification.schema.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('verification')
export class VerificationSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identifier: string; // email

  @Column()
  value: string; // token

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
