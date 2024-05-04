import { useGetVacationPoliciesQuery } from '@/generated';
import { Button } from '@/components/ui/button';
import { VacationPolicyCard } from '@/domain/pto/VacationPolicyCard';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { ManageVacationPolicy } from '@/domain/pto/ManageVacationPolicy';

export const VacationPoliciesView = () => {
  const {
    data,
    refetch,
    loading: loadingPolicies,
  } = useGetVacationPoliciesQuery();

  const hasPolicy = !!data?.vacationPolicies.length;

  const [createMode, setCreateMode] = useQueryState('create', parseAsBoolean);

  if (loadingPolicies) {
    return <div>Loading...</div>;
  }

  if (hasPolicy && !createMode) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between mb-4">
          <p className="text-xl mb-4">Vacation Policies</p>
          <Button
            variant="default"
            onClick={() => setCreateMode(true, { history: 'push' })}
          >
            Create New
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {data?.vacationPolicies.map((policy) => (
            <VacationPolicyCard
              key={policy.id}
              name={policy.name}
              description={policy.description}
              id={policy.id}
              defaultPolicy={policy.default}
              archived={policy.archived}
              employees={policy.employees ?? []}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ManageVacationPolicy
      onFinish={() => {
        setCreateMode(false);
        refetch();
      }}
    />
  );
};
