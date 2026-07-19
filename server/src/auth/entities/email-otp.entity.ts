import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('email_otps')
export class EmalOtp {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column()
  codeHash!: string; // hash the 6-digit code — never store plaintext

  @Column()
  expiresAt!: Date; // createdAt + 90 seconds, set in service layer

  @Column({ default: 0 })
  attemptCount!: number; // lock after e.g. 5 wrong tries

  @Column({ default: false })
  isUsed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
