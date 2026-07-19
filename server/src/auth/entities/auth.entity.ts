import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { RegistrationStatus, TenantType } from '../enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ nullable: true, unique: true })
  phone!: string;

  @Index({ unique: true })
  @Column({ nullable: true, unique: true })
  email!: string;

  @Column({ nullable: true })
  fullName!: string;

  @Column({ nullable: true, select: false })
  passwordHash?: string; // stays null until Step 4 (set-password)

  @Column({ default: false })
  isVerified!: boolean; // your existing field — set true after OTP step

  @Column({
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.PENDING_PLAN,
  })
  registrationStatus!: RegistrationStatus;

  @Column({ type: 'enum', enum: TenantType, nullable: true })
  intendedTenantType?: TenantType; // set at "choose plan" step, Tenant created at Step 4

  @Column({ default: false })
  isSuperadmin!: boolean; // DB-only, never exposed via any endpoint

  @Column({ default: false })
  isModerator!: boolean; // settable only by an internal admin-only endpoint, guarded by isSuperadmin check

  @Column({ default: false })
  isActive!: boolean; // note: this should probably default TRUE, see note below

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
