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
import { EmployeeDto } from './dto/employee.dto';
import { RoleDto } from './dto/role.dto';
import { RolesRepository } from './roles.repository';
import { EmployeeRepository } from './employee.repository';
import { JwtPayload } from '../../types/jwt-payload';
import { mapEmployee } from './util';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

@Roles(PermissionRoleEnum.MANAGER)
@UseGuards(JwtGraphqlGuard)
@Resolver(() => RoleDto)
export class RolesResolver {
  constructor(
    private rolesRepository: RolesRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  @Query(() => [RoleDto])
  async roles(@JwtGraphqlDecorator() token: JwtPayload): Promise<RoleDto[]> {
    const roles = await this.rolesRepository.getAll(token.companyId);

    return roles;
  }

  @Mutation(() => RoleDto)
  async createRole(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('name') name: string,
    @Args('description', { nullable: true, type: () => String })
    description?: string | null,
  ): Promise<RoleDto> {
    const role = await this.rolesRepository.create(
      { name, description },
      token.companyId,
    );
    return new RoleDto(role, 0);
  }

  @Mutation(() => Boolean)
  async assignEmployeeToRole(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('employeeIds', { type: () => [Number] }) employeeIds: number[],
    @Args('removedIds', { type: () => [Number] }) removedIds: number[],
    @Args('roleId') roleId: number,
  ) {
    await this.employeeRepository.updateRole(
      { employeeIds, removedIds },
      roleId,
      token.companyId,
    );
    return true;
  }

  @Query(() => RoleDto)
  async role(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ): Promise<RoleDto> {
    const role = await this.rolesRepository.getSingle(token.companyId, id);

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  @ResolveField(() => [EmployeeDto])
  async employees(@Parent() parent: RoleDto): Promise<EmployeeDto[]> {
    const employees = await this.employeeRepository.getByRole(parent.id);
    return employees.map(mapEmployee);
  }

  @Mutation(() => Boolean)
  async deleteRole(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ) {
    await this.rolesRepository.delete(token.companyId, id);
    return true;
  }

  @Mutation(() => RoleDto)
  async updateRole(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('description', { nullable: true, type: () => String })
    description?: string | null,
  ): Promise<RoleDto> {
    const role = await this.rolesRepository.update(token.companyId, id, {
      name,
      description,
    });
    return new RoleDto(role, 0);
  }
}
