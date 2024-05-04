import { useGetEmployeesQuery } from '@/generated';

type EmployeeItem = {
  value: number;
  label: string;
  avatarUrl: string | null | undefined;
};
const stableArray: EmployeeItem[] = [];
export const useEmployeeSelectOptions = () => {
  const { data } = useGetEmployeesQuery({
    fetchPolicy: 'cache-first',
  });

  const selectEmployeeOptions: EmployeeItem[] =
    data?.employees.map((employee) => ({
      value: employee.id,
      label: employee.name ?? '',
      avatarUrl: employee.profilePhotoUrl,
    })) ?? stableArray;

  return selectEmployeeOptions;
};
