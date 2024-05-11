import { Field, ObjectType } from '@nestjs/graphql';
import { BankInformationDto, IBankInformation } from './bank-information.dto';
import { RoleDto } from './role.dto';
import { TeamDto } from './team.dto';
import { EmployeeStatus } from '../enums/employee-status';
import { PermissionRoleEnum } from '../../../types/permission-role.enum';

@ObjectType()
export class EmployeeDto {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field(() => String)
  name: string;

  @Field()
  companyId: number;

  @Field(() => EmployeeStatus)
  status: string;

  @Field(() => BankInformationDto, { nullable: true })
  bankInformation?: IBankInformation | null;

  @Field(() => RoleDto, { nullable: true })
  role?: RoleDto | null;

  @Field(() => TeamDto, { nullable: true })
  team?: TeamDto | null;

  @Field(() => PermissionRoleEnum)
  permissionRole: keyof typeof PermissionRoleEnum;

  @Field(() => String, { nullable: true })
  profilePhotoUrl?: string | null;
}
