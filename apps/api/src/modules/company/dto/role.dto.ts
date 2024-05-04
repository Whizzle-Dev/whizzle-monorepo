import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from './employee.dto';

type RoleFromDb = {
  id: number;
  name: string;
  description?: string | null;
};
@ObjectType()
export class RoleDto {
  @Field()
  id: number;
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Number, { nullable: true })
  numberOfEmployees?: number | null;

  @Field(() => [EmployeeDto], { nullable: true })
  employees?: EmployeeDto[];

  constructor(role: RoleFromDb, numberOfEmployees?: number) {
    this.id = role.id;
    this.name = role.name;
    this.description = role.description;
    this.numberOfEmployees = numberOfEmployees;
  }
}
