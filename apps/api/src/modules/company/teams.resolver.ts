import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { TeamDto } from './dto/team.dto';
import { EmployeeDto } from './dto/employee.dto';
import { TeamsRepository } from './teams.repository';
import { EmployeeRepository } from './employee.repository';
import { JwtPayload } from '../../types/jwt-payload';
import { mapEmployee } from './util';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

@Roles(PermissionRoleEnum.ADMIN)
@UseGuards(JwtGraphqlGuard)
@Resolver(() => TeamDto)
export class TeamsResolver {
  constructor(
    private teamsRepository: TeamsRepository,
    private employeesRepository: EmployeeRepository,
  ) {}

  @Query(() => [TeamDto])
  async teams(@JwtGraphqlDecorator() token: JwtPayload): Promise<TeamDto[]> {
    const teams = await this.teamsRepository
      .getTeamsQuery(token.companyId)
      .execute();
    return teams.map((team) => new TeamDto(team, team.numberOfEmployees ?? 0));
  }

  @Mutation(() => TeamDto)
  async createTeam(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('name') name: string,
    @Args('description', { nullable: true, type: () => String })
    description?: string | null,
  ): Promise<TeamDto> {
    const team = await this.teamsRepository
      .create({
        description,
        name,
        companyId: token.companyId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return new TeamDto(team, 0);
  }

  @Mutation(() => Boolean)
  async assignEmployeeToTeam(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('employeeIds', { type: () => [Number] }) employeeIds: number[],
    @Args('removedIds', { type: () => [Number] }) removedIds: number[],
    @Args('teamId') teamId: number,
  ) {
    await this.employeesRepository.updateTeam({
      employeeIds,
      removedIds,
      teamId,
      companyId: token.companyId,
    });
    return true;
  }
  @Mutation(() => Boolean)
  async removeEmployeeFromTeam(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('employeeId') employeeId: number,
    @Args('teamId') teamId: number,
  ) {
    await this.employeesRepository.removeFromTeam(
      employeeId,
      teamId,
      token.companyId,
    );
    return true;
  }

  @Query(() => TeamDto)
  async team(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ): Promise<TeamDto> {
    const team = await this.teamsRepository
      .getSingle(token.companyId, id)
      .executeTakeFirst();
    if (!team) {
      throw new NotFoundException();
    }
    return new TeamDto(team, team.numberOfEmployees);
  }

  @ResolveField(() => [EmployeeDto])
  async employees(@Parent() parent: TeamDto): Promise<EmployeeDto[]> {
    const employees = await this.employeesRepository.getByTeam(parent.id);
    return employees.map(mapEmployee);
  }

  @Mutation(() => Boolean)
  async deleteTeam(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ) {
    await this.teamsRepository.delete(id, token.companyId);
    return true;
  }

  @Mutation(() => Boolean)
  async updateTeam(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('description', { nullable: true, type: () => String })
    description?: string | null,
  ) {
    await this.teamsRepository.update({
      id,
      companyId: token.companyId,
      name,
      description,
    });
    return true;
  }
}
