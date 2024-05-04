import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from './employee.dto';

type TeamFromDB = {
  id: number;
  name: string;
  description?: string | null;
};

@ObjectType()
export class TeamDto {
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

  constructor(team: TeamFromDB, numberOfEmployees?: number) {
    this.id = team.id;
    this.name = team.name;
    this.description = team.description;
    this.numberOfEmployees = numberOfEmployees;
  }
}
