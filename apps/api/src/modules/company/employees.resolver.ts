import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { BankDetailsInput } from './dto/bank-details.input';
import { EmployeeRepository } from './employee.repository';
import { JwtPayload } from '../../types/jwt-payload';
import { mapEmployee } from './util';
import { EmployeeFiltersInput } from './dto/employees-filter.input';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { FilesService } from '../files/files.service';
import { EditEmployeeInput } from './dto/edit-employee.input';

@Resolver(() => EmployeeDto)
export class EmployeesResolver {
  constructor(
    private employeeService: EmployeeService,
    private employeeRepository: EmployeeRepository,
    private filesService: FilesService,
  ) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @UseGuards(JwtGraphqlGuard)
  @Query(() => EmployeeDto)
  async currentEmployee(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<EmployeeDto> {
    const employee = await this.employeeRepository.getById(
      token.employeeId,
      token.companyId,
    );
    if (!employee) {
      throw new NotFoundException();
    }

    return mapEmployee(employee);
  }

  @Roles(PermissionRoleEnum.MANAGER)
  @UseGuards(JwtGraphqlGuard)
  @Query(() => [EmployeeDto])
  async employees(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('filters', { nullable: true, type: () => EmployeeFiltersInput })
    filters: EmployeeFiltersInput,
  ): Promise<EmployeeDto[]> {
    const employees = await this.employeeRepository.getAllByCompany(
      token.companyId,
      filters,
    );
    return employees.map(mapEmployee);
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @UseGuards(JwtGraphqlGuard)
  @Mutation(() => Boolean)
  async editEmployee(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('employeeId') employeeId: number,
    @Args('input') input: EditEmployeeInput,
  ): Promise<boolean> {
    await this.employeeService.editEmployee({
      employeeId,
      companyId: token.companyId,
      input,
    });
    return true;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @UseGuards(JwtGraphqlGuard)
  @Mutation(() => Boolean)
  async inviteEmployee(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('permission', { type: () => PermissionRoleEnum })
    permission: PermissionRoleEnum,
    @Args('roleId', { nullable: true, type: () => Number })
    roleId: number | null,
    @Args('teamId', { nullable: true, type: () => Number })
    teamId: number | null,
  ): Promise<boolean> {
    await this.employeeService.inviteEmployee({
      name,
      email,
      roleId,
      teamId,
      companyId: token.companyId,
      invitedBy: token.userId,
      permission,
    });

    return true;
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @UseGuards(JwtGraphqlGuard)
  @Mutation(() => Boolean)
  async resendEmployeeInvite(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('employeeId') employeeId: number,
  ): Promise<boolean> {
    await this.employeeService.resendInvite({
      employeeId,
      companyId: token.companyId,
      inviterId: token.employeeId,
    });

    return true;
  }

  @Mutation(() => EmployeeDto)
  async acceptInvite(
    @Args('inviteCode') inviteCode: string,
    @Args('password') password: string,
  ): Promise<EmployeeDto> {
    const employee = await this.employeeService.acceptInvite({
      inviteCode,
      newPassword: password,
    });

    return mapEmployee(employee);
  }

  @Roles(PermissionRoleEnum.ADMIN)
  @UseGuards(JwtGraphqlGuard)
  @Mutation(() => Boolean)
  async cancelInvite(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('employeeId') employeeId: number,
  ): Promise<boolean> {
    await this.employeeService.cancelInvite({
      employeeId,
      companyId: token.companyId,
    });

    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @UseGuards(JwtGraphqlGuard)
  @Mutation(() => Boolean)
  async saveBankDetails(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('bankDetails') bankDetails: BankDetailsInput,
  ) {
    const employee = await this.employeeRepository.getById(
      token.employeeId,
      token.companyId,
    );
    if (!employee) {
      throw new NotFoundException();
    }

    if (employee.bankInformationId) {
      await this.employeeRepository.updateBankInformation(
        employee.bankInformationId,
        {
          bankName: bankDetails.bankName ?? '',
          bankAccountNumber: bankDetails.bankAccountNumber ?? '',
        },
      );
    } else {
      await this.employeeRepository.createBankInformation(token.employeeId, {
        bankName: bankDetails.bankName ?? '',
        bankAccountNumber: bankDetails.bankAccountNumber ?? '',
      });
    }
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @UseGuards(JwtGraphqlGuard)
  @Query(() => [EmployeeDto])
  async recentlyJoinedEmployees(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<EmployeeDto[]> {
    const employees = await this.employeeRepository.getRecentlyJoinedEmployees(
      token.companyId,
    );
    return employees.map(mapEmployee);
  }
}
