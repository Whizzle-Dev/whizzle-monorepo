import { Field, InputType } from '@nestjs/graphql';
import { PermissionRoleEnum } from '../../../types/permission-role.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class EditEmployeeInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  roleId?: number;

  @Field({ nullable: true })
  @IsOptional()
  teamId?: number;

  @Field(() => PermissionRoleEnum)
  @IsNotEmpty()
  permission: PermissionRoleEnum;
}
