import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskDto } from './dto/task.dto';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { JwtPayload } from '../../types/jwt-payload';
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { CurrentUserRoleDecorator } from '../../decorators/current-user-role-decorator';
import { TasksService } from './tasks.service';
import { NotificationsService } from '../notifications/notifications.service';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';

@Resolver(() => TaskDto)
@UseGuards(JwtGraphqlGuard)
export class TasksResolver {
  constructor(
    private projectManagementService: ProjectManagementService,
    private tasksService: TasksService,
    private notificationService: NotificationsService,
  ) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [TaskDto])
  async tasks(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('projectId', { nullable: true, type: () => Number })
    projectId: number | null,
    @Args('isBacklog', { nullable: true, type: () => Boolean })
    isBacklog: boolean | null,
    @Args('searchQuery', { nullable: true, type: () => String })
    searchQuery: string | null,
    @Args('assignedTo', { nullable: true, type: () => [Number] })
    assignedTo: number[] | null,
  ): Promise<TaskDto[]> {
    if (projectId) {
      const project = await this.projectManagementService.getProject(
        projectId,
        token.companyId,
      );
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return this.tasksService.getTasks({
        companyId: token.companyId,
        projectId,
        isBacklog,
        searchQuery,
        assignedTo,
      });
    } else {
      return this.tasksService.getTasks({
        companyId: token.companyId,
        projectId,
        isBacklog,
        searchQuery,
        assignedTo,
      });
    }
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => TaskDto)
  async task(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ): Promise<TaskDto> {
    return this.tasksService.getTask({
      taskId: id,
      companyId: token.companyId,
    });
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [TaskDto])
  async myTasks(@JwtGraphqlDecorator() token: JwtPayload): Promise<TaskDto[]> {
    return this.tasksService.getMyTasks(token.employeeId);
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [TaskDto])
  async myRecentTasks(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<TaskDto[]> {
    return this.tasksService.getMyRecentTasks(token.employeeId);
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async updateTaskPosition(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('taskId') taskId: number,
    @Args('prevCursor', { type: () => String, nullable: true })
    prevCursor: string | null,
    @Args('nextCursor', { type: () => String, nullable: true })
    nextCursor: string | null,
  ): Promise<boolean> {
    await this.tasksService.updateTaskPosition({
      prevCursor,
      nextCursor,
      taskId,
      companyId: token.companyId,
    });
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => TaskDto)
  async createTask(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('projectId') projectId: number,
    @Args('payload') payload: CreateTaskInput,
  ): Promise<TaskDto> {
    const project = await this.projectManagementService.getProject(
      projectId,
      token.companyId,
    );
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return this.tasksService.createTask({
      projectId,
      name: payload.name,
      createdBy: token.employeeId,
      assignedTo: payload.assignedTo,
      description: payload.description ?? '',
      status: payload.status,
      isBacklog: payload.isBacklog ?? false,
    });
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async updateTask(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('payload') payload: UpdateTaskInput,
    @CurrentUserRoleDecorator() role: PermissionRoleEnum,
  ): Promise<boolean> {
    if (role === PermissionRoleEnum.EMPLOYEE) {
      await this.tasksService.updateTask(payload, token.employeeId);
      return true;
    }
    if (
      role === PermissionRoleEnum.ACCOUNT_OWNER ||
      role === PermissionRoleEnum.ADMIN ||
      role === PermissionRoleEnum.MANAGER
    ) {
      await this.tasksService.updateTaskAdmin(payload, token.companyId);
      return true;
    }

    throw new BadRequestException();
  }

  // implement assign employee to task mutation
  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async assignEmployeeToTask(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('taskId') taskId: number,
    @Args('employeeId') employeeId: number,
  ): Promise<boolean> {
    await this.tasksService.assignEmployeeToTask({
      taskId,
      employeeId,
      companyId: token.companyId,
    });

    if (token.employeeId !== employeeId) {
      this.notificationService.handleEmployeeAssigned({
        companyId: token.companyId,
        assignedBy: token.employeeId,
        assignedTo: employeeId,
        taskId,
      });
      // todo send notification event that someone has been assigned - don't send event in case assigned to yourself
    }
    return true;
  }
}
