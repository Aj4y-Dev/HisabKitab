import { IsUUID, MinLength } from 'class-validator';

export class SetPasswordDto {
  @IsUUID()
  userId!: string;

  @MinLength(8)
  password!: string;
}
