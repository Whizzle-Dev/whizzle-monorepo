import { PermissionRoleEnum, useGetCurrentUserQuery } from '@/generated';

export const usePermissions = () => {
  const { data } = useGetCurrentUserQuery({
    fetchPolicy: 'cache-first',
  });

  // check permission with hierarchy
  const permissionCheck = (permission: PermissionRoleEnum) => {
    if (!data?.currentEmployee) {
      return false;
    }
    const currentPermission = data.currentEmployee.permissionRole;

    return hierarchy[currentPermission].includes(permission);
  };
  return { permission: data?.currentEmployee.permissionRole, permissionCheck };
};

const hierarchy: Record<PermissionRoleEnum, PermissionRoleEnum[]> = {
  [PermissionRoleEnum.ACCOUNT_OWNER]: [
    PermissionRoleEnum.ACCOUNT_OWNER,
    PermissionRoleEnum.ADMIN,
    PermissionRoleEnum.MANAGER,
    PermissionRoleEnum.EMPLOYEE,
  ],
  [PermissionRoleEnum.ADMIN]: [
    PermissionRoleEnum.ADMIN,
    PermissionRoleEnum.MANAGER,
    PermissionRoleEnum.EMPLOYEE,
  ],
  [PermissionRoleEnum.MANAGER]: [
    PermissionRoleEnum.MANAGER,
    PermissionRoleEnum.EMPLOYEE,
  ],
  [PermissionRoleEnum.EMPLOYEE]: [PermissionRoleEnum.EMPLOYEE],
};
