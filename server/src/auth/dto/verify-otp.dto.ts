import { IsUUID, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsUUID()
  userId!: string;

  @Length(6, 6)
  code!: string;
}
