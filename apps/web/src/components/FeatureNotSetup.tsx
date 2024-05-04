import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/domain/employees/usePermissions';
import { PermissionRoleEnum } from '@/generated';

type FeatureNotSetupProps = {
  action: string;
  onAction: () => void;
  description: string;
};
export const FeatureNotSetup = ({
  action,
  onAction,
  description,
}: FeatureNotSetupProps) => {
  const { permissionCheck } = usePermissions();
  return (
    <div className="flex flex-col max-w-xl items-center p-4 gap-4 m-auto mt-20">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-xl font-bold">Feature not setup</span>
        <Icons.Ban />
      </div>
      <span className="text-center">{description}</span>
      {permissionCheck(PermissionRoleEnum.ADMIN) && (
        <Button className="mt-4" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
};
