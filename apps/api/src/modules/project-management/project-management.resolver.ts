import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import * as z from 'zod';
import { ProjectManagementService } from './project-management.service';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { JwtPayload } from '../../types/jwt-payload';
import { ProjectDto } from './dto/project.dto';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { ProjectColumn, ProjectColumnInput } from './dto/project-column.dto';
import { PROJECT_COLUMN_SCHEMA } from './misc/project-column-schema';

@UseGuards(JwtGraphqlGuard)
@Resolver(() => ProjectDto)
export class ProjectManagementResolver {
  constructor(private projectManagementService: ProjectManagementService) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [ProjectDto])
  projects(@JwtGraphqlDecorator() token: JwtPayload): Promise<ProjectDto[]> {
    return this.projectManagementService.getProjects(token.companyId);
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => ProjectDto)
  async project(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ): Promise<ProjectDto> {
    const project = await this.projectManagementService.getProject(
      id,
      token.companyId,
    );
    const columns = z.array(PROJECT_COLUMN_SCHEMA).parse(project.columns);
    return {
      ...project,
      columns,
    };
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @Mutation(() => ProjectDto)
  async createProject(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('name') name: string,
    @Args('description', { nullable: true, type: () => String })
    description: string | null,
    @Args('color') color: string,
  ): Promise<ProjectDto> {
    const result = await this.projectManagementService.createProject(
      token.companyId,
      {
        name,
        description,
        color,
      },
    );
    const columns = z.array(PROJECT_COLUMN_SCHEMA).parse(result.columns);
    return {
      ...result,
      columns,
    };
  }

  // add column to project mutation
  @Roles(PermissionRoleEnum.MANAGER)
  @Mutation(() => Boolean)
  async addColumnToProject(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('projectId') projectId: number,
    @Args('name') name: string,
    @Args('value') value: string,
  ): Promise<boolean> {
    await this.projectManagementService.addColumnToProject({
      projectId,
      companyId: token.companyId,
      name,
      value,
    });
    return true;
  }

  @Roles(PermissionRoleEnum.MANAGER)
  @Mutation(() => Boolean)
  async removeColumnFromProject(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('projectId') projectId: number,
    @Args('value') value: string,
  ): Promise<boolean> {
    await this.projectManagementService.removeColumnFromProject({
      projectId,
      companyId: token.companyId,
      value,
    });
    return true;
  }

  @Roles(PermissionRoleEnum.MANAGER)
  @Mutation(() => Boolean)
  async updateColumnsForProject(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('projectId') projectId: number,
    @Args('columns', { type: () => [ProjectColumnInput] })
    columns: ProjectColumnInput[],
  ): Promise<boolean> {
    await this.projectManagementService.updateColumnsForProject({
      projectId,
      companyId: token.companyId,
      columns,
    });
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [ProjectColumn])
  async availableStatusesForProject(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('projectId') projectId: number,
  ): Promise<ProjectColumn[]> {
    const project = await this.projectManagementService.getProject(
      projectId,
      token.companyId,
    );

    return z.array(PROJECT_COLUMN_SCHEMA).parse(project.columns);
  }
}
