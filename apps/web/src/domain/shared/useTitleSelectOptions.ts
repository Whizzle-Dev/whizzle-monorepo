import { useGetRolesQuery } from '@/generated';
import { MultiSelectProps } from '@/components/ui/multi-select';

const stableArray: MultiSelectProps<number>['options'] = [];

export const useTitleSelectOptions = () => {
  const { data } = useGetRolesQuery({
    fetchPolicy: 'cache-first',
  });

  const options: MultiSelectProps<number>['options'] =
    data?.roles.map((role) => ({
      value: role.id,
      label: role.name,
    })) ?? stableArray;

  return options;
};
