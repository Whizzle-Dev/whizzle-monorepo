import { Injectable } from '@nestjs/common';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

interface IsAuthorizedParams {
  currentRole: PermissionRoleEnum;
  requiredRole: PermissionRoleEnum;
}

@Injectable()
export class AccessControlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority = 1;

  constructor() {
    this.buildRoles([
      PermissionRoleEnum.EMPLOYEE,
      PermissionRoleEnum.MANAGER,
      PermissionRoleEnum.ADMIN,
      PermissionRoleEnum.ACCOUNT_OWNER,
    ]);
  }

  /**
   * The buildRoles method allows for creating a role hierarchy between specified set of roles.
   * Roles have to be specified from least privileged user to the most priviliged one
   * @param roles Array that contains list of roles
   */
  private buildRoles(roles: PermissionRoleEnum[]) {
    const hierarchy: Map<string, number> = new Map();
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    this.hierarchies.push(hierarchy);
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    for (const hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);
      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }
    return false;
  }
}
