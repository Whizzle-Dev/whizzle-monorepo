import { useGetNewJoinersQuery } from '@/generated';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { EmployeeAvatar } from '@/components/ui/avatar';

export const WelcomeNewJoinersCard = () => {
  const { data, loading } = useGetNewJoinersQuery({
    fetchPolicy: 'cache-first',
  });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Welcome New Joiners</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {loading && <Loader />}
        {data?.recentlyJoinedEmployees.map((employee) => (
          <div key={employee.id} className="flex items-center">
            <EmployeeAvatar
              src={employee.profilePhotoUrl}
              name={employee.name}
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {employee.name}
              </p>
              {employee.role && employee.team && (
                <p className="text-sm text-gray-500">
                  <strong>{employee.role.name}</strong> in{' '}
                  <strong>{employee.team.name}</strong> team
                </p>
              )}
            </div>
          </div>
        ))}
        {!loading && data?.recentlyJoinedEmployees.length === 0 && (
          <CardDescription>No new joiners this month.</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
