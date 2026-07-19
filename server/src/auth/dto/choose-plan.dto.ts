import { IsEnum, IsUUID } from 'class-validator';
import { TenantType } from '../enums';

export class ChoosePlanDto {
  @IsUUID()
  userId!: string;

  @IsEnum(TenantType)
  tenantType!: TenantType;
}
