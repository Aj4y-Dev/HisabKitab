import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;
}
